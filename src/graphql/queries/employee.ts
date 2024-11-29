import { graphql } from "@graphql-types/gql";

export const getFullEmployeeQuery = graphql(`
	query GetFullEmployee($id: ID!) {
		employeeWithRelations(id: $id) {
			...FullEmployee
		}
	}
`).toString();

export const getEmployeesListQuery = graphql(`
	query GetEmployees($filterStatus: Boolean) {
		employeeList(filterStatus: $filterStatus) {
			...Employee
		}
	}
`).toString();

export const createEmployeeMutation = graphql(`
	mutation CreateEmployee($employee: EmployeeCreateDto!) {
		createEmployee(employee: $employee) {
			...Employee
		}
	}
`).toString();

export const updateEmployeeMutation = graphql(`
	mutation UpdateEmployee($id: ID!, $employee: EmployeeUpdateDto!) {
		updateEmployee(id: $id, employee: $employee) {
			...Employee
		}
	}
`).toString();

export const deleteEmployeeMutation = graphql(`
	mutation DeleteEmployee($id: ID!) {
		deleteEmployee(id: $id) {
			...Employee
		}
	}
`).toString();