"use server";
import getUrqlClient from "@graphql/client";
import Employee from "@graphql/fragments/employee";
import { graphql } from "@graphql/types";

export async function getEmployees() {
	const getEmployeesListQuery = graphql(`
		query GetEmployees {
			employeeList {
				...Employee
			}
		}
	`);

	const createEmployeeMutation = graphql(`
		mutation CreateEmployee($employee: EmployeeCreateDto!) {
			createEmployee(employee: $employee) {
				...Employee
			}
		}
	`);
	const { data: queryResult } = await getUrqlClient()
		.query(getEmployeesListQuery.toString(), {})
		.toPromise();
	const employees = queryResult?.employeeList.map((item) => Employee(item));
	return employees ?? [];
}
