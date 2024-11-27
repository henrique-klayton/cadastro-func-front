import DataTable, { DataTableProps } from "@components/data-table";
import getUrqlClient from "@graphql/client";
import Employee, { EmployeeType } from "@graphql/fragments/employee";
import { graphql } from "@graphql/types/gql";

export default async function EmployeePage() {
	const getEmployeesListQuery = graphql(`
		query GetEmployees {
			employeeList {
				...Employee
			}
		}
	`);

	const client = getUrqlClient();
	const { data: queryResult } = await client
		.query(getEmployeesListQuery.toString(), {})
		.toPromise();
	const employee = queryResult?.employeeList.map((item) => Employee(item));
	const columns: DataTableProps<EmployeeType>["columns"] = [
		{
			dataIndex: "id",
			title: "Id",
		},
		{
			dataIndex: "firstName",
			title: "Nome",
		},
		{
			dataIndex: "lastName",
			title: "Sobrenome",
		},
		{
			dataIndex: "birthDate",
			title: "Data de Nascimento",
		},
		// {
		// 	dataIndex: "scheduleId", // TODO Change to schedule
		// 	title: "Escala",
		// },
		{
			dataIndex: "status",
			title: "Status",
		},
	];

	return <DataTable data={employee ?? []} rowKey="id" columns={columns} />;
}
