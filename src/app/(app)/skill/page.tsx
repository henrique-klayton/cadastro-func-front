import { Input, Switch } from "antd";
import FormItem from "antd/es/form/FormItem";

import DataTableProps from "@components/data-table/interfaces/data-table-props";
import TableFilterConfigsObject from "@components/table-filter/table-filter-configs-object";
import TablePageComponent from "@components/table-page";
import { SkillFragmentType } from "@fragments/skill";
import { SkillCreateDto, SkillUpdateDto } from "@graphql/types/graphql";
import { sKillTableColumns } from "@models/skill";
import statusFilterConfig from "@utils/status-filter/status-filter-config";
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

	const filters: TableFilterConfigsObject<SkillFragmentType> = {
		status: statusFilterConfig,
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
			filters={filters}
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
