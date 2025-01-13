import StringKeyof from "@interfaces/string-keyof.type";
import TableFilterOption from "./table-filter-option";

export default interface TableFilterConfig<
	T,
	K extends StringKeyof<T>,
	O extends number,
> {
	initialValue: O;
	name: K;
	label: string;
	colSpan: number;
	options: TableFilterOption<O>[];
	serializer: (value: O) => T[K];
}
