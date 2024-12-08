import { FragmentType, useFragment } from "@graphql/types/fragment-masking";
import { graphql } from "@graphql/types/gql";
import { EmployeeFragment as EmployeeFragmentType } from "@graphql/types/graphql";

export type EmployeeType = Omit<
	EmployeeFragmentType,
	"createdAt" | "updatedAt"
>;

export interface PaginatedEmployee {
	data: EmployeeType[];
	total: number;
}

export const EmployeeFragment = graphql(`
	fragment Employee on EmployeeDto {
		id
		firstName
		lastName
		birthDate
		status
		schedule {
			type
		}
	}
`);

export function Employee(
	fragment: FragmentType<typeof EmployeeFragment>,
): EmployeeType {
	const employee = useFragment(EmployeeFragment, fragment);
	return employee;
}
