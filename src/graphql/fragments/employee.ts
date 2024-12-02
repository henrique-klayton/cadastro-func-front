import { FragmentType, useFragment } from "@graphql/types/fragment-masking";
import { graphql } from "@graphql/types/gql";
import {
	EmployeeFragment as EmployeeFragmentType,
	FullEmployeeFragment as FullEmployeeFragmentType,
} from "@graphql/types/graphql";
import { ScheduleFragment, ScheduleType } from "./schedule";
import { SkillFragment, SkillType } from "./skill";

export type EmployeeType = Omit<
	EmployeeFragmentType,
	"createdAt" | "updatedAt"
>;

export interface FullEmployeeType
	extends Omit<FullEmployeeFragmentType, "schedule" | "skills"> {
	schedule: ScheduleType;
	skills: SkillType[];
}

export const EmployeeFragment = graphql(`
	fragment Employee on EmployeeDto {
		id
		firstName
		lastName
		birthDate
		status
	}
`);

export const FullEmployeeFragment = graphql(`
	fragment FullEmployee on EmployeeFullDto {
		id
		firstName
		lastName
		birthDate
		status
		schedule { ...Schedule }
		skills { ...Skill }
	}
`);

export function Employee(
	fragment: FragmentType<typeof EmployeeFragment>,
): EmployeeType {
	const employee = useFragment(EmployeeFragment, fragment);
	return employee;
}

export function FullEmployee(
	fragment: FragmentType<typeof FullEmployeeFragment>,
): FullEmployeeType {
	const {
		schedule: scheduleFragment,
		skills: skillsFragment,
		...employee
	} = useFragment(FullEmployeeFragment, fragment);
	const schedule = useFragment(ScheduleFragment, scheduleFragment);
	const skills = skillsFragment.map((skill) =>
		useFragment(SkillFragment, skill),
	);
	return { schedule, skills, ...employee };
}
