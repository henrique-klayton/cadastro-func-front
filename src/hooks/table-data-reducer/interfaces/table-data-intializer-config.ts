import TableFilterConfigsObject from "@components/table-filter/table-filter-configs-object";
import TablePaginationConfig from "@components/table-page/interfaces/table-pagination-config";

export default interface TableDataInitializerConfig<T, F> {
	tableData: T[];
	total: number;
	tableLoading: boolean;
	paginationChangeHandler: TablePaginationConfig["onChange"];
	filterConfig: TableFilterConfigsObject<F>;
}
