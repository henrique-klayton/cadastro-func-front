"use client";
import DataTable, { DataTableProps } from "@components/data-table";
import { EmployeeType } from "@fragments/employee";
import { useEffect, useState } from "react";
import { getEmployees } from "./actions";

export default function EmployeePage() {
	const [isFormOpen, setIsFormOpen] = useState(false);
	const [employees, setEmployees] = useState<EmployeeType[]>([]);

	const showFormModal = () => {
		setIsFormOpen(true);
	};

	const handleOk = () => {
		setIsFormOpen(false);
	};

	const handleCancel = () => {
		setIsFormOpen(false);
	};

	useEffect(() => {
		const getEmployeesList = async () => {
			const employees = await getEmployees().catch((err) => {
				console.error(err);
				return [];
			});
			setEmployees(employees);
		};

		getEmployeesList();
	}, []);

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

	return <DataTable data={employees} rowKey="id" columns={columns} />;
}
