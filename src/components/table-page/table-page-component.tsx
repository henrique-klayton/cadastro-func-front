import { ExclamationCircleFilled } from "@ant-design/icons";
import { App, Card, Col, Flex, FloatButton, Form, Row } from "antd";
import { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";

import DataTable from "@components/data-table";
import DataTableActions from "@components/data-table/interfaces/data-table-actions";
import FormModal from "@components/form-modal";
import { FormModalActions, FormSubmitFunc } from "@components/form-modal/types";
import RelationSelectTable from "@components/relation-select-table";
import TableFilter from "@components/table-filter";
import FormActionsEnum from "@enums/form-actions.enum";
import { useFormModalReducer } from "@hooks/form-modal-reducer/form-modal-context";
import FormModalActionEnum from "@hooks/form-modal-reducer/types/form-modal-action-type";
import { useRelationTablesReducer } from "@hooks/relation-tables-reducer/relation-tables-context";
import RelationActionEnum from "@hooks/relation-tables-reducer/types/relation-tables-action-type";
import { useTableDataReducer } from "@hooks/table-data-reducer/table-data-context";
import TableDataActionEnum from "@hooks/table-data-reducer/types/table-data-action-type";
import HaveId from "@interfaces/have-id";
import HaveStatus from "@interfaces/have-status";
import PaginationInfo from "@interfaces/pagination-info";
import PartialNullable from "@typings/partial-nullable";
import StringKeyof from "@typings/string-keyof";
import CreateButton from "./components/create-button";
import ReportButton from "./components/report-button";
import RelationTypeIds from "./interfaces/relation-type-ids.type";
import TablePageProps from "./interfaces/table-page-props";
import {
	FormModalStateProps,
	TablePageFormModalProps,
} from "./types/form-modal-props";
import ServerActionRelations from "./types/server-action-relations";

export default function TablePageComponent<
	T extends HaveId & HaveStatus,
	C extends U,
	U extends PartialNullable<HaveId & HaveStatus>,
	F,
>({
	children,
	table: tableProps,
	title,
	itemName,
	actions: {
		tableQueryAction,
		formQueryAction,
		createAction,
		updateAction,
		deleteAction,
		reportAction,
	},
	queryDataParsers: parsers,
	relationsData,
	filters: _filterConfig,
}: TablePageProps<T, C, U, F>) {
	// Messages const
	const confirmQuestion = `Tem certeza que deseja remover esse(a) ${itemName}?`;
	const formLoadError = "Erro ao carregar formulário!";

	const createSuccess = `${itemName} criado(a) com sucesso!`;
	const updateSuccess = `${itemName} atualizado(a) com sucesso!`;
	const removeSuccess = `${itemName} removido(a) com sucesso!`;

	// Reducers State & Dispatch
	const [
		{ loaded: relationTablesLoaded, config: relationTablesProps },
		relationsDispatch,
	] = useRelationTablesReducer<U>();
	const [table, tableDispatch] = useTableDataReducer<T, F>();
	const [modal, modalDispatch] = useFormModalReducer<T, C, U>();

	// Reload Event
	const [reloadEvent, setReloadEvent] = useState<PaginationInfo | undefined>(
		undefined,
	);
	const sendReloadEvent = () => {
		return setReloadEvent({
			page: table.pagination.page,
			pageSize: table.pagination.pageSize,
		});
	};

	// Delete Confirm Modal & Notification Message
	const { modal: confirmModal, message } = App.useApp();

	const dataTableActions: DataTableActions<T> = {
		onUpdateClick: async (id: T["id"]) => {
			const item = await formQueryAction(id);
			if (parsers) {
				for (const key in parsers) {
					item[key] = parsers[key](item[key]);
				}
			}
			openFormModal(FormActionsEnum.UPDATE, item, id);
		},
		onDeleteClick: async (id: T["id"]) => {
			modalDispatch({ type: FormModalActionEnum.DELETE, id });
			await confirmModal.confirm({
				icon: <ExclamationCircleFilled />,
				okText: "Remover",
				okType: "danger",
				title: confirmQuestion,
				onOk: async () => {
					try {
						await handleDeleteConfirm(id);
						message.success(removeSuccess);
						sendReloadEvent();
					} catch (err) {
						if (err instanceof Error) message.error(err.message);
					}
				},
			});
		},
	};

	// Form Modal Functions
	const formSubmit: FormSubmitFunc<C, U> = ({ action, data, id }) => {
		modal.form.validateFields().then(async () => {
			const relations: ServerActionRelations<U> = {};
			if (relationsData) {
				for (const relation of relationsData) {
					const key = relation.key;
					relations[key] = relationTablesProps[key].selectedDataKeys;
				}
			}

			try {
				switch (action) {
					case FormActionsEnum.CREATE:
						await createAction(data, relations);
						message.success(createSuccess);
						break;

					case FormActionsEnum.UPDATE:
						await updateAction(id, data, relations);
						message.success(updateSuccess);
						break;
				}
			} catch (err: unknown) {
				if (err instanceof Error) message.error(err.message);
			}
			sendReloadEvent();
			closeFormModal();
		});
	};

	const openFormModal = async (
		action: FormModalActions,
		initialData?: U,
		id?: T["id"],
	) => {
		try {
			modalDispatch({ type: FormModalActionEnum.OPEN, action });
			renderRelationTables(); // Render tables before form load
			modalDispatch({
				type: FormModalActionEnum.LOAD_DATA,
				data: initialData,
				id,
			});
			await loadRelationsListData(initialData);
		} catch (err) {
			const error =
				err instanceof Error ? err : new Error(String(err), { cause: err });
			console.error(error);
			closeFormModal();
			message.error(formLoadError);
		}
	};

	const closeFormModal = () => {
		modalDispatch({ type: FormModalActionEnum.CLOSE });
		relationsDispatch({ type: RelationActionEnum.RESET_ALL });
	};

	const handleFormModalCancel = () => {
		closeFormModal();
	};

	// Relation Tables Functions
	const renderRelationTables = () => {
		if (!relationTablesLoaded) {
			const elements: React.ReactNode[] = [];
			for (const key in relationTablesProps) {
				console.log(`Render ${key} relation table`);
				const relation = relationTablesProps[key];
				const element = (
					<Row key={relation.dataKey}>
						<Col span={24}>
							<Form.Item
								name={relation.dataKey as string}
								key={relation.dataKey}
							>
								<RelationSelectTable dataKey={relation.dataKey} />
							</Form.Item>
						</Col>
					</Row>
				);
				elements.push(element);
			}
			relationsDispatch({
				type: RelationActionEnum.RENDER_ALL,
				elements,
			});
		}
	};

	const loadRelationsListData = async (formData?: U) => {
		console.log("Preparing to load relation tables");
		for (const key in relationTablesProps) {
			console.log(`Getting data to load ${key} table`);
			const relation = relationTablesProps[key];
			const { data, total } = await relation.queryRelatedAction({
				status: true,
			});
			let relatedData: RelationTypeIds<U> = [];
			if (formData && Array.isArray(formData[key])) {
				relatedData = formData[key].map(
					(item) => item.id,
				) as RelationTypeIds<U>;
			}
			relationsDispatch({
				type: RelationActionEnum.INITIAL_LOAD,
				dataKey: key,
				data,
				total,
				selectedDataKeys: relatedData,
				dispatcher: relationsDispatch,
			});
		}
	};

	// Delete Confirm Modal Functions
	const handleDeleteConfirm = async (id: T["id"]) => {
		return deleteAction(id);
	};

	// TableFilter Functions
	const handleFilterChanges = (key: StringKeyof<F>, value: number) => {
		tableDispatch({
			type: TableDataActionEnum.FILTER_CHANGED,
			key,
			value,
		});
		table.filterValues[key] = value;
		sendReloadEvent();
	};

	// Report Button
	const generateReport = async () => {
		const report = await reportAction();
		const data = `data:text/csv;base64,${btoa(report)}`;
		const anchor = document.createElement("a");
		anchor.href = data;
		anchor.download = `Relatório ${itemName}.csv`;
		anchor.click();
	};

	// FIXME Remove typing workaround
	// Form Modal Props
	const formModalStates = {
		action: modal.action as FormModalActions,
		form: modal.form,
		initialData: modal.initialData ?? modal.formReset,
		currentId: modal.itemId,
		onSubmit: formSubmit,
		onFieldsChange: undefined,
		queryAction: formQueryAction,
	} satisfies FormModalStateProps<C, U> as TablePageFormModalProps<C, U>;

	return (
		<>
			<FormModal<C, U>
				{...formModalStates}
				objectName={itemName}
				loading={modal.loading}
				open={modal.open}
				onCancel={handleFormModalCancel}
			>
				{children}
			</FormModal>
			<Card title={title}>
				<Flex className="w-full h-full" vertical>
					<TableFilter
						filters={table.filterConfig}
						onFilterChange={handleFilterChanges}
					/>
					<DataTable<T, F>
						{...tableProps}
						actions={dataTableActions}
						registerName={itemName}
						queryAction={tableQueryAction}
						reloadEvent={reloadEvent}
					/>
				</Flex>
			</Card>
			<FloatButton.Group
				type="primary"
				style={{ marginBottom: "-1rem" }}
				trigger="hover"
				icon={<AiOutlinePlus />}
			>
				<ReportButton itemName={itemName} onClick={generateReport} />
				<CreateButton itemName={itemName} onClick={openFormModal} />
			</FloatButton.Group>
		</>
	);
}
