"use server";
import { PaginatedSkill, Skill, SkillFragmentType } from "@fragments/skill";
import calculateLimitOffset from "@functions/calculate-limit-offset";
import catchGraphQLError from "@functions/catch-graphql-error";
import runMutation from "@graphql/run-mutation";
import runQuery from "@graphql/run-query";
import {
	SkillCreateDto,
	SkillFilterDto,
	SkillUpdateDto,
} from "@graphql/types/graphql";
import { createSerializer, updateSerializer } from "@models/skill";
import { skillsReport } from "@queries/report";
import {
	createSkillMutation,
	deleteSkillMutation,
	getSkillQuery,
	getSkillsListQuery,
	updateSkillMutation,
} from "@queries/skill";
import { revalidateTag } from "next/cache";

const queryErrorMsg = "Erro ao carregar Habilidade!";
const queryManyErrorMsg = "Erro ao carregar Habilidades!";
const createErrorMsg = "Erro ao criar Habilidade!";
const updateErrorMsg = "Erro ao atualizar Habilidade!";
const deleteErrorMsg = "Erro ao remover Habilidade!";
const queryTag = "skillsList";

export async function getSkill(id: number): Promise<SkillFragmentType> {
	try {
		const queryResult = await runQuery(getSkillQuery, { id });
		const skill = Skill(queryResult.skill);
		return skill;
	} catch (err) {
		catchGraphQLError(err, queryErrorMsg);
	}
}

export async function getSkills(
	filter: SkillFilterDto,
	page?: number,
	pageSize?: number,
): Promise<PaginatedSkill> {
	try {
		const queryResult = await runQuery(
			getSkillsListQuery,
			{
				filter,
				...calculateLimitOffset(page, pageSize),
			},
			queryTag,
		);
		const result = queryResult.skillList;
		const skills = result.data.map((item) => Skill(item));
		return { data: skills, total: result.total };
	} catch (err) {
		catchGraphQLError(err, queryManyErrorMsg);
	}
}

export async function generateSkillReport() {
	const queryResult = await runQuery(skillsReport, undefined, queryTag);
	const report = queryResult.generateSkillReport;
	return report;
}

export async function createSkill(
	data: SkillCreateDto,
	// employees?: string[],
): Promise<SkillFragmentType> {
	try {
		const created = await runMutation(createSkillMutation, {
			skill: createSerializer(data),
			// employees,
		});
		const skill = Skill(created.createSkill);
		revalidateTag(queryTag);
		return skill;
	} catch (err) {
		catchGraphQLError(err, createErrorMsg);
	}
}

export async function updateSkill(
	id: number,
	data: SkillUpdateDto,
	// employees?: string[],
): Promise<SkillFragmentType> {
	try {
		const updated = await runMutation(updateSkillMutation, {
			id,
			skill: updateSerializer(data),
			// employees,
		});
		const skill = Skill(updated.updateSkill);
		revalidateTag(queryTag);
		return skill;
	} catch (err) {
		catchGraphQLError(err, updateErrorMsg);
	}
}

export async function deleteSkill(id: number): Promise<SkillFragmentType> {
	try {
		const deleted = await runMutation(deleteSkillMutation, { id });
		const skill = Skill(deleted.deleteSkill);
		revalidateTag(queryTag);
		return skill;
	} catch (err) {
		catchGraphQLError(err, deleteErrorMsg);
	}
}
