import buildFilterConfig from "@components/table-filter/build-filter-config";
import StatusEnum from "@enums/status.enum";
import statusFilter from "./status-filter";

const statusFilterConfig = buildFilterConfig({
	initialValue: StatusEnum.ALL,
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
	filterFunction: statusFilter,
});
export default statusFilterConfig;
