import { graphql } from "@graphql/types/gql";

export const getFullEmployeeQuery = graphql(`
	query GetFullEmployee($id: ID!) {
		employeeWithRelations(id: $id) {
			...FullEmployee
		}
	}
`);

export const getEmployeesListQuery = graphql(`
	query GetEmployees($limit: Int, $offset: Int, $filterStatus: Boolean) {
		employeeList(limit: $limit, offset: $offset, filterStatus: $filterStatus) {
			data {...Employee}
			total
		}
	}
`);

export const createEmployeeMutation = graphql(`
	mutation CreateEmployee($employee: EmployeeCreateDto!) {
		createEmployee(employee: $employee) {
			...Employee
		}
	}
`);

export const updateEmployeeMutation = graphql(`
	mutation UpdateEmployee($id: ID!, $employee: EmployeeUpdateDto!) {
		updateEmployee(id: $id, employee: $employee) {
			...Employee
		}
	}
`);

export const deleteEmployeeMutation = graphql(`
	mutation DeleteEmployee($id: ID!) {
		deleteEmployee(id: $id) {
			...Employee
		}
	}
`);
