"use server";
import { FormDataSerializer } from "@components/table-page/types";
import {
	PaginatedSchedule,
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
import { calculateLimitOffset } from "@utils/calculate-limit-offset";
import catchGraphQLError from "@utils/catch-graphql-error";
import timeSerialize from "@utils/time-serialize";

// FIXME Treat errors in all server actions
const createSerializer: FormDataSerializer<ScheduleCreateDto> = (
	data: ScheduleCreateDto,
) => {
	data.startTime = timeSerialize(data.startTime);
	data.endTime = timeSerialize(data.endTime);
	return data;
};

const queryErrorMsg = "Erro ao carregar Escala!";
const queryManyErrorMsg = "Erro ao carregar Escalas!";
const createErrorMsg = "Erro ao criar Escala!";
const updateErrorMsg = "Erro ao atualizar Escala!";
const deleteErrorMsg = "Erro ao remover Escala!";

const updateSerializer: FormDataSerializer<ScheduleUpdateDto> = (
	data: ScheduleUpdateDto,
) => {
	if (data.startTime) data.startTime = timeSerialize(data.startTime);
	if (data.endTime) data.endTime = timeSerialize(data.endTime);
	return data;
};

// FIXME Catch errors
export async function getSchedule(id: number): Promise<ScheduleFragmentType> {
	try {
		const queryResult = await runQuery(getScheduleQuery, { id });
		return Schedule(queryResult.schedule);
	} catch (err) {
		catchGraphQLError(err, queryErrorMsg);
	}
}

// FIXME Catch errors
export async function getSchedules(
	page?: number,
	pageSize?: number,
	filterStatus = false,
): Promise<PaginatedSchedule> {
	try {
		const queryResult = await runQuery(getSchedulesListQuery, {
			filterStatus,
			...calculateLimitOffset(page, pageSize),
		});
		const result = queryResult.scheduleList;
		const schedules = result.data.map((item) => Schedule(item));
		return { data: schedules, total: result.total };
	} catch (err) {
		catchGraphQLError(err, queryManyErrorMsg);
	}
}

// FIXME Catch errors
export async function createSchedule(
	data: ScheduleCreateDto,
): Promise<ScheduleFragmentType> {
	try {
		const created = await runMutation(createScheduleMutation, {
			schedule: createSerializer(data),
		});
		const schedule = Schedule(created.createSchedule);
		return schedule;
	} catch (err) {
		catchGraphQLError(err, createErrorMsg);
	}
}

// FIXME Catch errors
export async function updateSchedule(
	id: number,
	data: ScheduleUpdateDto,
): Promise<ScheduleFragmentType> {
	try {
		const updated = await runMutation(updateScheduleMutation, {
			id,
			schedule: updateSerializer(data),
		});
		const schedule = Schedule(updated.updateSchedule);
		return schedule;
	} catch (err) {
		catchGraphQLError(err, updateErrorMsg);
	}
}

export async function deleteSchedule(
	id: number,
): Promise<ScheduleFragmentType> {
	try {
		const deleted = await runMutation(deleteScheduleMutation, {
			id,
		});
		const schedule = Schedule(deleted.deleteSchedule);
		return schedule;
	} catch (err) {
		catchGraphQLError(err, deleteErrorMsg);
	}
}
