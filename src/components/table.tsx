"use client";
import { Table } from "antd";
import { ColumnProps } from "antd/es/table";

export type TableColumn<T> = ColumnProps<T> & RequiredColumnProps<T>;
export type RequiredColumnProps<T> = Required<
	Pick<ColumnProps<T>, "title" | "dataIndex">
>;

export interface ListingTableProps<T extends { [key: string]: unknown }> {
	data: T[];
	rowKey: keyof T;
	columns: Array<TableColumn<T>>;
}

export default function ListingTable<T extends { [key: string]: unknown }>({
	data,
	rowKey,
	columns,
}: ListingTableProps<T>) {
	const tableColumns = [];
	for (const item of columns) {
		tableColumns.push(<Table.Column {...item} />);
	}

	return (
		<Table<T> dataSource={data} rowKey={rowKey}>
			{tableColumns}
		</Table>
	);
}
