import { graphql } from "@graphql/types/gql";

export const getSkillQuery = graphql(`
	query GetSkill($id: Int!) {
		skill(id: $id) {
			...Skill
		}
	}
`);

export const getSkillsListQuery = graphql(`
	query GetSkills {
		skillList {
			...Skill
		}
	}
`);

export const createSkillMutation = graphql(`
	mutation CreateSkill($skill: SkillCreateDto!) {
		createSkill(skill: $skill) {
			...Skill
		}
	}
`);

export const updateSkillMutation = graphql(`
	mutation UpdateSkill($id: Int!, $skill: SkillUpdateDto!) {
		updateSkill(id: $id, skill: $skill) {
			...Skill
		}
	}
`);

export const deleteSkillMutation = graphql(`
	mutation DeleteSkill($id: Int!) {
		deleteSkill(id: $id) {
			...Skill
		}
	}
`);
