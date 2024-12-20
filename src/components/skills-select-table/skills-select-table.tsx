"use client";
import { Table } from "antd";
import { TableRowSelection } from "antd/es/table/interface";
import dynamic from "next/dynamic";

import Flatten from "@interfaces/flatten.type";
import StringKeyof from "@interfaces/string-keyof.type";
import { useRelation } from "./relations-context";
import { SkillsSelectTableProps } from "./types";

export const DynamicTable = dynamic(
	import("@components/skills-select-table/skills-select-table"),
	{
		ssr: false,
		loading: () => <Table loading={true} />,
	},
) as React.ComponentType<SkillsSelectTableProps<unknown>>;

export const createRelationsTable = <T,>(
	dataKey: StringKeyof<T>,
): React.ReactElement<SkillsSelectTableProps<T>> => {
	return <DynamicTable dataKey={dataKey as StringKeyof<unknown>} />;
};

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
