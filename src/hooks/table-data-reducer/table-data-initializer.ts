"use client";
import buildPaginationConfig from "@components/table-page/build-pagination-config";
import TableDataInitializerConfig from "./interfaces/table-data-intializer-config";
import TableDataState from "./interfaces/table-data-state";
import FilterValues from "./types/filter-values";
export default function tableDataInitializer<T, F>(
	config: TableDataInitializerConfig<T, F>,
): TableDataState<T, F> {
	const {
		tableData,
		total,
		tableLoading,
		paginationChangeHandler,
		filterConfig,
	} = config;
	const filterValues: FilterValues<F> = {};
	for (const key in filterConfig) {
		if (filterConfig[key]) filterValues[key] = filterConfig[key]?.initialValue;
	}

	return {
		tableData,
		tableLoading,
		filterConfig,
		filterValues,
		pagination: buildPaginationConfig({
			total,
			onChange: paginationChangeHandler,
		}),
	};
}
