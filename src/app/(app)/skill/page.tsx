import DataTable, { TableColumn } from "@components/data-table";
import { SkillType } from "@fragments/skill";
import { getSkills } from "./actions";

export default async function SchedulePage() {
	const skills = await getSkills();
	const columns: TableColumn<SkillType>[] = [
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
	return <DataTable data={skills} rowKey="id" columns={columns} />;
}
