import { ColumnProps } from "antd/es/table";

import { HaveId } from "@interfaces/have-id";

export interface DataTableActions<T extends HaveId> {
	onUpdateClick: (id: T["id"]) => Promise<void>;
	onDeleteClick: (id: T["id"]) => Promise<void>;
}

export type TableColumn<T> = ColumnProps<T> & RequiredColumnProps<T>;

export interface RequiredColumnProps<T> {
	title: string;
	dataIndex: Extract<keyof T, string | number>;
	// biome-ignore lint/suspicious/noExplicitAny: Impossible to know formatter return value beforehand
	formatter?: (value: T[keyof T]) => any;
}

export interface TableProps<T> {
	data: T[];
	rowKey: keyof T;
	columns: Array<TableColumn<T>>;
}

export interface DataTableProps<T extends HaveId> extends TableProps<T> {
	actions: DataTableActions<T>;
}
