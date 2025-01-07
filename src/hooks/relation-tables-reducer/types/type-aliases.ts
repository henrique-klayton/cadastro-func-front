import Flatten from "@interfaces/flatten.type";
import StringKeyof from "@interfaces/string-keyof.type";
import {
	RelationTableConfig,
	RelationTablesConfigsObject,
} from "./relation-table-config";
import RelationTablesAction from "./relation-tables-action";
import RelationTablesState from "./relation-tables-state";

export type RelatedItem<T> = Array<Flatten<T[StringKeyof<T>]>>;
export type Relation<Item> = RelationTableConfig<Item, StringKeyof<Item>>;
export type Config<Item> = RelationTablesConfigsObject<Item>;
export type State<Item> = RelationTablesState<Item>;
export type Action<Item> = RelationTablesAction<Item>;
