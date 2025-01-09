import TableColumn from "@components/data-table/types/table-column";
import { FormDataSerializer } from "@components/table-page/types";
import { EmployeeFragmentType } from "@fragments/employee";
import { EmployeeCreateDto, EmployeeUpdateDto } from "@graphql/types/graphql";
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

export const createSerializer: FormDataSerializer<EmployeeCreateDto> = (
	data,
) => {
	// console.log(data.birthDate);
	// data.birthDate = dateSerialize(data.birthDate);
	// console.log(data.birthDate);
	return data;
};

export const updateSerializer: FormDataSerializer<EmployeeUpdateDto> = (
	data,
) => {
	// if (data.birthDate) data.birthDate = dateSerialize(data.birthDate);
	return data;
};
