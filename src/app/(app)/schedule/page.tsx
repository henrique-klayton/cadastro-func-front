import { Switch, TimePicker } from "antd";
import FormItem from "antd/es/form/FormItem";

import { DataTableProps } from "@components/data-table/types";
import ScheduleTypeSelect from "@components/schedule-type-select/schedule-type-select";
import TablePageComponent from "@components/table-page";
import { ScheduleType } from "@fragments/schedule";
import { ScheduleCreateDto, ScheduleUpdateDto } from "@graphql/types/graphql";
import scheduleTypeFormat from "@utils/schedule-type-format";
import timeParse from "@utils/time-parse";
import timeTableFormat from "@utils/time-table-format";
import {
	createSchedule,
	deleteSchedule,
	getSchedule,
	getSchedules,
	updateSchedule,
} from "./actions";

export default async function SchedulePage() {
	const schedules = await getSchedules();

	const table: DataTableProps<ScheduleType> = {
		data: schedules.data,
		columns: [
			{
				dataIndex: "id",
				title: "Id",
			},
			{
				dataIndex: "startTime",
				title: "Hora Início",
				formatter: timeTableFormat,
			},
			{
				dataIndex: "endTime",
				title: "Hora Fim",
				formatter: timeTableFormat,
			},
			{
				dataIndex: "type",
				title: "Tipo Escala",
				formatter: scheduleTypeFormat,
			},
			{
				dataIndex: "status",
				title: "Status",
			},
		],
		rowKey: "id",
	};

	return (
		<TablePageComponent<ScheduleType, ScheduleCreateDto, ScheduleUpdateDto>
			table={table}
			totalCount={schedules.total}
			title="Escalas"
			registerName="Escala"
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
		>
			<FormItem label="Horário Início" name="startTime" required>
				<TimePicker format="HH:mm" />
			</FormItem>
			<FormItem label="Horário Fim" name="endTime" required>
				<TimePicker format="HH:mm" />
			</FormItem>
			<FormItem label="Tipo Escala" name="type" required>
				<ScheduleTypeSelect />
			</FormItem>
			<FormItem label="Status" name="status" required>
				<Switch />
			</FormItem>
		</TablePageComponent>
	);
}
