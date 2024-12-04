"use server";
import { FormDataParser } from "@components/table-page/types";
import {
	Schedule,
	ScheduleType as ScheduleFragmentType,
} from "@fragments/schedule";
import runMutation from "@graphql/run-mutation";
import runQuery from "@graphql/run-query";
import {
	ScheduleCreateDto,
	ScheduleType as ScheduleTypeEnum,
	ScheduleUpdateDto,
} from "@graphql/types/graphql";
import {
	createScheduleMutation,
	deleteScheduleMutation,
	getScheduleQuery,
	getSchedulesListQuery,
	updateScheduleMutation,
} from "@queries/schedule";
import timeFormat from "@utils/time-format-server";

// FIXME Treat errors in all server actions
const createParser: FormDataParser<ScheduleCreateDto> = (
	data: ScheduleCreateDto,
) => {
	data.startTime = timeFormat(data.startTime);
	data.endTime = timeFormat(data.endTime);
	data.type = `SCHEDULE_${data.type}` as ScheduleTypeEnum;
	return data;
};
const updateParser: FormDataParser<ScheduleUpdateDto> = (
	data: ScheduleUpdateDto,
) => {
	if (data.startTime) data.startTime = timeFormat(data.startTime);
	if (data.endTime) data.endTime = timeFormat(data.endTime);
	if (data.type) data.type = `SCHEDULE_${data.type}` as ScheduleTypeEnum;
	return data;
};

// FIXME Catch errors
export async function getSchedule(id: number): Promise<ScheduleFragmentType> {
	const queryResult = await runQuery(getScheduleQuery, { id });
	return Schedule(queryResult.schedule);
}

// FIXME Catch errors
export async function getSchedules(): Promise<ScheduleFragmentType[]> {
	const queryResult = await runQuery(getSchedulesListQuery);
	const schedules = queryResult.scheduleList.map((item) => Schedule(item));
	return schedules;
}

// FIXME Catch errors
export async function createSchedule(
	data: ScheduleCreateDto,
): Promise<ScheduleFragmentType> {
	const created = await runMutation(createScheduleMutation, {
		schedule: createParser(data),
	});
	const schedule = Schedule(created.createSchedule);
	return schedule;
}

// FIXME Catch errors
export async function updateSchedule(
	id: number,
	data: ScheduleUpdateDto,
): Promise<ScheduleFragmentType> {
	const updated = await runMutation(updateScheduleMutation, {
		id,
		schedule: updateParser(data),
	});
	const schedule = Schedule(updated.updateSchedule);
	return schedule;
}

export async function deleteSchedule(
	id: number,
): Promise<ScheduleFragmentType> {
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
