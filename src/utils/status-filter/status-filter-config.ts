import buildFilterConfig from "@components/table-filter/build-filter-config";
import StatusEnum from "@enums/status.enum";
import statusFilterFunction from "./status-filter-function";

const statusFilterConfig = buildFilterConfig({
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
	filterFunction: statusFilterFunction,
});
export default statusFilterConfig;
