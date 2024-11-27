"use client";
import { Table, Tag } from "antd";
import { ColumnProps } from "antd/es/table";
import { ReactNode } from "react";

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
		if (item.dataIndex === "status") {
			console.log(item.dataIndex);
			item.render = renderStatus as () => ReactNode;
		}

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

export const renderStatus = (_: unknown, { status }: { status: boolean }) => {
	const color = status ? "green" : "red";
	return <Tag color={color}>{status ? "Ativo" : "Inativo"}</Tag>;
};
