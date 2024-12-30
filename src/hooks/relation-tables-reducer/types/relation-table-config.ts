import { TableColumn } from "@components/data-table/types";
import TablePaginationConfig from "@components/table-page/interfaces/table-pagination-config";
import Flatten from "@interfaces/flatten.type";
import IdArray from "@interfaces/id-array.type";
import PaginationQueryFuncType from "@interfaces/pagination-query-type";
import StringKeyof from "@interfaces/string-keyof.type";

export type RelationTableComponentProps<Item> = {
	dataKey: StringKeyof<Item>;
};

export interface RelationTableConfig<
	Item,
	Key extends StringKeyof<Item> = StringKeyof<Item>,
	RelationType = Flatten<Item[Key]>,
	RelationData = Array<RelationType>,
> {
	data: RelationData;
	dataKey: Key;
	selectedDataKeys: IdArray;
	loading: boolean;
	columns: Array<TableColumn<RelationType>>;
	pagination: TablePaginationConfig;
	element: React.ReactNode;
	queryRelatedAction: PaginationQueryFuncType<RelationType>;
}

export type RelationTablesConfigsObject<
	Item,
	Key extends StringKeyof<Item> = StringKeyof<Item>,
> = {
	[Property in keyof Item]: RelationTableConfig<Item, Key>;
};
