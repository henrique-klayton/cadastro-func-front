import { TableColumn } from "@components/data-table/types";
import { ScheduleFragmentType } from "@fragments/schedule";
import scheduleTypeFormat from "@utils/schedule-type-format";
import timeTableFormat from "@utils/time-table-format";

export const scheduleTableColumns: Array<TableColumn<ScheduleFragmentType>> = [
	{
		dataIndex: "id",
		title: "Id",
	},
	{
		dataIndex: "startTime",
		title: "Hora Início",
		formatter: timeTableFormat,
	},
	{
		dataIndex: "endTime",
		title: "Hora Fim",
		formatter: timeTableFormat,
	},
	{
		dataIndex: "type",
		title: "Tipo Escala",
		formatter: scheduleTypeFormat,
	},
	{
		dataIndex: "status",
		title: "Status",
	},
];
