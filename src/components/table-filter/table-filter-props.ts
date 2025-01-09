import StringKeyof from "@interfaces/string-keyof.type";
import TableFilterConfigsObject from "./table-filter-configs-object";

export default interface TableFilterProps<T> {
	filters: TableFilterConfigsObject<T>;
	tableData: T[];
	onFilterChange: (
		key: StringKeyof<T>,
		value: number,
		filteredTableData: T[],
	) => void;
}
