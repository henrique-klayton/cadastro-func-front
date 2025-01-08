"use client";
import { TablePaginationConfig as AntdTablePaginationConfig } from "antd/lib";
import TablePaginationConfig from "./interfaces/table-pagination-config";

export default function buildPaginationConfig({
	current,
	page,
	pageSize,
	total,
	pageSizeOptions,
	showSizeChanger,
	onChange,
}: TablePaginationConfig): TablePaginationConfig {
	const minPageSize = 10;
	const defaultSizeOptions = [minPageSize, 20, 50, 100];
	const config = {
		current: current ?? page ?? 1,
		pageSize: pageSize ?? minPageSize,
		total: total ?? 0,
		pageSizeOptions: pageSizeOptions ?? defaultSizeOptions,
		showSizeChanger: showSizeChanger ?? (total ? total > minPageSize : false),
		onChange,
	} satisfies AntdTablePaginationConfig;

	if (total)
		config.pageSizeOptions = config.pageSizeOptions.filter(
			(size) => size <= total,
		);
	return config;
}
