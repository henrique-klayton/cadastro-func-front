"use client";
import MIN_PAGE_SIZE from "@consts/min-page-size.const";
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
	const defaultSizeOptions = [MIN_PAGE_SIZE, 20, 50, 100];
	const config = {
		current: page ?? current ?? 1,
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
	return config;
}
