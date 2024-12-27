"use client";
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
	| ResetAllAction;

// TODO Move to another file
// biome-ignore lint/style/useEnumInitializers: The enum members value doesn't matter
export enum ActionType {
	RENDER_TABLE,
	SET_LOADING,
	SET_PAGINATION,
	INITIAL_LOAD,
	PAGINATION_LOAD,
	RESET_ALL,
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
	dispatcher: React.Dispatch<ItemRelationsAction<Item>>;
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
