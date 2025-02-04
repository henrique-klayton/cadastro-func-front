import buildPaginationConfig from "@components/table-page/build-pagination-config";
import TableDataInitializerConfig from "./interfaces/table-data-initializer-config";
import TableDataState from "./interfaces/table-data-state";
import FilterValues from "./types/filter-values";
export default function tableDataInitializer<T, F>({
	filterConfig,
}: TableDataInitializerConfig<T, F>): TableDataState<T, F> {
	const filterValues: FilterValues<F> = {};
	for (const key in filterConfig) {
		if (filterConfig[key]) filterValues[key] = filterConfig[key]?.initialValue;
	}

	return {
		tableData: [],
		tableLoading: true,
		filterConfig,
		filterValues,
		pagination: buildPaginationConfig({}),
	};
}
