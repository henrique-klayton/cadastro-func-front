"use client";
import TableColumn from "@components/data-table/types/table-column";
import { SkillFragmentType } from "@fragments/skill";

const employeeSkillsRelationColumns: Array<TableColumn<SkillFragmentType>> = [
	{
		dataIndex: "description",
		title: "Descrição",
		onHeaderCell: () => {
			return {
				style: {
					textAlign: "center",
				},
			};
		},
	},
];
export default employeeSkillsRelationColumns;
