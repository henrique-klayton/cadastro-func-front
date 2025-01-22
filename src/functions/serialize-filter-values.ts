import TableFilterConfigsObject from "@components/table-filter/types/table-filter-configs-object";
import FilterValues from "@hooks/table-data-reducer/types/filter-values";

export default function serializeFilterValues<F>(
	filterValues: FilterValues<F>,
	filterConfig: TableFilterConfigsObject<F>,
): F {
	const filter = {} as F;
	for (const key in filterValues) {
		const value = filterValues[key];
		const serializer = filterConfig[key]?.serializer;
		if (value != null && serializer != null) filter[key] = serializer(value);
	}
	return filter;
}
