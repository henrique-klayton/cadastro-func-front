"use client";
import { Table, Tag } from "antd";
import { ColumnProps } from "antd/es/table";
import { ReactNode } from "react";

export type TableColumn<T> = ColumnProps<T> & RequiredColumnProps<T>;
export interface RequiredColumnProps<T> {
	title: string;
	dataIndex: Extract<keyof T, string | number>;
}

export interface DataTableProps<T> {
	data: T[];
	rowKey: keyof T;
	columns: Array<TableColumn<T>>;
}

const renderStatus = (_: unknown, { status }: { status: boolean }) => {
	const color = status ? "green" : "red";
	return <Tag color={color}>{status ? "Ativo" : "Inativo"}</Tag>;
};

export default function DataTable<T extends object>({
	data,
	rowKey,
	columns: columnsProps,
}: DataTableProps<T>) {
	const columns = columnsProps.map((item) => {
		if (item.dataIndex === "status")
			item.render = renderStatus as () => ReactNode;
		if (item.align != null) item.align = "center";
		return <Table.Column {...item} key={item.key ?? item.dataIndex} />;
	});

	return (
		<Table<T> dataSource={data} rowKey={rowKey}>
			{columns}
		</Table>
	);
}
