import TableColumn from "@components/data-table/types/table-column";
import { FormDataSerializer } from "@components/table-page/types";
import { ScheduleFragmentType } from "@fragments/schedule";
import scheduleTypeFormat from "@functions/schedule/schedule-type-format";
import timeSerialize from "@functions/time/time-serialize";
import timeTableFormat from "@functions/time/time-table-format";
import { ScheduleCreateDto, ScheduleUpdateDto } from "@graphql/types/graphql";

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

export const createSerializer: FormDataSerializer<ScheduleCreateDto> = (
	data: ScheduleCreateDto,
) => {
	data.startTime = timeSerialize(data.startTime);
	data.endTime = timeSerialize(data.endTime);
	return data;
};

export const updateSerializer: FormDataSerializer<ScheduleUpdateDto> = (
	data: ScheduleUpdateDto,
) => {
	if (data.startTime) data.startTime = timeSerialize(data.startTime);
	if (data.endTime) data.endTime = timeSerialize(data.endTime);
	return data;
};
