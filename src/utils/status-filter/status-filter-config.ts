import buildFilterConfig from "@components/table-filter/build-filter-config";
import StatusEnum from "@enums/status.enum";
import HaveStatus from "@interfaces/have-status";
import PartialNullable from "@typings/partial-nullable";
import statusFilterSerializer from "./status-filter-serializer";

const statusFilterConfig = buildFilterConfig<
	PartialNullable<HaveStatus>,
	"status",
	StatusEnum
>({
	initialValue: StatusEnum.ACTIVE,
	label: "Status",
	name: "status",
	colSpan: 3,
	options: [
		{
			label: "Todos",
			value: StatusEnum.ALL,
		},
		{
			label: "Ativos",
			value: StatusEnum.ACTIVE,
		},
		{
			label: "Inativos",
			value: StatusEnum.INACTIVE,
		},
	],
	serializer: statusFilterSerializer,
});
export default statusFilterConfig;
