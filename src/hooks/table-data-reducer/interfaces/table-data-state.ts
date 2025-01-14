import TableFilterConfigsObject from "@components/table-filter/table-filter-configs-object";
import TablePaginationConfig from "@components/table-page/interfaces/table-pagination-config";
import FilterValues from "../types/filter-values";

export default interface TableDataState<T, F> {
	tableData: T[];
	tableLoading: boolean;
	readonly filterConfig: Readonly<TableFilterConfigsObject<F>>;
	filterValues: FilterValues<F>;
	pagination: TablePaginationConfig;
}
