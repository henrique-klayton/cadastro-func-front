import { FragmentType, useFragment } from "@graphql/types/fragment-masking";
import { graphql } from "@graphql/types/gql";
import { EmployeeDto } from "@graphql/types/graphql";

export type EmployeeType = Omit<
	EmployeeDto,
	"createdAt" | "updatedAt" | "scheduleId"
>;

export const EmployeeFragment = graphql(`
	fragment Employee on EmployeeDto {
		id
		firstName
		lastName
		birthDate
		status
	}
`);

export default function Employee(
	fragment: FragmentType<typeof EmployeeFragment>,
): EmployeeType {
	const employee = useFragment(EmployeeFragment, fragment);
	return employee;
}
