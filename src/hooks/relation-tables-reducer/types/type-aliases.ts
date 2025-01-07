import Flatten from "@interfaces/flatten.type";
import StringKeyof from "@interfaces/string-keyof.type";
import {
	RelationTableConfig,
	RelationTablesConfigsObject,
} from "./relation-table-config";
import RelationTablesAction from "./relation-tables-action";

export type RelatedItem<T> = Array<Flatten<T[StringKeyof<T>]>>;
export type Relation<Item> = RelationTableConfig<Item, StringKeyof<Item>>;
export type State<Item> = RelationTablesConfigsObject<Item>;
export type Action<Item> = RelationTablesAction<Item>;
