import { TimePicker } from "antd";
import FormItem from "antd/es/form/FormItem";

import { DataTableProps } from "@components/data-table";
import TablePageComponent, {
	FormValueFormatters,
} from "@components/table-page";
import { ScheduleType } from "@fragments/schedule";
import { ScheduleCreateDto, ScheduleUpdateDto } from "@graphql/types/graphql";
import timeParse from "@utils/time-parse";
import {
	createSchedule,
	deleteSchedule,
	getSchedule,
	getSchedules,
	updateSchedule,
} from "./actions";

export default async function SchedulePage() {
	const schedules = await getSchedules();

	const table: Omit<DataTableProps<ScheduleType>, "actions"> = {
		data: schedules,
		columns: [
			{
				dataIndex: "id",
				title: "Id",
			},
			{
				dataIndex: "startTime",
				title: "Hora Início",
				formatter: timeParse,
			},
			{
				dataIndex: "endTime",
				title: "Hora Fim",
				formatter: timeParse,
			},
			{
				dataIndex: "type",
				title: "Tipo",
			},
			{
				dataIndex: "status",
				title: "Status",
			},
		],
		rowKey: "id",
	};

	const actions = {
		queryAction: getSchedule,
		createAction: createSchedule,
		updateAction: updateSchedule,
		deleteAction: deleteSchedule,
	};

	const formatters: FormValueFormatters<ScheduleUpdateDto> = {
		startTime: timeParse,
		endTime: timeParse,
	};

	return (
		<TablePageComponent<ScheduleType, ScheduleCreateDto, ScheduleUpdateDto>
			table={table}
			title="Escalas"
			registerName="Escala"
			actions={actions}
			formatters={formatters}
		>
			<FormItem label="Horário Início" name="startTime" required>
				<TimePicker />
			</FormItem>
			<FormItem label="Horário Fim" name="endTime" required>
				<TimePicker />
			</FormItem>
		</TablePageComponent>
	);
}
