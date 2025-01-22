import { Col, DatePicker, Input, Row, Switch } from "antd";
import FormItem from "antd/es/form/FormItem";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";

import FromTablePageProps from "@components/data-table/interfaces/from-table-page-props";
import RelationSelectTable from "@components/relation-select-table";
import TableFilterConfigsObject from "@components/table-filter/table-filter-configs-object";
import TablePageComponent from "@components/table-page";
import createRelationDataObject from "@components/table-page/create-relation-data-object";
import { EmployeeFragmentType } from "@fragments/employee";
import { FullEmployeeType } from "@fragments/full-employee";
import { EmployeeCreateDto, EmployeeFilterDto } from "@graphql/types/graphql";
import { employeeTableColumns } from "@models/employee";
import dateParse from "@utils/date/date-parse";
import employeeSkillsRelationColumns from "@utils/employee/employee-skills-relation-columns";
import statusFilterConfig from "@utils/status-filter/status-filter-config";
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
	const filters: TableFilterConfigsObject<EmployeeFilterDto> = {
		status: statusFilterConfig,
	};

	const employees = await getEmployees({
		status: true,
	});

	const table: FromTablePageProps<EmployeeFragmentType> = {
		data: employees.data,
		rowKey: "id",
		columns: employeeTableColumns,
	};

	return (
		<TablePageComponent<
			EmployeeFragmentType,
			EmployeeCreateDto,
			Partial<FullEmployeeType>,
			EmployeeFilterDto
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
			relationsData={[
				createRelationDataObject(
					"skills",
					employeeSkillsRelationColumns,
					getSkills,
					RelationSelectTable,
				),
			]}
			filters={filters}
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
