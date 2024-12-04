"use server";
import { Schedule, ScheduleType } from "@fragments/schedule";
import runMutation from "@graphql/run-mutation";
import runQuery from "@graphql/run-query";
import { ScheduleCreateDto, ScheduleUpdateDto } from "@graphql/types/graphql";
import {
	createScheduleMutation,
	deleteScheduleMutation,
	getScheduleQuery,
	getSchedulesListQuery,
	updateScheduleMutation,
} from "@queries/schedule";

// FIXME Treat errors in all server actions

// FIXME Catch errors
export async function getSchedule(id: number): Promise<ScheduleType> {
	const queryResult = await runQuery(getScheduleQuery, { id });
	return Schedule(queryResult.schedule);
}

// FIXME Catch errors
export async function getSchedules(): Promise<ScheduleType[]> {
	const queryResult = await runQuery(getSchedulesListQuery);
	const schedules = queryResult.scheduleList.map((item) => Schedule(item));
	return schedules;
}

// FIXME Catch errors
export async function createSchedule(
	data: ScheduleCreateDto,
): Promise<ScheduleType> {
	const created = await runMutation(createScheduleMutation, {
		schedule: data,
	});
	const schedule = Schedule(created.createSchedule);
	return schedule;
}

// FIXME Catch errors
export async function updateSchedule(
	id: number,
	data: ScheduleUpdateDto,
): Promise<ScheduleType> {
	const updated = await runMutation(updateScheduleMutation, {
		id,
		schedule: data,
	});
	const schedule = Schedule(updated.updateSchedule);
	return schedule;
}

export async function deleteSchedule(id: number): Promise<ScheduleType> {
	return runMutation(deleteScheduleMutation, {
		id,
	})
		.then((deleted) => {
			const schedule = Schedule(deleted.deleteSchedule);
			return schedule;
		})
		.catch((err) => {
			throw err;
		});
}
