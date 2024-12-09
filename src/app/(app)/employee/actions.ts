"use server";
import { Employee, EmployeeType, PaginatedEmployee } from "@fragments/employee";
import { FullEmployeeType } from "@fragments/full-employee";
import { FullEmployee } from "@fragments/full-employee";
import runMutation from "@graphql/run-mutation";
import runQuery from "@graphql/run-query";
import { EmployeeCreateDto, EmployeeUpdateDto } from "@graphql/types/graphql";
import {
	createEmployeeMutation,
	deleteEmployeeMutation,
	getEmployeesListQuery,
	getFullEmployeeQuery,
	updateEmployeeMutation,
} from "@queries/employee";
import { calculateLimitOffset } from "@utils/calculate-limit-offset";

// FIXME Treat errors in all server actions

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

// FIXME Catch errors
export async function getEmployees(
	page?: number,
	pageSize?: number,
	filterStatus = false,
): Promise<PaginatedEmployee> {
	const queryResult = await runQuery(getEmployeesListQuery, {
		filterStatus,
		...calculateLimitOffset(page, pageSize),
	});
	const result = queryResult.employeeList;
	const employees = result.data.map((item) => Employee(item));
	return { data: employees, total: result.total };
}

// FIXME Catch errors
export async function createEmployee(data: EmployeeCreateDto) {
	const created = await runMutation(createEmployeeMutation, {
		employee: data,
	});
	const employee = Employee(created.createEmployee);
	return employee;
}

// FIXME Catch errors
export async function updateEmployee(
	id: string,
	data: EmployeeUpdateDto,
): Promise<EmployeeType> {
	const updated = await runMutation(updateEmployeeMutation, {
		id,
		employee: data,
	});
	const employee = Employee(updated.updateEmployee);
	return employee;
}

// FIXME Catch errors
export async function deleteEmployee(id: string): Promise<EmployeeType> {
	const deleted = await runMutation(deleteEmployeeMutation, { id });
	const employee = Employee(deleted.deleteEmployee);
	return employee;
}
