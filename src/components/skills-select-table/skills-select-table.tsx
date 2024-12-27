"use client";
import { Table } from "antd";
import { TableRowSelection } from "antd/es/table/interface";

import { ActionType } from "@components/table-page/interfaces/Item-relations-action";
import { RelationData } from "@components/table-page/types";
import Flatten from "@interfaces/flatten.type";
import { IdArray } from "@interfaces/id-array.type";
import { useRelation, useRelationsDispatch } from "./relations-context";
import { SkillsSelectTableProps } from "./types";

export default function SkillsSelectTable<T>({
	dataKey,
}: SkillsSelectTableProps<T>) {
	const relation = useRelation<T>(dataKey);
	const dispatch = useRelationsDispatch<T>();
	const rowSelection: TableRowSelection<Flatten<RelationData<T>>> = {
		selectedRowKeys: relation.selectedDataKeys,
		onChange: (selectedDataKeys) => {
			dispatch({
				type: ActionType.SET_SELECTED_KEYS,
				dataKey,
				selectedDataKeys: selectedDataKeys as IdArray,
			});
		},
	};
	return (
		<Table<Flatten<RelationData<T>>>
			rowKey="id"
			columns={relation.columns}
			dataSource={relation.data}
			pagination={relation.pagination}
			loading={relation.loading}
			rowSelection={rowSelection}
		/>
	);
}
