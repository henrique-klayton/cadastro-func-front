"use client";
import { TablePaginationConfig as AntdTablePaginationConfig } from "antd/lib";

export default interface TablePaginationConfig {
	current?: number;
	page?: number;
	pageSize?: number;
	total?: number;
	pageSizeOptions?: number[];
	showSizeChanger?: boolean;
	onChange?: AntdTablePaginationConfig["onChange"];
}
