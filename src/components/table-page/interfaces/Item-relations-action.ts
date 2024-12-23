"use client";
import { Dispatch } from "react";

import { IdArray } from "@interfaces/id-array.type";
import StringKeyof from "@interfaces/string-keyof.type";
import { RelationTableProps } from "../types";
import TablePaginationConfig from "./table-pagination-config";

type Relation<Item> = RelationTableProps<Item, StringKeyof<Item>>;

export type ItemRelationsAction<Item> =
	| SetLoadingAction<Item>
	| SetPaginationAction<Item>
	| InitialLoadAction<Item>
	| PageLoadAction<Item>
	| RenderAction<Item>
	| ResetAllAction
	| SetLoadedAllAction;

export enum ActionType {
	RENDER_TABLE = 0,
	SET_LOADING = 1,
	SET_PAGINATION = 2,
	INITIAL_LOAD = 3,
	PAGINATION_LOAD = 4,
	RESET_ALL = 5,
	SET_LOADED_ALL = 6,
}

export interface BaseAction<Item> {
	type: ActionType;
	dataKey: StringKeyof<Item>;
}

export interface SetLoadingAction<Item> extends BaseAction<Item> {
	type: ActionType.SET_LOADING;
	loading: boolean;
}

export interface SetPaginationAction<Item> extends BaseAction<Item> {
	type: ActionType.SET_PAGINATION;
	pagination: TablePaginationConfig;
}

export interface InitialLoadAction<Item> extends BaseAction<Item> {
	type: ActionType.INITIAL_LOAD;
	data: Relation<Item>["data"];
	total: number;
	selectedDataKeys: IdArray;
	dispatcher: Dispatch<ItemRelationsAction<Item>>;
}

export interface RenderAction<Item> extends BaseAction<Item> {
	type: ActionType.RENDER_TABLE;
	element: React.ReactNode;
}

export interface PageLoadAction<Item> extends BaseAction<Item> {
	type: ActionType.PAGINATION_LOAD;
	data: Relation<Item>["data"];
	total: number;
}

export interface ResetAllAction {
	type: ActionType.RESET_ALL;
}

export interface SetLoadedAllAction {
	type: ActionType.SET_LOADED_ALL;
}
