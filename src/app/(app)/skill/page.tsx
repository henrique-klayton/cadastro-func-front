import { Input, Switch } from "antd";
import FormItem from "antd/es/form/FormItem";

import FromTablePageProps from "@components/data-table/interfaces/from-table-page-props";
import TableFilterConfigsObject from "@components/table-filter/types/table-filter-configs-object";
import TablePage from "@components/table-page";
import { SkillFragmentType } from "@fragments/skill";
import statusFilterConfig from "@functions/status-filter/status-filter-config";
import {
	SkillCreateDto,
	SkillFilterDto,
	SkillUpdateDto,
} from "@graphql/types/graphql";
import { sKillTableColumns } from "@models/skill";
import {
	createSkill,
	deleteSkill,
	generateSkillReport,
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
		<TablePage<
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
				reportAction: generateSkillReport,
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
		</TablePage>
	);
}
