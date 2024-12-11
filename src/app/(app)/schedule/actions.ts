"use server";
import { FormDataSerializer } from "@components/table-page/types";
import {
	PaginatedSchedule,
	Schedule,
	ScheduleFragmentType,
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
import { revalidateTag } from "next/cache";

const queryErrorMsg = "Erro ao carregar Escala!";
const queryManyErrorMsg = "Erro ao carregar Escalas!";
const createErrorMsg = "Erro ao criar Escala!";
const updateErrorMsg = "Erro ao atualizar Escala!";
const deleteErrorMsg = "Erro ao remover Escala!";
const queryTag = "schedulesList";

const createSerializer: FormDataSerializer<ScheduleCreateDto> = (
	data: ScheduleCreateDto,
) => {
	data.startTime = timeSerialize(data.startTime);
	data.endTime = timeSerialize(data.endTime);
	return data;
};

const updateSerializer: FormDataSerializer<ScheduleUpdateDto> = (
	data: ScheduleUpdateDto,
) => {
	if (data.startTime) data.startTime = timeSerialize(data.startTime);
	if (data.endTime) data.endTime = timeSerialize(data.endTime);
	return data;
};

export async function getSchedule(id: number): Promise<ScheduleFragmentType> {
	try {
		const queryResult = await runQuery(getScheduleQuery, { id });
		return Schedule(queryResult.schedule);
	} catch (err) {
		catchGraphQLError(err, queryErrorMsg);
	}
}

export async function getSchedules(
	page?: number,
	pageSize?: number,
	filterStatus?: boolean,
): Promise<PaginatedSchedule> {
	try {
		const queryResult = await runQuery(
			getSchedulesListQuery,
			{
				filterStatus,
				...calculateLimitOffset(page, pageSize),
			},
			queryTag,
		);
		const result = queryResult.scheduleList;
		const schedules = result.data.map((item) => Schedule(item));
		return { data: schedules, total: result.total };
	} catch (err) {
		catchGraphQLError(err, queryManyErrorMsg);
	}
}

export async function createSchedule(
	data: ScheduleCreateDto,
): Promise<ScheduleFragmentType> {
	try {
		const created = await runMutation(createScheduleMutation, {
			schedule: createSerializer(data),
		});
		const schedule = Schedule(created.createSchedule);
		revalidateTag(queryTag);
		return schedule;
	} catch (err) {
		catchGraphQLError(err, createErrorMsg);
	}
}

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
		revalidateTag(queryTag);
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
		revalidateTag(queryTag);
		return schedule;
	} catch (err) {
		catchGraphQLError(err, deleteErrorMsg);
	}
}
