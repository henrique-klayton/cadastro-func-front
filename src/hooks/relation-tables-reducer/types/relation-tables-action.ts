"use client";
import TablePaginationConfig from "@components/table-page/interfaces/table-pagination-config";
import IdArray from "@interfaces/id-array.type";
import StringKeyof from "@interfaces/string-keyof.type";
import { Relation } from "../type-aliases";
import ActionType from "./relation-tables-action-type";

export type RelationTablesAction<Item> =
	| SetLoadingAction<Item>
	| SetPaginationAction<Item>
	| InitialLoadAction<Item>
	| PageLoadAction<Item>
	| RenderAction<Item>
	| SetSelectedDataKeys<Item>
	| ResetAllAction;

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

export interface SetSelectedDataKeys<Item> extends BaseAction<Item> {
	type: ActionType.SET_SELECTED_KEYS;
	selectedDataKeys: IdArray;
}

export interface InitialLoadAction<Item> extends BaseAction<Item> {
	type: ActionType.INITIAL_LOAD;
	data: Relation<Item>["data"];
	total: number;
	selectedDataKeys: IdArray;
	dispatcher: React.Dispatch<RelationTablesAction<Item>>;
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
