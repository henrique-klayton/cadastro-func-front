"use server";
import { Skill, SkillType } from "@fragments/skill";
import runQuery from "@graphql/run-query";
import { getSkillsListQuery } from "@queries/skill";

export async function getSkills(): Promise<SkillType[]> {
	const queryResult = await runQuery(getSkillsListQuery);
	const skills = queryResult.skillList.map((item) => Skill(item));
	return skills;
}
