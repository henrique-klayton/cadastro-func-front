import { TableColumn } from "@components/data-table/types";
import { RelationTableComponentProps } from "@hooks/relation-tables-reducer/types";
import Flatten from "@interfaces/flatten.type";
import PaginationQueryFuncType from "@interfaces/pagination-query-type";
import StringKeyof from "@interfaces/string-keyof.type";
import { RelationDataObject } from "./types";

export default function createRelationDataObject<
	Item,
	Key extends StringKeyof<Item> = StringKeyof<Item>,
	RelationType = Flatten<Required<Item>[Key]>,
	RelationData = Array<RelationType>,
>(
	key: Key,
	columns: Array<TableColumn<RelationType>>,
	queryRelatedAction: PaginationQueryFuncType<RelationType>,
	component: React.FunctionComponent<RelationTableComponentProps<Item>>,
): RelationDataObject<Item, Key, RelationType, RelationData> {
	return { key, columns, queryRelatedAction, component };
}
