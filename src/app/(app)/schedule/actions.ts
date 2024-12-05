"use server";
import { FormDataParser } from "@components/table-page/types";
import {
	Schedule,
	ScheduleType as ScheduleFragmentType,
} from "@fragments/schedule";
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
import timeSerialize from "@utils/time-serialize";

// FIXME Treat errors in all server actions
const createSerializer: FormDataParser<ScheduleCreateDto> = (
	data: ScheduleCreateDto,
) => {
	data.startTime = timeSerialize(data.startTime);
	data.endTime = timeSerialize(data.endTime);
	return data;
};

const updateSerializer: FormDataParser<ScheduleUpdateDto> = (
	data: ScheduleUpdateDto,
) => {
	if (data.startTime) data.startTime = timeSerialize(data.startTime);
	if (data.endTime) data.endTime = timeSerialize(data.endTime);
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
		schedule: createSerializer(data),
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
		schedule: updateSerializer(data),
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
