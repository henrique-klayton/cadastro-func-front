import StringKeyof from "@typings/string-keyof";
import TableFilterConfigsObject from "../types/table-filter-configs-object";

export default interface TableFilterProps<F> {
	filters: TableFilterConfigsObject<F>;
	onFilterChange: (key: StringKeyof<F>, value: number) => void;
}
