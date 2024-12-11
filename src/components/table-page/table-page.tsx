"use client";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { App, Card, Flex, FloatButton, ModalFuncProps } from "antd";
import { useForm } from "antd/es/form/Form";
import { FormInstance, TablePaginationConfig } from "antd/lib";
import { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";

import DataTable from "@components/data-table";
import { DataTableActions } from "@components/data-table/types";
import FormModal from "@components/form-modal";
import { FormModalActions, FormSubmitFunc } from "@components/form-modal/types";
import { ActionsEnum } from "@enums/actions";
import { HaveId } from "@interfaces/have-id";
import {
	FormModalStateProps,
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
}: TablePageProps<T, C, U>) {
	const [action, setAction] = useState(ActionsEnum.CREATE);
	const [formOpen, setFormOpen] = useState(false);
	const [formLoading, setFormLoading] = useState(false);
	const [formData, setFormData] = useState<C | U | undefined>(undefined);
	const [formId, setFormId] = useState<T["id"] | undefined>(undefined);
	const [form] = useForm() as [FormInstance<C> | FormInstance<U>];

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
				setPagination({ ...pagination, current: page, pageSize: pageSize });
				setTableLoading(false);
			})
			.catch(() => {
				message.error("Erro ao atualizar a tabela!");
				setTableLoading(false);
			});
	};

	const minPageSize = 10;
	const [pagination, setPagination] = useState<TablePaginationConfig>({
		current: 1,
		pageSize: minPageSize,
		total,
		pageSizeOptions: [minPageSize, 20, 50, 100].filter((size) => size <= total),
		showSizeChanger: total > minPageSize,
		onChange: loadTableData,
	});

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
			const item = formQueryAction(id)
				.then((obj) => {
					if (parsers) {
						for (const key in parsers) {
							obj[key] = parsers[key](obj[key]);
						}
					}
					return obj;
				})
				.catch(() => {
					closeFormModal();
					message.error("Erro ao carregar formulário!");
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
			initialData.then((data) => {
				setFormData(data);
				setFormLoading(false);
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
		if (confirm) {
			return deleteAction(id);
		}
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
