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
import {
	DynamicTable,
	createRelationsTable,
} from "@components/skills-select-table";
import {
	createRelationsContext,
	createRelationsDispatchContext,
} from "@components/skills-select-table/relations-context";
import { ActionsEnum } from "@enums/actions";
import { HaveId } from "@interfaces/have-id";
import TablePaginationConfig from "./interfaces/table-pagination-config";
import itemRelationsReducer, {
	reducerInitializer,
} from "./item-relations-reducer";
import makePaginationConfig from "./make-pagination-config";
import {
	FormModalStateProps,
	TablePageFormModalProps,
	TablePageProps,
} from "./types";

import "./table-page.css";
import { IdArray } from "@interfaces/id-array.type";
import { ActionType } from "./interfaces/Item-relations-action";

export default function TablePageComponent<T extends HaveId, C extends U, U>({
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
	relationsKeys,
}: TablePageProps<T, C, U>) {
	const [action, setAction] = useState(ActionsEnum.CREATE);
	const [formOpen, setFormOpen] = useState(false);
	const [formLoading, setFormLoading] = useState(false);
	const [formData, setFormData] = useState<C | U | undefined>(undefined);
	const [formId, setFormId] = useState<T["id"] | undefined>(undefined);
	const [form] = useForm() as [FormInstance<C> | FormInstance<U>];
	const [itemRelations, relationsDispatch] = useReducer(
		itemRelationsReducer<U>,
		relationsKeys ?? [],
		// TODO Update object to save other state together with table data
		reducerInitializer<U>,
	);
	const RelationsContext = createRelationsContext<U>();
	const RelationsDispatchContext = createRelationsDispatchContext<U>();

	// Delete Confirm Modal
	const { modal: confirmModal, message } = App.useApp();
	const confirmQuestion = `Tem certeza que deseja remover esse(a) ${itemName}?`;

	// DataTable Component
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
		const data = [...tableData, item];
		setTableData(data);
	};

	const updateItemOnTable = (item: T) => {
		const data = [...tableData];
		const updated = data.filter((old) => old.id === item.id)[0];
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
			openFormModal(ActionsEnum.UPDATE, item as Promise<U>);
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

	// Form Modal
	const formSubmit: FormSubmitFunc<C, U> = ({ action, data, id }) => {
		form.validateFields().then(() => {
			switch (action) {
				case ActionsEnum.CREATE:
					createAction(data)
						.then((item) => {
							message.success(`${itemName} criado(a) com sucesso!`);
							if (item) addItemToTable(item);
						})
						.catch((err: Error) => {
							closeFormModal();
							message.error(err.message);
						});
					break;
				case ActionsEnum.UPDATE:
					updateAction(id, data)
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
		initialData?: Promise<U>,
	) => {
		setAction(action);
		if (initialData) {
			setFormLoading(true);
			initialData
				.then((data) => {
					loadRelationsListData(data)
						.then(() => {
							setFormData(data);
							setFormLoading(false);
						})
						.catch((err) => {
							throw err;
						});
				})
				.catch((err: Error) => {
					console.error(err);
					console.error(err.message);
					message.error("Erro ao carregar formulário!");
					closeFormModal();
				});
		}
		setFormOpen(true);
	};

	const closeFormModal = () => {
		setFormOpen(false);
		setFormData(undefined);
	};

	const handleFormModalCancel = () => {
		closeFormModal();
	};

	// Form Modal Relation Tables
	const loadRelationsListData = async (formData: U) => {
		console.log("loadRelationsListData");
		for (const key in itemRelations) {
			console.log("loadRelationsListData key:", key);
			const relation = itemRelations[key];
			const { data, total } = await relation.queryRelatedAction();
			const table = createRelationsTable(key);
			const element = (
				<Row key={relation.dataKey}>
					<Col span={24}>
						<Form.Item name={relation.dataKey as string} key={relation.dataKey}>
							{table}
							<DynamicTable dataKey={relation.dataKey} />
						</Form.Item>
					</Col>
				</Row>
			);
			const relatedData: IdArray = [];
			if (Array.isArray(formData[key])) {
				relatedData.concat(formData[key].map((item) => item.id));
			}
			relationsDispatch({
				type: ActionType.RENDER_TABLE,
				dataKey: key,
				data,
				total,
				selectedDataKeys: relatedData,
				element,
				dispatcher: relationsDispatch,
			});
		}
		// const keys = [] as Array<keyof U>;
		// for (const key in itemRelations) {
		// 	keys.push(key);
		// }
		// const selectedDataKeys = keys.reduce(
		// 	(selected, key) => {
		// 		const data = formData[key];
		// 		if (Array.isArray(data)) {
		// 			selected[key] = data.map((item) => item.id);
		// 		}
		// 		return selected;
		// 	},
		// 	{} as InitialLoadAction<U>["selectedDataKeys"],
		// );
		// relationsDispatch({
		// 	type: ActionType.INITIAL_LOAD,
		// 	selectedDataKeys,
		// });
		// ["itemRelations"].map(async (relation) => {
		// 	const data = "formData[relation.dataKey]";
		// 	// if (Array.isArray(data)) {
		// 	// 	relation.setData(data);
		// 	// 	relation.setPagination(
		// 	// 		makePaginationConfig({ ...relation.pagination, total: data.length }),
		// 	// 	);
		// 	// 	return;
		// 	// }
		// 	// throw new Error(
		// 	// 	`Relation data ${String(relation.dataKey)} is not an array`,
		// 	// );
		// });
	};

	// Delete Confirm Modal
	const handleDeleteConfirm = async (id: T["id"], confirm: boolean) => {
		setAction(ActionsEnum.DELETE);
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
		<RelationsContext.Provider value={itemRelations}>
			<RelationsDispatchContext.Provider value={relationsDispatch}>
				<FormModal<C, U>
					{...formModalStates}
					objectName={itemName}
					loading={formLoading}
					open={formOpen}
					onCancel={handleFormModalCancel}
				>
					{children}
					{relationsKeys?.map(({ key }) => itemRelations[key].element)}
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
								openFormModal(ActionsEnum.CREATE);
							}}
						/>
					</Flex>
				</Card>
			</RelationsDispatchContext.Provider>
		</RelationsContext.Provider>
	);
}
