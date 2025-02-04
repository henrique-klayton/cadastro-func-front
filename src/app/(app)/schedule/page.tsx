import { Switch, TimePicker } from "antd";
import FormItem from "antd/es/form/FormItem";

import FromTablePageProps from "@components/data-table/interfaces/from-table-page-props";
import { FormItemConfigArray } from "@components/form-modal/types/form-item-config";
import ScheduleTypeSelect from "@components/schedule-type-select/schedule-type-select";
import TableFilterConfigsObject from "@components/table-filter/types/table-filter-configs-object";
import TablePage from "@components/table-page";
import { ScheduleFragmentType } from "@fragments/schedule";
import statusFilterConfig from "@functions/status-filter/status-filter-config";
import timeParse from "@functions/time/time-parse";
import {
	ScheduleCreateDto,
	ScheduleFilterDto,
	ScheduleUpdateDto,
} from "@graphql/types/graphql";
import { scheduleTableColumns } from "@models/schedule";
import {
	createSchedule,
	deleteSchedule,
	generateScheduleReport,
	getSchedule,
	getSchedules,
	updateSchedule,
} from "./actions";

export default async function SchedulePage() {
	const table: FromTablePageProps<ScheduleFragmentType> = {
		columns: scheduleTableColumns,
		rowKey: "id",
	};

	const filters: TableFilterConfigsObject<ScheduleFilterDto> = {
		status: statusFilterConfig,
	};

	const config: FormItemConfigArray<ScheduleCreateDto, ScheduleUpdateDto> = [
		{
			key: "startTime",
			formItem: {
				label: "Horário Início",
				name: "startTime",
				required: true,
				hasFeedback: true,
				rules: [{ required: true }],
			},
			inputType: "time",
			inputProps: {
				format: "HH:mm",
			},
		},
		{
			key: "startTime",
			formItem: {
				label: "Horário Início",
				name: "startTime",
				required: true,
				hasFeedback: true,
				rules: [{ required: true }],
			},
			inputType: "time",
			inputProps: {
				format: "HH:mm",
			},
		},
	];

	return (
		<TablePage<
			ScheduleFragmentType,
			ScheduleCreateDto,
			ScheduleUpdateDto,
			ScheduleFilterDto
		>
			table={table}
			title="Escalas"
			itemName="Escala"
			actions={{
				tableQueryAction: getSchedules,
				formQueryAction: getSchedule,
				createAction: createSchedule,
				updateAction: updateSchedule,
				deleteAction: deleteSchedule,
				reportAction: generateScheduleReport,
			}}
			queryDataParsers={{
				startTime: timeParse,
				endTime: timeParse,
			}}
			filters={filters}
		>
			<FormItem
				label="Horário Início"
				name="startTime"
				required
				hasFeedback
				rules={[{ required: true }]}
			>
				<TimePicker format="HH:mm" />
			</FormItem>
			<FormItem
				label="Horário Fim"
				name="endTime"
				required
				hasFeedback
				rules={[{ required: true }]}
			>
				<TimePicker format="HH:mm" />
			</FormItem>
			<FormItem
				label="Tipo Escala"
				name="type"
				required
				hasFeedback
				rules={[{ required: true }]}
			>
				<ScheduleTypeSelect />
			</FormItem>
			<FormItem label="Status" name="status" required>
				<Switch />
			</FormItem>
		</TablePage>
	);
}
