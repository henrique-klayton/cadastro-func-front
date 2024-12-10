import { FragmentType, useFragment } from "@graphql/types/fragment-masking";
import { graphql } from "@graphql/types/gql";

import { SkillFragment as SkillFragmentType } from "@graphql/types/graphql";
export type { SkillFragment as SkillFragmentType } from "@graphql/types/graphql";

export interface PaginatedSkill {
	data: SkillFragmentType[];
	total: number;
}

export const SkillFragment = graphql(`
	fragment Skill on SkillDto {
		id
		description
		status
	}
`);

export function Skill(
	fragment: FragmentType<typeof SkillFragment>,
): SkillFragmentType {
	const skill = useFragment(SkillFragment, fragment);
	return skill;
}
