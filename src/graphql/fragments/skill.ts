import { FragmentType, useFragment } from "@graphql/types/fragment-masking";
import { graphql } from "@graphql/types/gql";
import { SkillFragment as SkillFragmentType } from "@graphql/types/graphql";

export type SkillType = SkillFragmentType;

export interface PaginatedSkill {
	data: SkillType[];
	total: number;
}

export const SkillFragment = graphql(`
	fragment Skill on SkillDto {
		id
		description
		status
	}
`);

export function Skill(fragment: FragmentType<typeof SkillFragment>): SkillType {
	const skill = useFragment(SkillFragment, fragment);
	return skill;
}
