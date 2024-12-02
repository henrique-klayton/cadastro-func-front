import { TimePicker } from "antd";
import FormItem from "antd/es/form/FormItem";

import { DataTableProps } from "@components/data-table";
import TablePageComponent from "@components/table-page";
import { ScheduleType } from "@fragments/schedule";
import { ScheduleCreateDto, ScheduleUpdateDto } from "@graphql/types/graphql";
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
			},
			{
				dataIndex: "endTime",
				title: "Hora Fim",
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

	return (
		<TablePageComponent<ScheduleType, ScheduleCreateDto, ScheduleUpdateDto>
			table={table}
			title="Escalas"
			registerName="Escala"
			actions={actions}
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
