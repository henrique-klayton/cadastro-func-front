import { FragmentType, graphql, useFragment } from "@graphql/types";
import { FullEmployeeFragment as FullEmployeeFragmentType } from "@graphql/types/graphql";
import { ScheduleFragment, ScheduleFragmentType } from "./schedule";
import { SkillFragment, SkillFragmentType } from "./skill";

export interface FullEmployeeType
	extends Omit<FullEmployeeFragmentType, "schedule" | "skills"> {
	schedule: ScheduleFragmentType;
	skills: SkillFragmentType[];
}

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
export function FullEmployee(
	fragment: FragmentType<typeof FullEmployeeFragment>,
): FullEmployeeType {
	const employee = useFragment(FullEmployeeFragment, fragment);
	employee.schedule = useFragment(ScheduleFragment, employee.schedule);
	employee.skills = employee.skills.map((skill) =>
		useFragment(SkillFragment, skill),
	);
	return employee as FullEmployeeType;
}
