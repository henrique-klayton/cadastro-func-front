"use server";
import { Schedule, ScheduleType } from "@fragments/schedule";
import runQuery from "@graphql/run-query";
import { getSchedulesListQuery } from "@queries/schedule";

export async function getSchedules(): Promise<ScheduleType[]> {
	const queryResult = await runQuery(getSchedulesListQuery);
	const schedules = queryResult.scheduleList.map((item) => Schedule(item));
	return schedules;
}
