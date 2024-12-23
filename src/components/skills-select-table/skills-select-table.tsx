"use client";
import { Table } from "antd";
import { TableRowSelection } from "antd/es/table/interface";

import { RelationData } from "@components/table-page/types";
import Flatten from "@interfaces/flatten.type";
import { useRelation } from "./relations-context";
import { SkillsSelectTableProps } from "./types";

export default function SkillsSelectTable<T>({
	dataKey,
}: SkillsSelectTableProps<T>) {
	const relation = useRelation<T>(dataKey);
	const rowSelection: TableRowSelection<Flatten<RelationData<T>>> = {
		selectedRowKeys: relation.selectedDataKeys,
	};
	return (
		<Table<Flatten<RelationData<T>>>
			rowKey="id"
			// columns={}
			dataSource={relation.data}
			pagination={relation.pagination}
			loading={relation.loading}
			rowSelection={rowSelection}
		/>
	);
}
