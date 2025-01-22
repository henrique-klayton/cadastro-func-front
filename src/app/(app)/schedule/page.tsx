import { Switch, TimePicker } from "antd";
import FormItem from "antd/es/form/FormItem";

import FromTablePageProps from "@components/data-table/interfaces/from-table-page-props";
import ScheduleTypeSelect from "@components/schedule-type-select/schedule-type-select";
import TableFilterConfigsObject from "@components/table-filter/table-filter-configs-object";
import TablePageComponent from "@components/table-page";
import { ScheduleFragmentType } from "@fragments/schedule";
import {
	ScheduleCreateDto,
	ScheduleFilterDto,
	ScheduleUpdateDto,
} from "@graphql/types/graphql";
import { scheduleTableColumns } from "@models/schedule";
import statusFilterConfig from "@utils/status-filter/status-filter-config";
import timeParse from "@utils/time/time-parse";
import {
	createSchedule,
	deleteSchedule,
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

	// const config: FormItemConfig<ScheduleCreateDto, ScheduleUpdateDto> = {
	// 	input: <TimePicker format="HH:mm" />,
	// 	inputProps: {}
	// }

	return (
		<TablePageComponent<
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
		</TablePageComponent>
	);
}
