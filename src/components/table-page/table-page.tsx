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
import { Actions } from "../../enums/actions";
import "./table-page.css";

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

export default function TablePage<T extends HaveId, C, U>({
	children,
	table: tableProps,
	pageName,
	actions: { queryAction, createAction, updateAction, deleteAction },
}: TablePageProps<T, C, U>) {
	const [action, setAction] = useState<Actions>(Actions.CREATE);
	const [isFormOpen, setIsFormOpen] = useState(false);
	const [formData, setFormData] = useState<C | U | undefined>(undefined);

	const handlers: Handlers<T, C, U> = {
		formSubmit: (data: C | U, id?: T["id"]) => {
			switch (action) {
				case Actions.CREATE:
					createAction(data as C);
					break;
				case Actions.UPDATE:
					updateAction(id as T["id"], data as U);
					break;
			}
		},
		onUpdateClick: (id: T["id"]) => {
			const item = queryAction(id);
			setFormData(item as C | U);
			setAction(Actions.UPDATE);
		},
		onDeleteClick: (id: T["id"]) => {
			deleteAction(id);
		},
	};
	tableProps.actions = handlers;

	const showFormModal = () => {
		setIsFormOpen(true);
	};

	const handleCancel = () => {
		setIsFormOpen(false);
	};

	return (
		<Flex className="w-full h-full">
			<DataTable<T> {...tableProps} />
			<FloatButton
				className="create-button"
				type="primary"
				icon={<AiOutlinePlus />}
				onClick={() => {
					setAction(Actions.CREATE);
					setIsFormOpen(true);
				}}
			/>
			<FormModal<C, U>
				action={action as Actions.CREATE & Actions.UPDATE}
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
