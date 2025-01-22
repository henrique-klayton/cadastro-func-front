import { Input, Switch } from "antd";
import FormItem from "antd/es/form/FormItem";

import FromTablePageProps from "@components/data-table/interfaces/from-table-page-props";
import TableFilterConfigsObject from "@components/table-filter/table-filter-configs-object";
import TablePageComponent from "@components/table-page";
import { SkillFragmentType } from "@fragments/skill";
import {
	SkillCreateDto,
	SkillFilterDto,
	SkillUpdateDto,
} from "@graphql/types/graphql";
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
	const table: FromTablePageProps<SkillFragmentType> = {
		rowKey: "id",
		columns: sKillTableColumns,
	};

	const filters: TableFilterConfigsObject<SkillFilterDto> = {
		status: statusFilterConfig,
	};

	return (
		<TablePageComponent<
			SkillFragmentType,
			SkillCreateDto,
			SkillUpdateDto,
			SkillFilterDto
		>
			table={table}
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
