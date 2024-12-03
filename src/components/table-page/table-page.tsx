"use client";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { App, Card, Flex, FloatButton, ModalFuncProps } from "antd";
import { useForm } from "antd/es/form/Form";
import { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";

import DataTable from "@components/data-table";
import { DataTableActions } from "@components/data-table/types";
import FormModal from "@components/form-modal";
import { FormModalActions } from "@components/form-modal/types";
import { HaveId } from "@interfaces/have-id";
import { ActionsEnum } from "../../enums/actions";
import { TablePageProps } from "./types";

import "./table-page.css";

export default function TablePageComponent<T extends HaveId, C extends U, U>({
	children,
	table: tableProps,
	title,
	registerName,
	actions: { queryAction, createAction, updateAction, deleteAction },
	formatters,
}: TablePageProps<T, C, U>) {
	const [action, setAction] = useState<ActionsEnum>(ActionsEnum.CREATE);
	const [isFormOpen, setIsFormOpen] = useState(false);
	const [formData, setFormData] = useState<C | U | undefined>(undefined);
	const [form] = useForm<C | U>();

	// Delete Confirm Modal
	const { modal: confirmModal, message } = App.useApp();
	const confirmQuestion = `Tem certeza que deseja remover esse(a) ${registerName}?`;

	// DataTable Component
	const actions: DataTableActions<T> = {
		onUpdateClick: async (id: T["id"]) => {
			const item = await queryAction(id);
			for (const key in formatters) {
				item[key] = formatters[key](item[key]);
			}
			openFormModal(ActionsEnum.UPDATE, item as U);
		},
		onDeleteClick: async (id: T["id"]) => {
			const confirmModalProps: ModalFuncProps = {
				icon: <ExclamationCircleFilled className="text-yellow-400" />,
				okText: "Remover",
				okType: "danger",
				cancelText: "Cancelar",
				title: confirmQuestion,
				onOk: () => {
					return handleDeleteConfirm(2, true).catch(() => {
						message.error(`Erro ao remover ${registerName}`);
					});
				},
				onCancel: () => {},
			};
			const response = await confirmModal.confirm(confirmModalProps);
			console.log(response);
		},
	};

	// Form Modal
	const formSubmit = (data: C | U, id?: T["id"]) => {
		switch (action) {
			case ActionsEnum.CREATE:
				createAction(data as C);
				break;
			case ActionsEnum.UPDATE:
				updateAction(id as T["id"], data as U);
				break;
		}
		closeFormModal();
	};

	const openFormModal = (action: FormModalActions, initialData?: U) => {
		setAction(action);
		setIsFormOpen(true);
		setFormData(initialData);
	};

	const closeFormModal = () => {
		setIsFormOpen(false);
		form.resetFields();
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

	return (
		<>
			<FormModal<C | U>
				action={action as FormModalActions}
				objectName={registerName}
				form={form}
				initialData={formData}
				openState={isFormOpen}
				onSubmit={formSubmit}
				onCancel={handleFormModalCancel}
			>
				{children}
			</FormModal>
			<Card title={title}>
				<Flex className="w-full h-full" vertical>
					<DataTable<T> {...tableProps} actions={actions} />
					<FloatButton
						className="create-button"
						type="primary"
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
