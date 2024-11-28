import DataTable, { DataTableProps } from "@components/data-table";
import Schedule from "@fragments/schedule";
import { graphql } from "@graphql-types/gql";
import { ScheduleDto } from "@graphql-types/graphql";
import getUrqlClient from "@graphql/client";

export default async function SchedulePage() {
	const getSchedulesListQuery = graphql(`
		query GetSchedules {
			scheduleList {
				...Schedule
			}
		}
	`);

	const client = getUrqlClient();
	const { data: queryResult } = await client
		.query(getSchedulesListQuery.toString(), {})
		.toPromise();
	const schedules = queryResult?.scheduleList.map((item) => Schedule(item));
	const columns: DataTableProps<ScheduleDto>["columns"] = [
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

	return <DataTable data={schedules ?? []} rowKey="id" columns={columns} />;
}
