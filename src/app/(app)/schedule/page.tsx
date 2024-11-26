import ListingTable, { ListingTableProps } from "@components/table";
import getUrqlClient from "@graphql/client";
import Schedule from "@graphql/fragments/schedule";
import { graphql } from "@graphql/types/gql";
import { ScheduleDto } from "@graphql/types/graphql";

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
	console.log(schedules);
	const columns: ListingTableProps<ScheduleDto>["columns"] = [
		{
			dataIndex: "id",
			key: "id",
			title: "Id",
		},
		{
			dataIndex: "startTime",
			key: "startTime",
			title: "Hora Início",
		},
		{
			dataIndex: "endTime",
			key: "endTime",
			title: "Hora Fim",
		},
		{
			dataIndex: "type",
			key: "type",
			title: "Tipo",
		},
		{
			dataIndex: "status",
			key: "status",
			title: "Status",
			
		},
	];

	return <ListingTable data={schedules ?? []} rowKey="id" columns={columns} />;
}
