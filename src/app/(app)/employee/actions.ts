"use server";
import {
	Employee,
	EmployeeFragmentType,
	PaginatedEmployee,
} from "@fragments/employee";
import { FullEmployee, FullEmployeeType } from "@fragments/full-employee";
import calculateLimitOffset from "@functions/calculate-limit-offset";
import catchGraphQLError from "@functions/catch-graphql-error";
import runMutation from "@graphql/run-mutation";
import runQuery from "@graphql/run-query";
import {
	EmployeeCreateDto,
	EmployeeFilterDto,
	EmployeeUpdateDto,
} from "@graphql/types/graphql";
import { createSerializer, updateSerializer } from "@models/employee";
import {
	createEmployeeMutation,
	deleteEmployeeMutation,
	getEmployeesListQuery,
	getFullEmployeeQuery,
	updateEmployeeMutation,
} from "@queries/employee";
import { employeesReport } from "@queries/report";
import { revalidateTag } from "next/cache";

const queryErrorMsg = "Erro ao carregar Funcionário!";
const queryManyErrorMsg = "Erro ao carregar Funcionários!";
const createErrorMsg = "Erro ao criar Funcionário!";
const updateErrorMsg = "Erro ao atualizar Funcionário!";
const deleteErrorMsg = "Erro ao remover Funcionário!";
const queryTag = "employeesList";

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
	filter: EmployeeFilterDto,
	page?: number,
	pageSize?: number,
): Promise<PaginatedEmployee> {
	try {
		const queryResult = await runQuery(
			getEmployeesListQuery,
			{
				filter,
				...calculateLimitOffset(page, pageSize),
			},
			queryTag,
		);
		const result = queryResult.employeeList;
		const employees = result.data.map((item) => Employee(item));
		return { data: employees, total: result.total };
	} catch (err) {
		catchGraphQLError(err, queryManyErrorMsg);
	}
}

export async function createEmployee(
	data: EmployeeCreateDto,
	relations?: { skills?: number[] },
) {
	try {
		const created = await runMutation(createEmployeeMutation, {
			employee: createSerializer(data),
			skills: relations?.skills,
		});
		const employee = Employee(created.createEmployee);
		revalidateTag(queryTag);
		return employee;
	} catch (err) {
		catchGraphQLError(err, createErrorMsg);
	}
}

export async function generateEmployeeReport() {
	const queryResult = await runQuery(employeesReport, undefined, queryTag);
	const report = queryResult.generateEmployeeReport;
	return report;
}

export async function updateEmployee(
	id: string,
	data: EmployeeUpdateDto,
	relations?: { skills?: number[] },
): Promise<EmployeeFragmentType> {
	try {
		const updated = await runMutation(updateEmployeeMutation, {
			id,
			employee: updateSerializer(data),
			skills: relations?.skills,
		});
		const employee = Employee(updated.updateEmployee);
		revalidateTag(queryTag);
		return employee;
	} catch (err) {
		catchGraphQLError(err, updateErrorMsg);
	}
}

export async function deleteEmployee(
	id: string,
): Promise<EmployeeFragmentType> {
	try {
		const deleted = await runMutation(deleteEmployeeMutation, { id });
		const employee = Employee(deleted.deleteEmployee);
		revalidateTag(queryTag);
		return employee;
	} catch (err) {
		catchGraphQLError(err, deleteErrorMsg);
	}
}
