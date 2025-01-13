import TableFilterConfig from "@components/table-filter/table-filter-config";
import StringKeyof from "@interfaces/string-keyof.type";

export default function buildFilterConfig<
	T,
	K extends StringKeyof<T>,
	O extends number,
>({
	initialValue,
	name,
	label,
	colSpan,
	options,
	serializer,
}: TableFilterConfig<T, K, O>) {
	return {
		initialValue,
		name,
		label,
		colSpan,
		options,
		serializer,
	};
}
