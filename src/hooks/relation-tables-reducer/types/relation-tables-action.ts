"use client";
import RelationTypeIds from "@components/table-page/interfaces/relation-type-ids.type";
import TablePaginationConfig from "@components/table-page/interfaces/table-pagination-config";
import StringKeyof from "@interfaces/string-keyof.type";
import ActionType from "./relation-tables-action-type";
import { Relation } from "./type-aliases";

type RelationTablesAction<Item> =
	| SetLoadingAction<Item>
	| SetPaginationAction<Item>
	| InitialLoadAction<Item>
	| PageLoadAction<Item>
	| RenderAction<Item>
	| SetSelectedDataKeys<Item>
	| ResetAllAction;
export default RelationTablesAction;

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
	selectedDataKeys: RelationTypeIds<Item>;
}

export interface InitialLoadAction<Item> extends BaseAction<Item> {
	type: ActionType.INITIAL_LOAD;
	data: Relation<Item>["data"];
	total: number;
	selectedDataKeys: RelationTypeIds<Item>;
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
