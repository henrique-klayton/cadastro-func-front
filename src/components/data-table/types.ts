import { TablePaginationConfig } from "antd/lib";
import { ColumnProps } from "antd/lib/table";

import { HaveId } from "@interfaces/have-id";

export interface DataTableActions<T extends HaveId> {
	onUpdateClick: (id: T["id"]) => Promise<void>;
	onDeleteClick: (id: T["id"]) => Promise<void>;
}

export type TableColumn<T> = ColumnProps<T> & RequiredColumnProps<T>;

export interface RequiredColumnProps<T> {
	title: string;
	dataIndex: Extract<keyof T, string | number>;
	formatter?: (value: T[keyof T]) => React.ReactNode;
}

export interface DataTableProps<T> {
	data: T[];
	rowKey: keyof T;
	columns: Array<TableColumn<T>>;
}

export interface DataTablePageProps<T extends HaveId>
	extends DataTableProps<T> {
	actions: DataTableActions<T>;
	pagination: TablePaginationConfig;
	registerName: string;
	loading: boolean;
}
