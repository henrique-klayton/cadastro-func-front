import { FragmentType, useFragment } from "@graphql-types/fragment-masking";
import { graphql } from "@graphql-types/gql";
import { SkillDto } from "@graphql-types/graphql";

export const SkillFragment = graphql(`
	fragment Skill on SkillDto {
		id
		description
		status
	}
`);

export default function Skill(
	fragment: FragmentType<typeof SkillFragment>,
): SkillDto {
	const skill = useFragment(SkillFragment, fragment);
	return skill;
}
