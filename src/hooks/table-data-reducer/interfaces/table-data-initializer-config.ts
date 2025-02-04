import TableFilterConfigsObject from "@components/table-filter/types/table-filter-configs-object";

export default interface TableDataInitializerConfig<T, F> {
	filterConfig: TableFilterConfigsObject<F>;
}
