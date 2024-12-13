"use client";

import { IdArray } from "@interfaces/id-array.type";
import StringKeyof from "@interfaces/string-keyof.type";
import { Dispatch } from "react";
import { RelationKeyObject, RelationTableProps } from "../types";
import TablePaginationConfig from "./table-pagination-config";

type Relation<Item> = RelationTableProps<Item, StringKeyof<Item>>;

export type ItemRelationsAction<Item> =
	| InitAction<Item>
	| SetLoadingAction<Item>
	| SetPaginationAction<Item>
	| InitialLoadAction<Item>
	| PageLoadAction<Item>
	| ResetAction<Item>;

export enum ActionType {
	INIT = 0,
	SET_LOADING = 1,
	SET_PAGINATION = 2,
	INITIAL_LOAD = 3,
	PAGINATION_LOAD = 4,
	RESET = 5,
}

export interface BaseAction<Item> {
	type: ActionType;
	dataKey: StringKeyof<Item>;
}

export interface InitAction<Item> {
	type: ActionType.INIT;
	relationsKeys: Array<RelationKeyObject<Item>>;
	dispatcher: Dispatch<ItemRelationsAction<Item>>;
}

export interface SetLoadingAction<Item> extends BaseAction<Item> {
	type: ActionType.SET_LOADING;
	loading: boolean;
}

export interface SetPaginationAction<Item> extends BaseAction<Item> {
	type: ActionType.SET_PAGINATION;
	pagination: TablePaginationConfig;
}

export interface InitialLoadAction<Item> {
	type: ActionType.INITIAL_LOAD;
	selectedDataKeys: { [P in keyof Item]: IdArray };
}

export interface PageLoadAction<Item> extends BaseAction<Item> {
	type: ActionType.PAGINATION_LOAD;
	data: Relation<Item>["data"];
	total: number;
}

export interface ResetAction<Item> extends BaseAction<Item> {
	type: ActionType.RESET;
}
