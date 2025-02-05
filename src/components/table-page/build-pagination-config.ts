import MIN_PAGE_SIZE from "@consts/min-page-size.const";
import { TablePaginationConfig as AntdTablePaginationConfig } from "antd/lib";
import TablePaginationConfig from "./interfaces/table-pagination-config";

export default function buildPaginationConfig({
	current,
	page: newPage,
	pageSize,
	total,
	pageSizeOptions,
	showSizeChanger,
	onChange,
}: Partial<TablePaginationConfig>): TablePaginationConfig {
	const defaultSizeOptions = [MIN_PAGE_SIZE, 20, 50, 100];
	const page = newPage ?? current ?? 1;
	const config = {
		current: page,
		pageSize: pageSize ?? MIN_PAGE_SIZE,
		total: total ?? 0,
		pageSizeOptions: pageSizeOptions ?? defaultSizeOptions,
		showSizeChanger: showSizeChanger ?? (total ? total > MIN_PAGE_SIZE : false),
		onChange,
	} satisfies AntdTablePaginationConfig;

	if (total)
		config.pageSizeOptions = config.pageSizeOptions.filter(
			(size) => size <= total,
		);
	return { ...config, page };
}
