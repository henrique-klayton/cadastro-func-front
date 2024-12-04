"use server";
import { Skill, SkillType } from "@fragments/skill";
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

// FIXME Treat errors in all server actions

// FIXME Catch errors
export async function getSkill(id: number): Promise<SkillType> {
	const queryResult = await runQuery(getSkillQuery, { id });
	const skill = Skill(queryResult.skill);
	return skill;
}

// FIXME Catch errors
export async function getSkills(): Promise<SkillType[]> {
	const queryResult = await runQuery(getSkillsListQuery);
	const skills = queryResult.skillList.map((item) => Skill(item));
	return skills;
}

// FIXME Catch errors
export async function createSkill(data: SkillCreateDto): Promise<SkillType> {
	const created = await runMutation(createSkillMutation, { skill: data });
	const skill = Skill(created.createSkill);
	return skill;
}

// FIXME Catch errors
export async function updateSkill(
	id: number,
	data: SkillUpdateDto,
): Promise<SkillType> {
	const updated = await runMutation(updateSkillMutation, {
		id,
		skill: data,
	});
	const skill = Skill(updated.updateSkill);
	return skill;
}

// FIXME Catch errors
export async function deleteSkill(id: number): Promise<SkillType> {
	const deleted = await runMutation(deleteSkillMutation, { id });
	const skill = Skill(deleted.deleteSkill);
	return skill;
}
