import { Input, Switch } from "antd";
import FormItem from "antd/es/form/FormItem";

import { TableProps } from "@components/data-table/types";
import TablePageComponent from "@components/table-page";
import { SkillType } from "@fragments/skill";
import { SkillCreateDto, SkillUpdateDto } from "@graphql/types/graphql";
import {
	createSkill,
	deleteSkill,
	getSkill,
	getSkills,
	updateSkill,
} from "./actions";

export default async function SchedulePage() {
	const skills = await getSkills();

	const table: TableProps<SkillType> = {
		data: skills,
		rowKey: "id",
		columns: [
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
		],
	};

	return (
		<TablePageComponent<SkillType, SkillCreateDto, SkillUpdateDto>
			table={table}
			title="Habilidades"
			registerName="Habilidade"
			actions={{
				queryAction: getSkill,
				createAction: createSkill,
				updateAction: updateSkill,
				deleteAction: deleteSkill,
			}}
			queryDataParsers={{}}
		>
			<FormItem label="Descrição" name="description" required>
				<Input />
			</FormItem>
			<FormItem label="Status" name="status" required>
				<Switch />
			</FormItem>
		</TablePageComponent>
	);
}
