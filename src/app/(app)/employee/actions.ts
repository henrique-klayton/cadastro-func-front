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
import catchGraphQLError from "@utils/catch-graphql-error";

const queryErrorMsg = "Erro ao carregar Funcionário!";
const queryManyErrorMsg = "Erro ao carregar Funcionários!";
const createErrorMsg = "Erro ao criar Funcionário!";
const updateErrorMsg = "Erro ao atualizar Funcionário!";
const deleteErrorMsg = "Erro ao remover Funcionário!";

export async function getEmployeeWithRelations(
	id: string,
): Promise<FullEmployeeType> {
	try {
		const queryResult = await runQuery(getFullEmployeeQuery, { id });
		return FullEmployee(queryResult.employeeWithRelations);
	} catch (err) {
		catchGraphQLError(err, queryErrorMsg);
	}
}

export async function getEmployees(
	page?: number,
	pageSize?: number,
	filterStatus = false,
): Promise<PaginatedEmployee> {
	try {
		const queryResult = await runQuery(getEmployeesListQuery, {
			filterStatus,
			...calculateLimitOffset(page, pageSize),
		});
		const result = queryResult.employeeList;
		const employees = result.data.map((item) => Employee(item));
		return { data: employees, total: result.total };
	} catch (err) {
		catchGraphQLError(err, queryManyErrorMsg);
	}
}

export async function createEmployee(data: EmployeeCreateDto) {
	try {
		const created = await runMutation(createEmployeeMutation, {
			employee: data,
		});
		const employee = Employee(created.createEmployee);
		return employee;
	} catch (err) {
		catchGraphQLError(err, createErrorMsg);
	}
}

export async function updateEmployee(
	id: string,
	data: EmployeeUpdateDto,
): Promise<EmployeeType> {
	try {
		const updated = await runMutation(updateEmployeeMutation, {
			id,
			employee: data,
		});
		const employee = Employee(updated.updateEmployee);
		return employee;
	} catch (err) {
		catchGraphQLError(err, updateErrorMsg);
	}
}

export async function deleteEmployee(id: string): Promise<EmployeeType> {
	try {
		const deleted = await runMutation(deleteEmployeeMutation, { id });
		const employee = Employee(deleted.deleteEmployee);
		return employee;
	} catch (err) {
		catchGraphQLError(err, deleteErrorMsg);
	}
}
