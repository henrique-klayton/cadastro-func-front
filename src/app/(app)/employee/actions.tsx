"use server";
import {
	Employee,
	EmployeeType,
	FullEmployee,
	FullEmployeeType,
} from "@fragments/employee";
import { graphql } from "@graphql-types/gql";
import { EmployeeCreateDto } from "@graphql-types/graphql";
import getUrqlClient from "@graphql/client";

const getFullEmployeeQuery = graphql(`
	query GetFullEmployee($id: ID!) {
		employeeWithRelations(id: $id) {
			...FullEmployee
		}
	}
`).toString();

const getEmployeesListQuery = graphql(`
	query GetEmployees($filterStatus: Boolean) {
		employeeList(filterStatus: $filterStatus) {
			...Employee
		}
	}
`).toString();

const createEmployeeMutation = graphql(`
	mutation CreateEmployee($employee: EmployeeCreateDto!) {
		createEmployee(employee: $employee) {
			...Employee
		}
	}
`).toString();

const updateEmployeeMutation = graphql(`
	mutation UpdateEmployee($id: ID!, $employee: EmployeeUpdateDto!) {
		updateEmployee(id: $id, employee: $employee) {
			...Employee
		}
	}
`).toString();

const deleteEmployeeMutation = graphql(`
	mutation DeleteEmployee($id: ID!) {
		deleteEmployee(id: $id) {
			...Employee
		}
	}
`).toString();

export async function getEmployeeWithRelations(
	id: string,
): Promise<FullEmployeeType> {
	const { data: queryResult } = await getUrqlClient()
		.query(getFullEmployeeQuery, { id })
		.toPromise();
	if (queryResult?.employeeWithRelations != null) {
		return FullEmployee(queryResult.employeeWithRelations);
	}
	throw new Error("Error getting employee with relations");
}

export async function getEmployees(
	filterStatus = false,
): Promise<EmployeeType[]> {
	const { data: queryResult } = await getUrqlClient()
		.query(getEmployeesListQuery, { filterStatus })
		.toPromise();
	const employees = queryResult?.employeeList.map((item) => Employee(item));
	return employees ?? [];
}

export async function createEmployee(data: EmployeeCreateDto) {
	const created = getUrqlClient()
		.mutation(createEmployeeMutation, {
			employee: data,
		})
		.toPromise();
}

export async function updateEmployee() {}

export async function deleteEmployee() {}
