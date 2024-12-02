"use client";
import DataTable, {
	DataTableActions,
	DataTableProps,
} from "@components/data-table";
import FormModal from "@components/form-modal";
import { Flex, FloatButton } from "antd";
import { ReactNode, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { HaveId } from "../../app/interfaces/have-id";
import { ActionsEnum } from "../../enums/actions";
import "./table-page.css";

type FormModalActions = ActionsEnum.CREATE & ActionsEnum.UPDATE;

interface Handlers<T extends HaveId, C, U> extends DataTableActions<T> {
	formSubmit: (data: C | U, id?: T["id"]) => unknown;
}

export interface TablePageProps<T extends HaveId, C, U> {
	children: ReactNode;
	table: DataTableProps<T>;
	actions: ServerActions<T, C, U>;
	pageName: string;
}

export interface ServerActions<T extends HaveId, C, U> {
	queryAction: (id: T["id"]) => Promise<T>;
	createAction: (data: C) => Promise<unknown>;
	updateAction: (id: T["id"], data: U) => Promise<unknown>;
	deleteAction: (id: T["id"]) => Promise<unknown>;
}

export default function TablePageComponent<T extends HaveId, C, U>({
	children,
	table: tableProps,
	pageName,
	actions: { queryAction, createAction, updateAction, deleteAction },
}: TablePageProps<T, C, U>) {
	const [action, setAction] = useState<ActionsEnum>(ActionsEnum.CREATE);
	const [isFormOpen, setIsFormOpen] = useState(false);
	const [formData, setFormData] = useState<C | U | undefined>(undefined);

	const handlers: Handlers<T, C, U> = {
		formSubmit: (data: C | U, id?: T["id"]) => {
			switch (action as FormModalActions) {
				case ActionsEnum.CREATE:
					createAction(data as C);
					break;
				case ActionsEnum.UPDATE:
					updateAction(id as T["id"], data as U);
					break;
			}
			closeFormModal();
		},
		onUpdateClick: (id: T["id"]) => {
			const item = queryAction(id);
			openFormModal(ActionsEnum.UPDATE, item as C | U);
		},
		onDeleteClick: (id: T["id"]) => {
			// deleteAction(id);
			openDeleteConfirm();
		},
	};
	tableProps.actions = handlers;

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
				onSubmit={handlers.formSubmit}
				onCancel={handleCancel}
			>
				{children}
			</FormModal>
		</Flex>
	);
}
