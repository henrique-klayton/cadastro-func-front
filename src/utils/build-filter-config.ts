import TableFilterConfig from "@components/table-page/interfaces/table-filter-config";
import StringKeyof from "@interfaces/string-keyof.type";

export default function buildFilterConfig<
	T,
	K extends StringKeyof<T>,
	O extends number,
>({
	value,
	name,
	label,
	colSpan,
	options,
	filterFunction,
}: TableFilterConfig<T, K, O>) {
	return {
		value,
		name,
		label,
		colSpan,
		options,
		filterFunction,
	};
}
