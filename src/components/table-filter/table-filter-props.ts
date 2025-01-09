import StringKeyof from "@interfaces/string-keyof.type";
import TableFiltersObject from "./table-filters-object";

export default interface TableFilterProps<T> {
	filters: TableFiltersObject<T>;
	tableData: T[];
	onFilterChange: (
		key: StringKeyof<T>,
		value: number,
		filteredTableData: T[],
	) => void;
}
