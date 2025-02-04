"use client";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { App, Card, Col, Flex, FloatButton, Form, Row } from "antd";
import { useForm } from "antd/es/form/Form";
import { FormInstance } from "antd/lib";
import { useEffect, useReducer, useState } from "react";

import DataTable from "@components/data-table";
import DataTableActions from "@components/data-table/interfaces/data-table-actions";
import FormModal from "@components/form-modal";
import { FormModalActions, FormSubmitFunc } from "@components/form-modal/types";
import RelationSelectTable from "@components/relation-select-table";
import TableFilterComponent from "@components/table-filter";
import MIN_PAGE_SIZE from "@consts/min-page-size.const";
import FormActionsEnum from "@enums/form-actions.enum";
import serializeFilterValues from "@functions/serialize-filter-values";
import relationTablesReducer from "@hooks/relation-tables-reducer";
import {
	createRelationTablesContext,
	createRelationTablesDispatchContext,
} from "@hooks/relation-tables-reducer/relation-tables-context";
import relationTablesInitializer from "@hooks/relation-tables-reducer/relation-tables-initializer";
import RelationActionEnum from "@hooks/relation-tables-reducer/types/relation-tables-action-type";
import TableDataInitializerConfig from "@hooks/table-data-reducer/interfaces/table-data-initializer-config";
import tableDataInitializer from "@hooks/table-data-reducer/table-data-initializer";
import tableDataReducer from "@hooks/table-data-reducer/table-data-reducer";
import TableDataActionEnum from "@hooks/table-data-reducer/types/table-data-action-type";
import HaveId from "@interfaces/have-id";
import HaveStatus from "@interfaces/have-status";
import PartialNullable from "@typings/partial-nullable";
import StringKeyof from "@typings/string-keyof";
import CreateButton from "./components/create-button";
import ReportButton from "./components/report-button";
import RelationTypeIds from "./interfaces/relation-type-ids.type";
import {
	FormModalStateProps,
	ServerActionRelations,
	TablePageFormModalProps,
	TablePageProps,
} from "./types";

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
	filters: filterConfig,
}: TablePageProps<T, C, U, F>) {
	const formReset = { status: false } as Partial<U>;
	const [action, setAction] = useState(FormActionsEnum.CREATE);
	const [formOpen, setFormOpen] = useState(false);
	const [formLoading, setFormLoading] = useState(false);
	const [formData, setFormData] = useState<Partial<C> | Partial<U>>(formReset);
	const [formId, setFormId] = useState<T["id"] | undefined>(undefined);
	const [form] = useForm() as [FormInstance<C> | FormInstance<U>];

	// Messages const
	const confirmQuestion = `Tem certeza que deseja remover esse(a) ${itemName}?`;
	const tableLoadError = "Erro ao carregar a tabela!";
	const tableReloadError = "Erro ao atualizar a tabela!";
	const formLoadError = "Erro ao carregar formulário!";

	const createSuccess = `${itemName} criado(a) com sucesso!`;
	const updateSuccess = `${itemName} atualizado(a) com sucesso!`;
	const removeSuccess = `${itemName} removido(a) com sucesso!`;

	// Relation Tables Reducer & Context
	const [relationTablesState, relationsDispatch] = useReducer(
		relationTablesReducer<U>,
		relationsData ?? [],
		relationTablesInitializer<U>,
	);
	const { loaded: relationTablesLoaded, config: relationTablesProps } =
		relationTablesState;

	const RelationTablesContext = createRelationTablesContext<U>();
	const RelationTablesDispatchContext =
		createRelationTablesDispatchContext<U>();

	// Delete Confirm Modal & Notification Message
	const { modal: confirmModal, message } = App.useApp();

	// TODO Move to DataTable
	// DataTable Component States & Functions
	const loadTableData = async (page?: number, pageSize?: number) => {
		tableDispatcher({
			type: TableDataActionEnum.SET_LOADING,
			loading: true,
		});
		return tableQueryAction(
			serializeFilterValues(table.filterValues, table.filterConfig),
			page,
			pageSize,
		);
	};

	const reloadTableData = async (page?: number, pageSize?: number) => {
		try {
			const { data, total } = await loadTableData(page, pageSize);
			tableDispatcher({
				type: TableDataActionEnum.CHANGE_PAGE,
				page: page ?? table.pagination.page ?? 1,
				pageSize: pageSize ?? table.pagination.pageSize ?? MIN_PAGE_SIZE,
				data,
				total,
			});
		} catch (err) {
			message.error(tableReloadError);
			tableDispatcher({
				type: TableDataActionEnum.SHOW_CLEAN_PAGE,
			});
		}
	};

	// TODO Create new action to pass reloadTableData to pagination onChange
	const [table, tableDispatcher] = useReducer(
		tableDataReducer<T, F>,
		{
			paginationChangeHandler: reloadTableData,
			filterConfig,
		} satisfies TableDataInitializerConfig<T, F>,
		tableDataInitializer<T, F>,
	);

	// TODO Move to DataTable
	// biome-ignore lint/correctness/useExhaustiveDependencies: Must be called once
	useEffect(() => {
		loadTableData()
			.then(({ data, total }) => {
				return tableDispatcher({
					type: TableDataActionEnum.INIT,
					data,
					total,
				});
			})
			.catch((err: unknown) => {
				message.error(tableLoadError);
				tableDispatcher({
					type: TableDataActionEnum.SHOW_CLEAN_PAGE,
				});
			});
	}, []);

	const dataTableActions: DataTableActions<T> = {
		onUpdateClick: async (id: T["id"]) => {
			setFormId(id);
			const item = await formQueryAction(id);
			if (parsers) {
				for (const key in parsers) {
					item[key] = parsers[key](item[key]);
				}
			}
			openFormModal(FormActionsEnum.UPDATE, Promise.resolve(item));
		},
		onDeleteClick: async (id: T["id"]) => {
			await confirmModal.confirm({
				icon: <ExclamationCircleFilled />,
				okText: "Remover",
				okType: "danger",
				title: confirmQuestion,
				onOk: async () => {
					try {
						await handleDeleteConfirm(id);
						message.success(removeSuccess);
						reloadTableData();
					} catch (err) {
						if (err instanceof Error) message.error(err.message);
					}
				},
			});
		},
	};

	// Form Modal Functions
	const formSubmit: FormSubmitFunc<C, U> = ({ action, data, id }) => {
		form.validateFields().then(async () => {
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
			reloadTableData();
			closeFormModal();
		});
	};

	const openFormModal = async (
		action: FormModalActions,
		initialData: Promise<U | undefined> = Promise.resolve(undefined),
	) => {
		try {
			setAction(action);
			setFormLoading(true);
			setFormOpen(true);
			// Render tables before form load
			renderRelationTables();

			const data = await initialData;
			if (data) setFormData(data);
			else setFormData(formReset);
			setFormLoading(false);

			await loadRelationsListData(data);
		} catch (err) {
			const error =
				err instanceof Error ? err : new Error(String(err), { cause: err });
			console.error(error);
			message.error(formLoadError);
			closeFormModal();
		}
	};

	const closeFormModal = () => {
		setFormOpen(false);
		setFormData(formReset);
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
		setAction(FormActionsEnum.DELETE);
		return deleteAction(id);
	};

	// TableFilter Functions
	const handleFilterChanges = (key: StringKeyof<F>, value: number) => {
		tableDispatcher({
			type: TableDataActionEnum.FILTER_CHANGED,
			key,
			value,
		});
		table.filterValues[key] = value;
		reloadTableData();
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

	// Form Modal Props
	const formModalStates = {
		action: action as FormModalActions,
		form: form,
		initialData: formData,
		currentId: formId,
		onSubmit: formSubmit,
		onFieldsChange: undefined,
		queryAction: formQueryAction,
	} satisfies FormModalStateProps<C, U> as TablePageFormModalProps<C, U>;

	return (
		<RelationTablesContext.Provider value={relationTablesState}>
			<RelationTablesDispatchContext.Provider value={relationsDispatch}>
				<FormModal<C, U>
					{...formModalStates}
					objectName={itemName}
					loading={formLoading}
					open={formOpen}
					onCancel={handleFormModalCancel}
				>
					{children}
				</FormModal>
				<Card title={title}>
					<Flex className="w-full h-full" vertical>
						<TableFilterComponent
							filters={table.filterConfig}
							onFilterChange={handleFilterChanges}
						/>
						<DataTable<T>
							{...tableProps}
							data={table.tableData}
							loading={table.tableLoading}
							actions={dataTableActions}
							pagination={table.pagination}
							registerName={itemName}
						/>
					</Flex>
				</Card>
				<FloatButton.Group>
					<ReportButton itemName={itemName} onClick={generateReport} />
					<CreateButton itemName={itemName} onClick={openFormModal} />
				</FloatButton.Group>
			</RelationTablesDispatchContext.Provider>
		</RelationTablesContext.Provider>
	);
}
