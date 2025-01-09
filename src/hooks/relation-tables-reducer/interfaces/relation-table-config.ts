import TableColumn from "@components/data-table/types/table-column";
import RelationTypeIds from "@components/table-page/interfaces/relation-type-ids.type";
import TablePaginationConfig from "@components/table-page/interfaces/table-pagination-config";
import Flatten from "@interfaces/flatten.type";
import PaginationQueryFuncType from "@interfaces/pagination-query-type";
import StringKeyof from "@interfaces/string-keyof.type";

export default interface RelationTableConfig<
	Item,
	Key extends StringKeyof<Item> = StringKeyof<Item>,
	RelationType = Flatten<Item[Key]>,
	RelationData = Array<RelationType>,
> {
	data: RelationData;
	dataKey: Key;
	selectedDataKeys: RelationTypeIds<Item, Key>;
	loading: boolean;
	columns: Array<TableColumn<RelationType>>;
	pagination: TablePaginationConfig;
	queryRelatedAction: PaginationQueryFuncType<RelationType>;
}
