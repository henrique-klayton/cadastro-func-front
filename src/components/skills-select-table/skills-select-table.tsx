"use client";
import { Table } from "antd";
import { TableRowSelection } from "antd/es/table/interface";
import Flatten from "@interfaces/flatten.type";
import StringKeyof from "@interfaces/string-keyof.type";
import { useRelation } from "./relations-context";
import { SkillsSelectTableProps } from "./types";

export default function SkillsSelectTable<T>({
	dataKey,
}: SkillsSelectTableProps<T>) {
	const relation = useRelation<T>(dataKey);
	const rowSelection: TableRowSelection<Flatten<T[StringKeyof<T>]>> = {
		selectedRowKeys: relation.selectedDataKeys,
	};
	return (
		<Table
			rowKey="id"
			// columns={}
			dataSource={relation.data}
			pagination={relation.pagination}
			loading={relation.loading}
			rowSelection={rowSelection}
		/>
	);
}
