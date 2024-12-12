"use client";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { App, Card, Flex, FloatButton, ModalFuncProps } from "antd";
import { useForm } from "antd/es/form/Form";
import { FormInstance } from "antd/lib";
import { useReducer, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";

import DataTable from "@components/data-table";
import { DataTableActions } from "@components/data-table/types";
import FormModal from "@components/form-modal";
import { FormModalActions, FormSubmitFunc } from "@components/form-modal/types";
import { ActionsEnum } from "@enums/actions";
import { HaveId } from "@interfaces/have-id";
import TablePaginationConfig from "./interfaces/table-pagination-config";
import itemRelationsReducer from "./item-relations-reducer";
import makePaginationConfig from "./make-pagination-config";
import {
	FormModalStateProps,
	ItemRelationObject,
	TablePageFormModalProps,
	TablePageProps,
} from "./types";

import "./table-page.css";

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
	const [relationsLoaded, setRelationsLoaded] = useState(false);
	const [itemRelations, dispatchRelations] = useReducer(
		itemRelationsReducer<U>,
		{} as ItemRelationObject<U>,
	);

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
	if (relationsKeys) {
		// dispatchRelations({
		// 	type: "initRelation",
		// 	relationsKeys,
		// });
		// 	setItemRelations(
		// 		relationsKeys.map(({ key: dataKey, component, queryRelatedAction }) => {
		// 			console.log(`Generating props for ${dataKey} table`);
		// 			const loadRelationData = (page: number, pageSize: number) => {
		// 				setLoading(true);
		// 				setData([] as RelationTableProps<U, keyof U>["data"]);
		// 				queryRelatedAction(page, pageSize)
		// 					.then((res) => {
		// 						setData(res.data);
		// 						setPagination(
		// 							makePaginationConfig({ ...pagination, page, pageSize }),
		// 						);
		// 						setLoading(false);
		// 					})
		// 					.catch(() => {
		// 						message.error("Erro ao atualizar a tabela!");
		// 						setLoading(false);
		// 					});
		// 			};
		// 			const [data, setData] = useState(
		// 				[] as RelationTableProps<U, keyof U>["data"],
		// 			);
		// 			const [selectedDataKeys, setSelectedDataKeys] = useState(
		// 				[] as RelationTableProps<U, keyof U>["selectedDataKeys"],
		// 			);
		// 			const [pagination, setPagination] = useState<TablePaginationConfig>(
		// 				makePaginationConfig({ onChange: loadRelationData }),
		// 			);
		// 			const [loading, setLoading] = useState(false);
		// 			const element = (
		// 				// biome-ignore lint/correctness/useJsxKeyInIterable: Key should be on Form.Item
		// 				<Row>
		// 					<Col span={24}>
		// 						<Form.Item name={dataKey as string} key={dataKey as string}>
		// 							{component({
		// 								data,
		// 								dataKey,
		// 								selectedDataKeys,
		// 								loading,
		// 								pagination,
		// 							})}
		// 						</Form.Item>
		// 					</Col>
		// 				</Row>
		// 			);
		// 			return {
		// 				data,
		// 				setData,
		// 				dataKey: dataKey,
		// 				element: element,
		// 				selectedDataKeys,
		// 				setSelectedDataKeys,
		// 				loading,
		// 				setLoading,
		// 				pagination,
		// 				setPagination,
		// 				queryRelatedAction,
		// 			} satisfies RelationTableProps<U, keyof U>;
		// 		}),
		// 	);
	}

	const loadRelationsListData = async (formData: U) => {
		["itemRelations"].map(async (relation) => {
			const data = "formData[relation.dataKey]";
			// if (Array.isArray(data)) {
			// 	relation.setData(data);
			// 	relation.setPagination(
			// 		makePaginationConfig({ ...relation.pagination, total: data.length }),
			// 	);
			// 	return;
			// }
			// throw new Error(
			// 	`Relation data ${String(relation.dataKey)} is not an array`,
			// );
		});
	};

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
		if (!relationsLoaded && relationsKeys) {
			dispatchRelations({
				type: "initRelation",
				relationsKeys,
				dispatcher: dispatchRelations,
			});
			setRelationsLoaded(true);
		}

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

	// Delete Confirm Modal
	const handleDeleteConfirm = async (id: T["id"], confirm: boolean) => {
		setAction(ActionsEnum.DELETE);
		if (confirm) return deleteAction(id);
	};

	// Form Modal Props
	const formModalstates = {
		action: action as FormModalActions,
		form: form,
		initialData: formData,
		currentId: formId,
		onSubmit: formSubmit,
		onFieldsChange: undefined,
	} satisfies FormModalStateProps<C, U> as TablePageFormModalProps<C, U>;

	return (
		<>
			<FormModal<C, U>
				{...formModalstates}
				objectName={itemName}
				loading={formLoading}
				open={formOpen}
				onCancel={handleFormModalCancel}
			>
				{children}
				{/* {itemRelations.map((item) => item.element)} */}
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
		</>
	);
}
