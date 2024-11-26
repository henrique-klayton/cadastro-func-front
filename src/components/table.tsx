"use client";
import { Table } from "antd";
import { ColumnProps } from "antd/es/table";

interface RequiredProps {
	title: string;
	dataIndex: string;
	key: string;
}

export interface ListingTableProps<T extends { [key: string]: unknown }> {
	data: T[];
	rowKey: keyof T;
	columns: Array<ColumnProps<T> & RequiredProps>;
}

export default function ListingTable<T extends { [key: string]: unknown }>({
	data,
	rowKey,
	columns,
}: ListingTableProps<T>) {
	const tableColumns = [];
	for (const item of columns) {
		tableColumns.push(<Table.Column {...item} key={item.key} />);
	}

	return (
		<Table<T> dataSource={data} rowKey={rowKey}>
			{tableColumns}
		</Table>
	);
}
