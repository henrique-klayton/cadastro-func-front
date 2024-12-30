import Flatten from "@interfaces/flatten.type";
import StringKeyof from "@interfaces/string-keyof.type";
import {
	RelationTableConfig,
	RelationTablesAction,
	RelationTablesConfigsObject,
} from "./types";

export type RelatedItem<T> = Array<Flatten<T[StringKeyof<T>]>>;
export type Relation<Item> = RelationTableConfig<Item, StringKeyof<Item>>;
export type State<Item> = RelationTablesConfigsObject<Item>;
export type Action<Item> = RelationTablesAction<Item>;
