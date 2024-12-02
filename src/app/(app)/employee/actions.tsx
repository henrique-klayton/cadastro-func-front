"use server";
import {
	Employee,
	EmployeeType,
	FullEmployee,
	FullEmployeeType,
} from "@fragments/employee";
import runMutation from "@graphql/run-mutation";
import runQuery from "@graphql/run-query";
import { EmployeeCreateDto } from "@graphql/types/graphql";
import {
	createEmployeeMutation,
	getEmployeesListQuery,
	getFullEmployeeQuery,
} from "@queries/employee";

export async function getEmployeeWithRelations(
	id: string,
): Promise<FullEmployeeType> {
	try {
		const queryResult = await runQuery(getFullEmployeeQuery, { id });
		return FullEmployee(queryResult.employeeWithRelations);
	} catch (error) {
		throw new Error("Error getting employee with relations", { cause: error });
	}
}

export async function getEmployees(
	filterStatus = false,
): Promise<EmployeeType[]> {
	const queryResult = await runQuery(getEmployeesListQuery, { filterStatus });
	const employees = queryResult.employeeList.map((item) => Employee(item));
	return employees;
}

export async function createEmployee(data: EmployeeCreateDto) {
	const created = runMutation(createEmployeeMutation, {
		employee: data,
	});
}

export async function updateEmployee() {}

export async function deleteEmployee() {}
