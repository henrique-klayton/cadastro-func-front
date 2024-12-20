"use client";
import { Dispatch } from "react";

import { IdArray } from "@interfaces/id-array.type";
import StringKeyof from "@interfaces/string-keyof.type";
import { RelationTableProps } from "../types";
import TablePaginationConfig from "./table-pagination-config";

type Relation<Item> = RelationTableProps<Item, StringKeyof<Item>>;

export type ItemRelationsAction<Item> =
	// | InitAction<Item>
	| SetLoadingAction<Item>
	| SetPaginationAction<Item>
	// | InitialLoadAction<Item>
	| PageLoadAction<Item>
	| RenderAction<Item>
	| ResetAction<Item>;

export enum ActionType {
	// INIT_ALL = 0,
	SET_LOADING = 1,
	SET_PAGINATION = 2,
	PAGINATION_LOAD = 3,
	RENDER_TABLE = 4,
	RESET_ALL = 5,
}

export interface BaseAction<Item> {
	type: ActionType;
	dataKey: StringKeyof<Item>;
}

// export interface InitAction<Item> {
// 	type: ActionType.INIT_ALL;
// 	relationsKeys: Array<RelationKeyObject<Item>>;
// 	dispatcher: Dispatch<ItemRelationsAction<Item>>;
// }

export interface SetLoadingAction<Item> extends BaseAction<Item> {
	type: ActionType.SET_LOADING;
	loading: boolean;
}

export interface SetPaginationAction<Item> extends BaseAction<Item> {
	type: ActionType.SET_PAGINATION;
	pagination: TablePaginationConfig;
}

// export interface InitialLoadAction<Item> {
// 	type: ActionType.LOAD_ALL;
// 	selectedDataKeys: { [P in keyof Item]: IdArray };
// }

export interface RenderAction<Item> extends BaseAction<Item> {
	type: ActionType.RENDER_TABLE;
	data: Relation<Item>["data"];
	total: number;
	selectedDataKeys: IdArray;
	dispatcher: Dispatch<ItemRelationsAction<Item>>;
}

export interface PageLoadAction<Item> extends BaseAction<Item> {
	type: ActionType.PAGINATION_LOAD;
	data: Relation<Item>["data"];
	total: number;
}

export interface ResetAction<Item> extends BaseAction<Item> {
	type: ActionType.RESET_ALL;
}
