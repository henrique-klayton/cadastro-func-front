"use client";
import { Table } from "antd";
import { TableRowSelection } from "antd/es/table/interface";
import { SkillsSelectTableProps } from "./types";

export default function SkillsSelectTable<T>({
	data,
	pagination,
	selectedDataKeys,
}: SkillsSelectTableProps<T>) {
	const rowSelection: TableRowSelection<T> = {
		selectedRowKeys: selectedDataKeys,
	};
	return <Table rowKey={"id"} dataSource={data} rowSelection={rowSelection} />;
}
