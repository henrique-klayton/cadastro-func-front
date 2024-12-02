import { graphql } from "@graphql/types/gql";

export const getSkillsListQuery = graphql(`
	query GetSkills {
		skillList {
			...Skill
		}
	}
`);
