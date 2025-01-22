import StringKeyof from "@typings/string-keyof";
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
