"use server";
import { graphql } from "@graphql-types/gql";
import getUrqlClient from "@graphql/client";
import Employee from "@fragments/employee";

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
