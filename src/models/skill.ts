import { TableColumn } from "@components/data-table/types";
import { SkillFragmentType } from "@fragments/skill";

export default interface Skill {
	id: number;
	description: string;
	status: boolean;
}

export const sKillTableColumns: Array<TableColumn<SkillFragmentType>> = [
	{
		dataIndex: "id",
		title: "Id",
	},
	{
		dataIndex: "description",
		title: "Descrição",
	},
	{
		dataIndex: "status",
		title: "Status",
	},
];
