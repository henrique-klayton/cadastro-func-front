import { TablePaginationConfig } from "antd/lib";
import { ColumnProps } from "antd/lib/table";

import { HaveId } from "@interfaces/have-id";
import StringKeyof from "@interfaces/string-keyof.type";

export interface DataTableActions<T extends HaveId> {
	onUpdateClick: (id: T["id"]) => Promise<void>;
	onDeleteClick: (id: T["id"]) => Promise<void>;
}

export type TableColumn<T> = ColumnProps<T> & RequiredColumnProps<T>;
export type TableColumnList<T> = Array<TableColumn<T>>;

export interface RequiredColumnProps<T> {
	title: string;
	dataIndex: StringKeyof<T>;
	formatter?: (value: T[StringKeyof<T>]) => React.ReactNode;
}

export interface DataTableProps<T> {
	data: T[];
	rowKey: StringKeyof<T>;
	columns: Array<TableColumn<T>>;
}

export interface DataTablePageProps<T extends HaveId>
	extends DataTableProps<T> {
	actions: DataTableActions<T>;
	pagination: TablePaginationConfig;
	registerName: string;
	loading: boolean;
}
