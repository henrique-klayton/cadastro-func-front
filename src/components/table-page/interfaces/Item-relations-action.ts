"use client";

import { IdArray } from "@interfaces/id-array.type";
import { Dispatch } from "react";
import { RelationKeyObject, RelationTableProps } from "../types";
import TablePaginationConfig from "./table-pagination-config";

type Relation<Item> = RelationTableProps<Item, keyof Item>;

export type ItemRelationsAction<Item> =
	| InitAction<Item>
	| SetLoadingAction<Item>
	| SetPaginationAction<Item>
	| InitialLoadAction<Item>
	| PageLoadAction<Item>
	| UpdateAction<Item>;

export interface BaseAction<Item> {
	type: string;
	dataKey: keyof Item;
}

export interface InitAction<Item> {
	type: "initRelation";
	relationsKeys: Array<RelationKeyObject<Item>>;
	dispatcher: Dispatch<ItemRelationsAction<Item>>;
}

export interface SetLoadingAction<Item> extends BaseAction<Item> {
	type: "setLoading";
	loading: boolean;
}

export interface SetPaginationAction<Item> extends BaseAction<Item> {
	type: "setPagination";
	pagination: TablePaginationConfig;
}

export interface InitialLoadAction<Item> extends BaseAction<Item> {
	type: "initialLoad";
	selectedDataKeys: IdArray;
}

export interface PageLoadAction<Item> extends BaseAction<Item> {
	type: "pageLoad";
	data: Relation<Item>["data"];
	total: number;
}

export interface UpdateAction<Item> extends BaseAction<Item> {
	type: "updateTable";
}
