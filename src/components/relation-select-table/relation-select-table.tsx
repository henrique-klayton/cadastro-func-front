"use client";
import { Table } from "antd";
import { TableRowSelection } from "antd/es/table/interface";

import RelationData from "@components/table-page/interfaces/relation-data.type";
import RelationTypeIds from "@components/table-page/interfaces/relation-type-ids.type";
import {
	useRelationTable,
	useRelationTablesDispatch,
} from "@hooks/relation-tables-reducer";
import ActionType from "@hooks/relation-tables-reducer/types/relation-tables-action-type";
import Flatten from "@interfaces/flatten.type";
import { RelationSelectTableProps } from "./types";

export default function RelationSelectTable<T>({
	dataKey,
}: RelationSelectTableProps<T>) {
	const relation = useRelationTable<T>(dataKey);
	const dispatch = useRelationTablesDispatch<T>();
	const rowSelection: TableRowSelection<Flatten<RelationData<T>>> = {
		selectedRowKeys: relation.selectedDataKeys,
		columnWidth: "48x",
		onChange: (selectedDataKeys) => {
			dispatch({
				type: ActionType.SET_SELECTED_KEYS,
				dataKey,
				selectedDataKeys: selectedDataKeys as RelationTypeIds<T>,
			});
		},
	};
	return (
		<Table<Flatten<RelationData<T>>>
			rowKey="id"
			bordered={true}
			columns={relation.columns}
			dataSource={relation.data}
			pagination={relation.pagination}
			loading={relation.loading}
			rowSelection={rowSelection}
		/>
	);
}
