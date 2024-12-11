import { TablePaginationConfig } from "antd/lib";

export interface SkillsSelectTableProps<T> {
	data: T[];
	pagination: TablePaginationConfig;
	dataKey: string;
	selectedDataKeys: string[] | number[];
}
