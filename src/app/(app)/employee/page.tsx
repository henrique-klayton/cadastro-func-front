import { Col, DatePicker, Input, Row, Switch } from "antd";
import FormItem from "antd/es/form/FormItem";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";

import FromTablePageProps from "@components/data-table/interfaces/from-table-page-props";
import RelationSelectTable from "@components/relation-select-table";
import TableFilterConfigsObject from "@components/table-filter/types/table-filter-configs-object";
import TablePage from "@components/table-page";
import createRelationDataObject from "@components/table-page/create-relation-data-object";
import { EmployeeFragmentType } from "@fragments/employee";
import { FullEmployeeType } from "@fragments/full-employee";
import dateParse from "@functions/date/date-parse";
import employeeSkillsRelationColumns from "@functions/employee/employee-skills-relation-columns";
import statusFilterConfig from "@functions/status-filter/status-filter-config";
import { EmployeeCreateDto, EmployeeFilterDto } from "@graphql/types/graphql";
import { employeeTableColumns } from "@models/employee";
import { getSkills } from "../skill/actions";
import {
	createEmployee,
	deleteEmployee,
	generateEmployeeReport,
	getEmployeeWithRelations,
	getEmployees,
	updateEmployee,
} from "./actions";

dayjs.extend(localizedFormat);

export default async function EmployeePage() {
	const filters: TableFilterConfigsObject<EmployeeFilterDto> = {
		status: statusFilterConfig,
	};

	const table: FromTablePageProps<EmployeeFragmentType> = {
		rowKey: "id",
		columns: employeeTableColumns,
	};

	return (
		<TablePage<
			EmployeeFragmentType,
			EmployeeCreateDto,
			Partial<FullEmployeeType>,
			EmployeeFilterDto
		>
			table={table}
			title="Funcionários"
			itemName="Funcionário"
			actions={{
				tableQueryAction: getEmployees,
				formQueryAction: getEmployeeWithRelations,
				createAction: createEmployee,
				updateAction: updateEmployee,
				deleteAction: deleteEmployee,
				reportAction: generateEmployeeReport,
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
		</TablePage>
	);
}
