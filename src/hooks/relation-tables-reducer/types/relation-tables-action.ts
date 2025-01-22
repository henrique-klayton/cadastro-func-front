"use client";
import RelationTypeIds from "@components/table-page/interfaces/relation-type-ids.type";
import TablePaginationConfig from "@components/table-page/interfaces/table-pagination-config";
import StringKeyof from "@typings/string-keyof";
import { Relation } from "./aliases";
import ActionTypeEnum from "./relation-tables-action-type";

type RelationTablesAction<Item> =
	| RenderAction
	| SetLoadingAction<Item>
	| SetPaginationAction<Item>
	| InitialLoadAction<Item>
	| PageLoadAction<Item>
	| SetSelectedDataKeys<Item>
	| ResetAllAction;
export default RelationTablesAction;

export interface RenderAction {
	type: ActionTypeEnum.RENDER_ALL;
	elements: React.ReactNode[];
}

export interface ResetAllAction {
	type: ActionTypeEnum.RESET_ALL;
}

export interface BaseAction<Item> {
	type: ActionTypeEnum;
	dataKey: StringKeyof<Item>;
}

export interface SetLoadingAction<Item> extends BaseAction<Item> {
	type: ActionTypeEnum.SET_LOADING;
	loading: boolean;
}

export interface SetPaginationAction<Item> extends BaseAction<Item> {
	type: ActionTypeEnum.SET_PAGINATION;
	pagination: TablePaginationConfig;
}

export interface SetSelectedDataKeys<Item> extends BaseAction<Item> {
	type: ActionTypeEnum.SET_SELECTED_KEYS;
	selectedDataKeys: RelationTypeIds<Item>;
}

export interface InitialLoadAction<Item> extends BaseAction<Item> {
	type: ActionTypeEnum.INITIAL_LOAD;
	data: Relation<Item>["data"];
	total: number;
	selectedDataKeys: RelationTypeIds<Item>;
	dispatcher: React.Dispatch<RelationTablesAction<Item>>;
}

export interface PageLoadAction<Item> extends BaseAction<Item> {
	type: ActionTypeEnum.PAGINATION_LOAD;
	data: Relation<Item>["data"];
	total: number;
}
