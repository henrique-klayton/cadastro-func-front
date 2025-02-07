import TableColumn from "@components/data-table/types/table-column";
import RelationTableComponentProps from "@hooks/relation-tables-reducer/types/relation-table-component-props";
import PaginationQueryFunction from "@interfaces/pagination-query-function";
import Flatten from "@typings/flatten";
import StringKeyof from "@typings/string-keyof";

export default interface RelationDataObject<
	Item,
	Key extends StringKeyof<Item> = StringKeyof<Item>,
	RelationType = Flatten<Item[Key]>,
	RelationData = Array<RelationType>,
> {
	key: Key;
	columns: Array<TableColumn<RelationType>>;
	queryRelatedAction: PaginationQueryFunction<RelationType, { status: true }>;
	component: React.FunctionComponent<RelationTableComponentProps<Item>>;
}
