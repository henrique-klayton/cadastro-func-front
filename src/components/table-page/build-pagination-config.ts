import MIN_PAGE_SIZE from "@consts/min-page-size";
import PAGE_SIZE_OPTIONS from "@consts/page-size-options";
import { TablePaginationConfig as AntdTablePaginationConfig } from "antd/lib";
import TablePaginationConfig from "./interfaces/table-pagination-config";

export default function buildPaginationConfig({
	current,
	page: newPage,
	pageSize,
	total: newTotal,
	pageSizeOptions: _pageSizeOptions,
	showSizeChanger,
	onChange,
	lastState,
}: Partial<TablePaginationConfig>): TablePaginationConfig {
	const state = {
		current: 1,
		page: 1,
		pageSize: MIN_PAGE_SIZE,
		total: 0,
		onChange: undefined,
	};
	if (lastState) Object.assign(state, lastState);

	const page = newPage ?? current ?? state.current;
	const total = newTotal ?? state.total;
	const maxSizeIndex = PAGE_SIZE_OPTIONS.findIndex((size) => size >= total);
	const config = {
		current: page,
		pageSize: pageSize ?? state.pageSize,
		total,
		pageSizeOptions: PAGE_SIZE_OPTIONS.slice(0, maxSizeIndex + 1),
		showSizeChanger: showSizeChanger ?? total > MIN_PAGE_SIZE,
		onChange: onChange ?? state.onChange,
	} satisfies AntdTablePaginationConfig;
	return {
		...config,
		page,
	};
}
