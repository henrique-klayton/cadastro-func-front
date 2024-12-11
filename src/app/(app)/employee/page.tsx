import { Col, DatePicker, Input, Row, Switch } from "antd";
import FormItem from "antd/es/form/FormItem";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";

import { DataTableProps } from "@components/data-table/types";
import SkillsSelectTable from "@components/skills-select-table";
import TablePageComponent from "@components/table-page";
import { createRelationKeyObject } from "@components/table-page/types";
import { EmployeeFragmentType } from "@fragments/employee";
import { FullEmployeeType } from "@fragments/full-employee";
import { EmployeeCreateDto } from "@graphql/types/graphql";
import dateParse from "@utils/date-parse";
import dateTableFormat from "@utils/date-table-format";
import employeeScheduleTableFormat from "@utils/employee-schedule-table-format";
import { getSkills } from "../skill/actions";
import {
	createEmployee,
	deleteEmployee,
	getEmployeeWithRelations,
	getEmployees,
	updateEmployee,
} from "./actions";

dayjs.extend(localizedFormat);

export default async function EmployeePage() {
	const employees = await getEmployees();

	const table: DataTableProps<EmployeeFragmentType> = {
		data: employees.data,
		rowKey: "id",
		columns: [
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
		],
	};

	return (
		<TablePageComponent<
			EmployeeFragmentType,
			EmployeeCreateDto,
			Partial<FullEmployeeType>
		>
			table={table}
			totalCount={employees.total}
			title="Funcionários"
			itemName="Funcionário"
			actions={{
				tableQueryAction: getEmployees,
				formQueryAction: getEmployeeWithRelations,
				createAction: createEmployee,
				updateAction: updateEmployee,
				deleteAction: deleteEmployee,
			}}
			queryDataParsers={{
				birthDate: dateParse,
			}}
			relationsKeys={[
				createRelationKeyObject("skills", getSkills, SkillsSelectTable),
			]}
		>
			<Row gutter={16}>
				<Col span={12}>
					<FormItem
						label="Nome"
						name="firstName"
						required
						hasFeedback
						rules={[{ required: true }]}
					>
						<Input />
					</FormItem>
				</Col>
				<Col span={12}>
					<FormItem
						label="Sobrenome"
						name="lastName"
						required
						hasFeedback
						rules={[{ required: true }]}
					>
						<Input />
					</FormItem>
				</Col>
			</Row>
			<FormItem
				label="Data de Nascimento"
				name="birthDate"
				required
				hasFeedback
				rules={[{ required: true }]}
			>
				<DatePicker format="L" />
			</FormItem>
			<FormItem label="Status" name="status" required>
				<Switch />
			</FormItem>
		</TablePageComponent>
	);
}
