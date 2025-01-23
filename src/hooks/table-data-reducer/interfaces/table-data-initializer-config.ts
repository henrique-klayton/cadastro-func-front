import TableFilterConfigsObject from "@components/table-filter/types/table-filter-configs-object";
import TablePaginationConfig from "@components/table-page/interfaces/table-pagination-config";

export default interface TableDataInitializerConfig<T, F> {
	paginationChangeHandler: TablePaginationConfig["onChange"];
	filterConfig: TableFilterConfigsObject<F>;
}
