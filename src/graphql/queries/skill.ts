import { graphql } from "@graphql/types/gql";

export const getSkillQuery = graphql(`
	query GetSkill($id: Int!) {
		skill(id: $id) {
			...Skill
		}
	}
`);

export const getSkillsListQuery = graphql(`
	query GetSkills($limit: Int, $offset: Int, $filterStatus: Boolean) {
		skillList(limit: $limit, offset: $offset, filterStatus: $filterStatus) {
			data {...Skill}
			total
		}
	}
`);

export const createSkillMutation = graphql(`
	mutation CreateSkill($skill: SkillCreateDto!, $employees: [ID!]) {
		createSkill(skill: $skill, employees: $employees) {
			...Skill
		}
	}
`);

export const updateSkillMutation = graphql(`
	mutation UpdateSkill($id: Int!, $skill: SkillUpdateDto!, $employees: [ID!]) {
		updateSkill(id: $id, skill: $skill, employees: $employees) {
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
