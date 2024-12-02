"use client";
import { Flex, FloatButton } from "antd";
import { useForm } from "antd/es/form/Form";
import { ReactNode, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";

import DataTable, { DataTableProps } from "@components/data-table";
import FormModal from "@components/form-modal";
import { HaveId } from "@interfaces/have-id";
import { ActionsEnum } from "../../enums/actions";
import "./table-page.css";

type FormModalActions = ActionsEnum.CREATE | ActionsEnum.UPDATE;

export interface TablePageProps<T extends HaveId, C, U> {
	children: ReactNode;
	table: DataTableProps<T>;
	actions: ServerActions<T, C, U>;
	pageName: string;
}

export interface ServerActions<T extends HaveId, C, U> {
	queryAction: (id: T["id"]) => Promise<T>;
	createAction: (data: C) => Promise<T>;
	updateAction: (id: T["id"], data: U) => Promise<T>;
	deleteAction: (id: T["id"]) => Promise<T>;
}

export default function TablePageComponent<T extends HaveId, C, U>({
	children,
	table: tableProps,
	pageName,
	actions: { queryAction, createAction, updateAction, deleteAction },
}: TablePageProps<T, C, U>) {
	const [form] = useForm<C | U>();
	const [action, setAction] = useState<ActionsEnum>(ActionsEnum.CREATE);
	const [isFormOpen, setIsFormOpen] = useState(false);
	const [formData, setFormData] = useState<C | U | undefined>(undefined);

	tableProps.actions = {
		onUpdateClick: (id: T["id"]) => {
			const item = queryAction(id);
			openFormModal(ActionsEnum.UPDATE, item as C | U);
		},
		onDeleteClick: (id: T["id"]) => {
			// deleteAction(id);
			openDeleteConfirm();
		},
	};

	const formSubmit = (data: C | U, id?: T["id"]) => {
		switch (action as FormModalActions) {
			case ActionsEnum.CREATE:
				createAction(data as C);
				break;
			case ActionsEnum.UPDATE:
				updateAction(id as T["id"], data as U);
				break;
		}
		closeFormModal();
	};

	const openDeleteConfirm = () => {
		setAction(ActionsEnum.DELETE);
	};

	const openFormModal = (action: FormModalActions, initialData?: C | U) => {
		setAction(action);
		setIsFormOpen(true);
		setFormData(initialData);
	};

	const closeFormModal = () => {
		setIsFormOpen(false);
		form.resetFields();
	};

	const handleCancel = () => {
		closeFormModal();
	};

	return (
		<Flex className="w-full h-full">
			<DataTable<T> {...tableProps} />
			<FloatButton
				className="create-button"
				type="primary"
				icon={<AiOutlinePlus />}
				onClick={() => {
					openFormModal(ActionsEnum.CREATE);
				}}
			/>
			<FormModal<C, U>
				action={action as FormModalActions}
				objectName={pageName}
				initialData={formData}
				openState={isFormOpen}
				onSubmit={formSubmit}
				onCancel={handleCancel}
			>
				{children}
			</FormModal>
		</Flex>
	);
}
