import { Input, Switch } from "antd";
import FormItem from "antd/es/form/FormItem";

import { DataTableProps } from "@components/data-table/types";
import TablePageComponent from "@components/table-page";
import { SkillFragmentType } from "@fragments/skill";
import { SkillCreateDto, SkillUpdateDto } from "@graphql/types/graphql";
import { sKillTableColumns } from "@models/skill";
import {
	createSkill,
	deleteSkill,
	getSkill,
	getSkills,
	updateSkill,
} from "./actions";

export default async function SchedulePage() {
	const skills = await getSkills();

	const table: DataTableProps<SkillFragmentType> = {
		data: skills.data,
		rowKey: "id",
		columns: sKillTableColumns,
	};

	return (
		<TablePageComponent<SkillFragmentType, SkillCreateDto, SkillUpdateDto>
			table={table}
			totalCount={skills.total}
			title="Habilidades"
			itemName="Habilidade"
			actions={{
				tableQueryAction: getSkills,
				formQueryAction: getSkill,
				createAction: createSkill,
				updateAction: updateSkill,
				deleteAction: deleteSkill,
			}}
			queryDataParsers={{}}
		>
			<FormItem
				label="Descrição"
				name="description"
				required
				hasFeedback
				rules={[{ required: true }]}
			>
				<Input />
			</FormItem>
			<FormItem label="Status" name="status" required>
				<Switch />
			</FormItem>
		</TablePageComponent>
	);
}
