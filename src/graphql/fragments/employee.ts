import { FragmentType, useFragment } from "@graphql/types/fragment-masking";
import { graphql } from "@graphql/types/gql";
import { EmployeeFragment as EmployeeFragmentType } from "@graphql/types/graphql";
export type { EmployeeFragment as EmployeeFragmentType } from "@graphql/types/graphql";

export interface PaginatedEmployee {
	data: EmployeeFragmentType[];
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
): EmployeeFragmentType {
	const employee = useFragment(EmployeeFragment, fragment);
	return employee;
}
