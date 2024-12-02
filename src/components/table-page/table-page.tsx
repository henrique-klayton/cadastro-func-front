"use client";
import { Card, Flex, FloatButton } from "antd";
import { useForm } from "antd/es/form/Form";
import { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";

import DataTable, {
	DataTableActions,
	DataTableProps,
} from "@components/data-table";
import FormModal from "@components/form-modal";
import { HaveId } from "@interfaces/have-id";
import { ActionsEnum } from "../../enums/actions";
import "./table-page.css";

export type FormModalActions = ActionsEnum.CREATE | ActionsEnum.UPDATE;
// biome-ignore lint/suspicious/noExplicitAny: Impossible to know formatter return value beforehand
export type FormValueFormatters<T> = { [P in keyof T]: (value: T[P]) => any };

export interface TablePageProps<T extends HaveId, C extends U, U> {
	children: React.ReactNode;
	table: Omit<DataTableProps<T>, "actions">;
	actions: ServerActions<T, C, U>;
	title: string;
	registerName: string;
	formatters: FormValueFormatters<U>;
}

export interface ServerActions<T extends HaveId, C, U> {
	queryAction: (id: T["id"]) => Promise<C | U>;
	createAction: (data: C) => Promise<T>;
	updateAction: (id: T["id"], data: U) => Promise<T>;
	deleteAction: (id: T["id"]) => Promise<T>;
}

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
	const [form] = useForm<C | U>();
	const [formData, setFormData] = useState<C | U | undefined>(undefined);

	const actions: DataTableActions<T> = {
		onUpdateClick: async (id: T["id"]) => {
			const item = await queryAction(id);
			for (const key in formatters) {
				item[key] = formatters[key](item[key]);
			}
			openFormModal(ActionsEnum.UPDATE, item as U);
		},
		onDeleteClick: async (id: T["id"]) => {
			// deleteAction(id);
			openDeleteConfirm();
		},
	};

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

	const openDeleteConfirm = () => {
		setAction(ActionsEnum.DELETE);
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

	const handleCancel = () => {
		closeFormModal();
	};

	return (
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
				<FormModal<C | U>
					action={action as FormModalActions}
					objectName={registerName}
					form={form}
					initialData={formData}
					openState={isFormOpen}
					onSubmit={formSubmit}
					onCancel={handleCancel}
				>
					{children}
				</FormModal>
			</Flex>
		</Card>
	);
}
