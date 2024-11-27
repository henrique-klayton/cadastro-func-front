"use client";
import { Table } from "antd";
import { ColumnProps } from "antd/es/table";

export type TableColumn<T> = ColumnProps<T> & RequiredColumnProps<T>;
export interface RequiredColumnProps<T > {
	title: string;
	dataIndex: Extract<keyof T, string | number>;
}

export interface ListingTableProps<T> {
	data: T[];
	rowKey: keyof T;
	columns: Array<TableColumn<T>>;
}

export default function ListingTable<T extends object>({
	data,
	rowKey,
	columns,
}: ListingTableProps<T>) {
	const tableColumns = [];
	for (const item of columns) {
		tableColumns.push(
			<Table.Column {...item} key={item.key ?? item.dataIndex} />,
		);
	}

	return (
		<Table<T> dataSource={data} rowKey={rowKey}>
			{tableColumns}
		</Table>
	);
}
