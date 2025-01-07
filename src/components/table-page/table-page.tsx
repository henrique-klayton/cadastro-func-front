"use client";
import { ExclamationCircleFilled } from "@ant-design/icons";
import {
	App,
	Card,
	Col,
	Flex,
	FloatButton,
	Form,
	ModalFuncProps,
	Row,
} from "antd";
import { useForm } from "antd/es/form/Form";
import { FormInstance } from "antd/lib";
import { useReducer, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";

import DataTable from "@components/data-table";
import { DataTableActions } from "@components/data-table/types";
import FormModal from "@components/form-modal";
import { FormModalActions, FormSubmitFunc } from "@components/form-modal/types";
import RelationSelectTable from "@components/relation-select-table";
import FormActionsEnum from "@enums/form-actions";
import relationTablesReducer, {
	createRelationTablesContext,
	createRelationTablesDispatchContext,
} from "@hooks/relation-tables-reducer";
import relationTablesInitializer from "@hooks/relation-tables-reducer/relation-tables-initializer";
import ActionType from "@hooks/relation-tables-reducer/types/relation-tables-action-type";
import HaveId from "@interfaces/have-id";
import HaveStatus from "@interfaces/have-status";
import PartialNullable from "@interfaces/partial-nullable.type";
import RelationTypeIds from "./interfaces/relation-type-ids.type";
import TablePaginationConfig from "./interfaces/table-pagination-config";
import makePaginationConfig from "./make-pagination-config";
import {
	FormModalStateProps,
	ServerActionRelations,
	TablePageFormModalProps,
	TablePageProps,
} from "./types";

import "./table-page.css";

export default function TablePageComponent<
	T extends HaveId & HaveStatus,
	C extends U,
	U extends PartialNullable<HaveId & HaveStatus>,
>({
	children,
	table: tableProps,
	totalCount: total,
	title,
	itemName,
	actions: {
		tableQueryAction,
		formQueryAction,
		createAction,
		updateAction,
		deleteAction,
	},
	queryDataParsers: parsers,
	relationsData,
}: TablePageProps<T, C, U>) {
	const formReset = { status: false } as Partial<U>;
	const [action, setAction] = useState(FormActionsEnum.CREATE);
	const [formOpen, setFormOpen] = useState(false);
	const [formLoading, setFormLoading] = useState(false);
	const [formData, setFormData] = useState<Partial<C> | Partial<U>>(formReset);
	const [formId, setFormId] = useState<T["id"] | undefined>(undefined);
	const [form] = useForm() as [FormInstance<C> | FormInstance<U>];

	// Relation Tables States & Reducer
	const [relationTables, setRelationTables] = useState<React.ReactNode[]>([]);
	const [relationTablesLoaded, setRelationTablesLoaded] = useState(false);
	const [relationTablesProps, relationsDispatch] = useReducer(
		relationTablesReducer<U>,
		relationsData ?? [],
		relationTablesInitializer<U>,
	);

	const RelationTablesContext = createRelationTablesContext<U>();
	const RelationTablesDispatchContext =
		createRelationTablesDispatchContext<U>();

	// Delete Confirm Modal
	const { modal: confirmModal, message } = App.useApp();
	const confirmQuestion = `Tem certeza que deseja remover esse(a) ${itemName}?`;

	// DataTable Component States & Functions
	const [tableLoading, setTableLoading] = useState(false);
	const [tableData, setTableData] = useState(tableProps.data);
	tableProps.data = tableData;

	const loadTableData = (page: number, pageSize: number) => {
		setTableLoading(true);
		setTableData([]);
		tableQueryAction(page, pageSize)
			.then((res) => {
				setTableData(res.data);
				setPagination(
					makePaginationConfig({ ...pagination, page: page, pageSize }),
				);
				setTableLoading(false);
			})
			.catch(() => {
				message.error("Erro ao atualizar a tabela!");
				setTableLoading(false);
			});
	};

	const [pagination, setPagination] = useState<TablePaginationConfig>(
		makePaginationConfig({ total, onChange: loadTableData }),
	);

	const addItemToTable = (item: T) => {
		if (item.status) {
			const data = [...tableData, item];
			setTableData(data);
		}
	};

	const updateItemOnTable = (item: T) => {
		const itemIndex = tableData.findIndex((old) => old.id === item.id);
		if (!item.status) {
			setTableData(tableData.toSpliced(itemIndex, 1));
			return;
		}

		const data = [...tableData];
		const updated = data[itemIndex];
		Object.assign(updated, item);
		setTableData(data);
	};

	const removeItemFromTable = (id: T["id"]) => {
		const data = tableData.filter((item) => item.id !== id);
		setTableData(data);
	};

	const actions: DataTableActions<T> = {
		onUpdateClick: async (id: T["id"]) => {
			setFormId(id);
			const item = formQueryAction(id).then((obj) => {
				if (parsers) {
					for (const key in parsers) {
						obj[key] = parsers[key](obj[key]);
					}
				}
				return obj;
			});
			openFormModal(FormActionsEnum.UPDATE, item as Promise<U>);
		},
		onDeleteClick: async (id: T["id"]) => {
			const confirmModalProps: ModalFuncProps = {
				icon: <ExclamationCircleFilled />,
				okText: "Remover",
				okType: "danger",
				title: confirmQuestion,
				onOk: () => {
					return handleDeleteConfirm(id, true)
						.then(() => {
							message.success(`${itemName} removido(a) com sucesso!`);
							removeItemFromTable(id);
						})
						.catch((err: Error) => {
							message.error(err.message);
						});
				},
			};
			await confirmModal.confirm(confirmModalProps);
		},
	};

	// Form Modal Functions
	const formSubmit: FormSubmitFunc<C, U> = ({ action, data, id }) => {
		form.validateFields().then(() => {
			const relations: ServerActionRelations<U> = {};
			if (relationsData) {
				for (const relation of relationsData) {
					const key = relation.key;
					relations[key] = relationTablesProps[key].selectedDataKeys;
				}
			}

			switch (action) {
				case FormActionsEnum.CREATE:
					createAction(data, relations)
						.then((item) => {
							message.success(`${itemName} criado(a) com sucesso!`);
							if (item) addItemToTable(item);
						})
						.catch((err: Error) => {
							closeFormModal();
							message.error(err.message);
						});
					break;

				case FormActionsEnum.UPDATE:
					updateAction(id, data, relations)
						.then((item) => {
							message.success(`${itemName} atualizado(a) com sucesso!`);
							if (item) updateItemOnTable(item);
						})
						.catch((err: Error) => {
							closeFormModal();
							message.error(err.message);
						});
					break;
			}
			closeFormModal();
		});
	};

	const openFormModal = (
		action: FormModalActions,
		initialData: Promise<U | undefined> = Promise.resolve(undefined),
	) => {
		setAction(action);
		if (!relationTablesLoaded) renderTables();
		setFormLoading(true);
		initialData
			.then((data) => {
				loadRelationsListData(data)
					.then(() => {
						if (data) setFormData(data);
						else setFormData(formReset);
						setFormLoading(false);
					})
					.catch((err) => {
						throw err;
					});
			})
			.catch((err: unknown) => {
				const error =
					err instanceof Error ? err : new Error(String(err), { cause: err });
				console.error(error);
				console.error(error.message);
				message.error("Erro ao carregar formulário!");
				closeFormModal();
			});
		setFormOpen(true);
	};

	const closeFormModal = () => {
		setFormOpen(false);
		setFormData(formReset);
		relationsDispatch({ type: ActionType.RESET_ALL });
	};

	const handleFormModalCancel = () => {
		closeFormModal();
	};

	// Relation Tables Functions
	const renderTables = () => {
		const elements: React.ReactNode[] = [];
		for (const key in relationTablesProps) {
			console.log(`Render ${key} relation table`);
			const relation = relationTablesProps[key];
			const element = (
				<Row key={relation.dataKey}>
					<Col span={24}>
						<Form.Item name={relation.dataKey as string} key={relation.dataKey}>
							<RelationSelectTable dataKey={relation.dataKey} />
						</Form.Item>
					</Col>
				</Row>
			);
			elements.push(element);
			relationsDispatch({
				type: ActionType.RENDER_TABLE,
				dataKey: key,
				element,
			});
		}
		setRelationTables(elements);
		setRelationTablesLoaded(true);
	};

	const loadRelationsListData = async (formData?: U) => {
		console.log("Preparing to load relation tables");
		for (const key in relationTablesProps) {
			console.log(`Getting data to load ${key} table`);
			const relation = relationTablesProps[key];
			const { data, total } = await relation.queryRelatedAction();
			let relatedData: RelationTypeIds<U> = [];
			if (formData && Array.isArray(formData[key])) {
				relatedData = formData[key].map(
					(item) => item.id,
				) as RelationTypeIds<U>;
			}
			relationsDispatch({
				type: ActionType.INITIAL_LOAD,
				dataKey: key,
				data,
				total,
				selectedDataKeys: relatedData,
				dispatcher: relationsDispatch,
			});
		}
	};

	// Delete Confirm Modal Functions
	const handleDeleteConfirm = async (id: T["id"], confirm: boolean) => {
		setAction(FormActionsEnum.DELETE);
		if (confirm) return deleteAction(id);
	};

	// Form Modal Props
	const formModalStates = {
		action: action as FormModalActions,
		form: form,
		initialData: formData,
		currentId: formId,
		onSubmit: formSubmit,
		onFieldsChange: undefined,
	} satisfies FormModalStateProps<C, U> as TablePageFormModalProps<C, U>;

	return (
		<RelationTablesContext.Provider value={relationTablesProps}>
			<RelationTablesDispatchContext.Provider value={relationsDispatch}>
				<FormModal<C, U>
					{...formModalStates}
					objectName={itemName}
					loading={formLoading}
					open={formOpen}
					onCancel={handleFormModalCancel}
				>
					{children}
					{relationTables}
				</FormModal>
				<Card title={title}>
					<Flex className="w-full h-full" vertical>
						<DataTable<T>
							{...tableProps}
							data={tableData}
							loading={tableLoading}
							actions={actions}
							pagination={pagination}
							registerName={itemName}
						/>
						<FloatButton
							className="create-button"
							type="primary"
							tooltip={`Criar ${itemName}`}
							icon={<AiOutlinePlus />}
							onClick={() => {
								openFormModal(FormActionsEnum.CREATE);
							}}
						/>
					</Flex>
				</Card>
			</RelationTablesDispatchContext.Provider>
		</RelationTablesContext.Provider>
	);
}
