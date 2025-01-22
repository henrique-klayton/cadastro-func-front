import StringKeyof from "@typings/string-keyof";
import RelationTableConfig from "../interfaces/relation-table-config";

type RelationTablesConfigsObject<
	Item,
	Key extends StringKeyof<Item> = StringKeyof<Item>,
> = {
	[Property in keyof Item]: RelationTableConfig<Item, Key>;
};
export default RelationTablesConfigsObject;
