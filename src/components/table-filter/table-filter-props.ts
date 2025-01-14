import StringKeyof from "@interfaces/string-keyof.type";
import TableFilterConfigsObject from "./table-filter-configs-object";

export default interface TableFilterProps<F> {
	filters: TableFilterConfigsObject<F>;
	onFilterChange: (key: StringKeyof<F>, value: number) => void;
}
