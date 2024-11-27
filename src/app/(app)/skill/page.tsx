import DataTable, { TableColumn } from "@components/data-table";
import getUrqlClient from "@graphql/client";
import Skill from "@graphql/fragments/skill";
import { graphql } from "@graphql/types/gql";
import { SkillDto } from "@graphql/types/graphql";

export default async function SchedulePage() {
	const getSkillsListQuery = graphql(`
		query GetSkills {
			skillList {
				...Skill
			}
		}
	`);

	const client = getUrqlClient();
	const { data: queryResult } = await client
		.query(getSkillsListQuery.toString(), {})
		.toPromise();
	const skills = queryResult?.skillList.map((item) => Skill(item));

	const columns: TableColumn<SkillDto>[] = [
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
	return <DataTable data={skills ?? []} rowKey="id" columns={columns} />;
}
