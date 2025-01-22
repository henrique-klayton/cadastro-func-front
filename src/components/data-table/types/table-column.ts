import { ColumnProps } from "antd/lib/table";

import StringKeyof from "@typings/string-keyof";

type TableColumn<T> = ColumnProps<T> & RequiredColumnProps<T>;
export default TableColumn;

export type TableColumnList<T> = Array<TableColumn<T>>;

export interface RequiredColumnProps<T> {
	title: string;
	dataIndex: StringKeyof<T>;
	formatter?: (value: T[StringKeyof<T>]) => React.ReactNode;
}
