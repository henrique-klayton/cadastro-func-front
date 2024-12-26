import { TableColumn } from "@components/data-table/types";
import { EmployeeFragmentType } from "@fragments/employee";
import dateTableFormat from "@utils/date-table-format";
import employeeScheduleTableFormat from "@utils/employee-schedule-table-format";

export const employeeTableColumns: Array<TableColumn<EmployeeFragmentType>> = [
	{
		dataIndex: "id",
		title: "Id",
		width: 300,
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
		formatter: dateTableFormat,
		width: 120,
	},
	{
		dataIndex: "schedule",
		title: "Escala",
		formatter: employeeScheduleTableFormat,
	},
	{
		dataIndex: "status",
		title: "Status",
	},
];
