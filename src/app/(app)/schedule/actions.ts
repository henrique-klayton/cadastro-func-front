"use server";
import {
	PaginatedSchedule,
	Schedule,
	ScheduleFragmentType,
} from "@fragments/schedule";
import calculateLimitOffset from "@functions/calculate-limit-offset";
import catchGraphQLError from "@functions/catch-graphql-error";
import runMutation from "@graphql/run-mutation";
import runQuery from "@graphql/run-query";
import {
	ScheduleCreateDto,
	ScheduleFilterDto,
	ScheduleUpdateDto,
} from "@graphql/types/graphql";
import { createSerializer, updateSerializer } from "@models/schedule";
import {
	createScheduleMutation,
	deleteScheduleMutation,
	getScheduleQuery,
	getSchedulesListQuery,
	updateScheduleMutation,
} from "@queries/schedule";
import { revalidateTag } from "next/cache";

const queryErrorMsg = "Erro ao carregar Escala!";
const queryManyErrorMsg = "Erro ao carregar Escalas!";
const createErrorMsg = "Erro ao criar Escala!";
const updateErrorMsg = "Erro ao atualizar Escala!";
const deleteErrorMsg = "Erro ao remover Escala!";
const queryTag = "schedulesList";

export async function getSchedule(id: number): Promise<ScheduleFragmentType> {
	try {
		const queryResult = await runQuery(getScheduleQuery, { id });
		return Schedule(queryResult.schedule);
	} catch (err) {
		catchGraphQLError(err, queryErrorMsg);
	}
}

export async function getSchedules(
	filter: ScheduleFilterDto,
	page?: number,
	pageSize?: number,
): Promise<PaginatedSchedule> {
	try {
		const queryResult = await runQuery(
			getSchedulesListQuery,
			{
				filter,
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
