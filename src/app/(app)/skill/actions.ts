"use server";
import { PaginatedSkill, Skill, SkillType } from "@fragments/skill";
import runMutation from "@graphql/run-mutation";
import runQuery from "@graphql/run-query";
import { SkillCreateDto, SkillUpdateDto } from "@graphql/types/graphql";
import {
	createSkillMutation,
	deleteSkillMutation,
	getSkillQuery,
	getSkillsListQuery,
	updateSkillMutation,
} from "@queries/skill";
import { calculateLimitOffset } from "@utils/calculate-limit-offset";
import catchGraphQLError from "@utils/catch-graphql-error";
import { revalidatePath } from "next/cache";

const queryErrorMsg = "Erro ao carregar Habilidade!";
const queryManyErrorMsg = "Erro ao carregar Habilidades!";
const createErrorMsg = "Erro ao criar Habilidade!";
const updateErrorMsg = "Erro ao atualizar Habilidade!";
const deleteErrorMsg = "Erro ao remover Habilidade!";

export async function getSkill(id: number): Promise<SkillType> {
	try {
		const queryResult = await runQuery(getSkillQuery, { id });
		const skill = Skill(queryResult.skill);
		return skill;
	} catch (err) {
		catchGraphQLError(err, queryErrorMsg);
	}
}

export async function getSkills(
	page?: number,
	pageSize?: number,
	filterStatus = false,
): Promise<PaginatedSkill> {
	try {
		const queryResult = await runQuery(getSkillsListQuery, {
			filterStatus,
			...calculateLimitOffset(page, pageSize),
		});
		const result = queryResult.skillList;
		const skills = result.data.map((item) => Skill(item));
		return { data: skills, total: result.total };
	} catch (err) {
		catchGraphQLError(err, queryManyErrorMsg);
	}
}

export async function createSkill(
	data: SkillCreateDto,
	employees?: string[],
): Promise<SkillType> {
	try {
		const created = await runMutation(createSkillMutation, {
			skill: data,
			employees,
		});
		const skill = Skill(created.createSkill);
		revalidatePath("/skill");
		return skill;
	} catch (err) {
		catchGraphQLError(err, createErrorMsg);
	}
}

export async function updateSkill(
	id: number,
	data: SkillUpdateDto,
	employees?: string[],
): Promise<SkillType> {
	try {
		const updated = await runMutation(updateSkillMutation, {
			id,
			skill: data,
			employees,
		});
		const skill = Skill(updated.updateSkill);
		revalidatePath("/skill");
		return skill;
	} catch (err) {
		catchGraphQLError(err, updateErrorMsg);
	}
}

export async function deleteSkill(id: number): Promise<SkillType> {
	try {
		const deleted = await runMutation(deleteSkillMutation, { id });
		const skill = Skill(deleted.deleteSkill);
		revalidatePath("/skill");
		return skill;
	} catch (err) {
		catchGraphQLError(err, deleteErrorMsg);
	}
}
