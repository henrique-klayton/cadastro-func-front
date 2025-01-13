import StringKeyof from "@interfaces/string-keyof.type";
import TableFilterConfigsObject from "./table-filter-configs-object";

export default interface TableFilterProps<T, F> {
	filters: TableFilterConfigsObject<F>;
	tableData: T[];
	onFilterChange: (key: StringKeyof<F>, value: number) => void;
}
