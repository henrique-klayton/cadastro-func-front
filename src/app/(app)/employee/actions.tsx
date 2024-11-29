"use server";
import {
	Employee,
	EmployeeType,
	FullEmployee,
	FullEmployeeType,
} from "@fragments/employee";
import { EmployeeCreateDto } from "@graphql-types/graphql";
import getUrqlClient from "@graphql/client";
import {
	createEmployeeMutation,
	getEmployeesListQuery,
	getFullEmployeeQuery,
} from "@queries/employee";

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
