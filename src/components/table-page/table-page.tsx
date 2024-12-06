"use client";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { App, Card, Flex, FloatButton, ModalFuncProps } from "antd";
import { useForm } from "antd/es/form/Form";
import { FormInstance } from "antd/lib";
import { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";

import DataTable from "@components/data-table";
import { DataTableActions } from "@components/data-table/types";
import FormModal from "@components/form-modal";
import { FormModalActions, FormSubmitData } from "@components/form-modal/types";
import { ActionsEnum } from "@enums/actions";
import { HaveId } from "@interfaces/have-id";
import { FormModalProps, TablePageProps } from "./types";

import "./table-page.css";

export default function TablePageComponent<T extends HaveId, C extends U, U>({
	children,
	table: tableProps,
	title,
	registerName,
	actions: { queryAction, createAction, updateAction, deleteAction },
	queryDataParsers: formatters,
	createSerializer,
	updateSerializer,
}: TablePageProps<T, C, U>) {
	const [action, setAction] = useState(ActionsEnum.CREATE);
	const [formOpen, setFormOpen] = useState(false);
	const [formLoading, setFormLoading] = useState(false);
	const [formData, setFormData] = useState<C | U | undefined>(undefined);
	const [formId, setFormId] = useState<T["id"] | undefined>(undefined);
	const [form] = useForm<C | U>();

	if (!createSerializer) createSerializer = (value) => value as C;
	if (!updateSerializer) updateSerializer = (value) => value as U;

	// Delete Confirm Modal
	const { modal: confirmModal, message } = App.useApp();
	const confirmQuestion = `Tem certeza que deseja remover esse(a) ${registerName}?`;

	// DataTable Component
	const [tableData, setTableData] = useState(tableProps.data);
	tableProps.data = tableData;

	const addItemToTable = (item: T) => {
		const data = [...tableData, item];
		setTableData(data);
	};

	const removeItemFromTable = (id: T["id"]) => {
		const data = tableData.filter((item) => item.id !== id);
		setTableData(data);
	};

	const actions: DataTableActions<T> = {
		onUpdateClick: async (id: T["id"]) => {
			setFormId(id);
			const item = queryAction(id)
				.then((obj) => {
					if (formatters) {
						for (const key in formatters) {
							obj[key] = formatters[key](obj[key]);
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
						.then(() => removeItemFromTable(id))
						.catch((err) => {
							message.error(err.message);
						});
				},
			};
			const response = await confirmModal.confirm(confirmModalProps);
			console.log(response);
		},
	};

	// Form Modal
	const formSubmit = ({ action, data, id }: FormSubmitData<C, U>) => {
		switch (action) {
			case ActionsEnum.CREATE:
				createAction(createSerializer(data)).then((item) => {
					if (item) addItemToTable(item);
				});
				break;
			case ActionsEnum.UPDATE:
				updateAction(id, updateSerializer(data)).then((item) => {
					if (item) addItemToTable(item);
				});
				break;
		}
		closeFormModal();
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
	const states: FormModalProps<C, U> = {
		action: action as FormModalActions,
		form: form as FormInstance,
		initialData: formData,
		currentId: formId,
		onSubmit: formSubmit,
	} as FormModalProps<C, U>;

	return (
		<>
			<FormModal<C, U>
				{...states}
				objectName={registerName}
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
						actions={actions}
						registerName={registerName}
					/>
					<FloatButton
						className="create-button"
						type="primary"
						tooltip={`Criar ${registerName}`}
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
