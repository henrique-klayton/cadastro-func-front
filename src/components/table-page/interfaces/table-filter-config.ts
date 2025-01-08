import StringKeyof from "@interfaces/string-keyof.type";
import TableFilterOption from "./table-filter-option";

export default interface TableFilterConfig<
	T,
	K extends StringKeyof<T>,
	O extends number,
> {
	value: O;
	name: K;
	label: string;
	colSpan: number;
	options: TableFilterOption<O>[];
	filterFunction: (value: T[K], data: T, option: O) => boolean;
}
