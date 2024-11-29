import DataTable, { DataTableProps } from "@components/data-table";
import { ScheduleType } from "@fragments/schedule";
import { graphql } from "@graphql-types/gql";
import { getSchedules } from "./actions";

export default async function SchedulePage() {
	const getSchedulesListQuery = graphql(`
		query GetSchedules {
			scheduleList {
				...Schedule
			}
		}
	`);

	const schedules = await getSchedules();
	const columns: DataTableProps<ScheduleType>["columns"] = [
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
	];

	return <DataTable data={schedules} rowKey="id" columns={columns} />;
}
