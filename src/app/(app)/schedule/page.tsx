import { DataTableProps } from "@components/data-table";
import TablePage from "@components/table-page";
import { ScheduleType } from "@fragments/schedule";
import { ScheduleCreateDto, ScheduleUpdateDto } from "@graphql-types/graphql";
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
		<TablePage<ScheduleType, ScheduleCreateDto, ScheduleUpdateDto>
			table={table}
			pageName="Escalas"
			actions={actions}
		>
			<p>Teste</p>
		</TablePage>
	);
	// return <DataTable data={schedules} rowKey="id" columns={columns} />;
}
