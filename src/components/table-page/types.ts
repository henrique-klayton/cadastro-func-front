import { TablePaginationConfig } from "antd/lib";

import { DataTableProps } from "@components/data-table/types";
import {
	FormData,
	FormModalCreateProps,
	FormModalUpdateProps,
	MergedFormModalProps,
} from "@components/form-modal/types";
import { HaveId } from "@interfaces/have-id";
import { Optional } from "@interfaces/optional.type";
import { StateSetter } from "@interfaces/state-setter.type";

// biome-ignore lint/suspicious/noExplicitAny: Impossible to know formatter return value beforehand
export type QueryDataParsers<T> = { [P in keyof T]: (value: T[P]) => any };
export type FormDataSerializer<T> = (data: FormData<T>) => T;

export type TablePageFormModalProps<CreateItem, UpdateItem> =
	| FormModalCreateProps<CreateItem>
	| FormModalUpdateProps<UpdateItem>;

export type FormModalStateProps<CreateItem, UpdateItem> = MergedFormModalProps<
	CreateItem,
	UpdateItem
>;
export type ItemRelationList<Item> = Array<
	RelationTableProps<Item, keyof Item>
>;
export interface TablePageProps<
	TableItem extends HaveId,
	CreateItem extends UpdateItem,
	UpdateItem,
> {
	children: React.ReactNode;
	table: DataTableProps<TableItem>;
	totalCount: number;
	actions: ServerActions<TableItem, CreateItem, UpdateItem>;
	title: string;
	itemName: string;
	queryDataParsers?: QueryDataParsers<UpdateItem>;
	relationsKeys?: Array<RelationKeyObject<UpdateItem, keyof UpdateItem>>;
}

type PaginationQueryType<T> = (
	page?: number,
	pageSize?: number,
) => Promise<{ data: T; total: number }>;

export interface ServerActions<T extends HaveId, C, U> {
	tableQueryAction: PaginationQueryType<T[]>;
	formQueryAction: (id: T["id"]) => Promise<U>;
	createAction: (data: C) => Promise<Optional<T>>;
	updateAction: (id: T["id"], data: U) => Promise<Optional<T>>;
	deleteAction: (id: T["id"]) => Promise<Optional<T>>;
}

export type RelationTableComponentProps<RelatedItem> = Omit<
	RelationTableProps<RelatedItem, keyof RelatedItem>,
	| "element"
	| "queryRelatedAction"
	| "setData"
	| "setSelectedDataKeys"
	| "setLoading"
	| "setPagination"
>;

export interface RelationKeyObject<Item, Key extends keyof Item = keyof Item> {
	key: Key;
	queryRelatedAction: PaginationQueryType<Item[Key]>;
	component: React.FunctionComponent<RelationTableComponentProps<Item>>;
}

export interface RelationTableProps<Item, Key extends keyof Item> {
	data: Item[keyof Item];
	setData: StateSetter<Item[keyof Item]>;
	dataKey: Key;
	selectedDataKeys: Item[Key];
	setSelectedDataKeys: StateSetter<Item[Key]>;
	loading: boolean;
	setLoading: StateSetter<boolean>;
	pagination: TablePaginationConfig;
	setPagination: StateSetter<TablePaginationConfig>;
	element: React.ReactElement;
	queryRelatedAction: PaginationQueryType<Item[Key]>;
}

export function createRelationKeyObject<T, K extends keyof T>(
	key: K,
	queryRelatedAction: PaginationQueryType<T[K]>,
	component: React.FunctionComponent<RelationTableComponentProps<T>>,
): RelationKeyObject<T, K> {
	return { key, queryRelatedAction, component };
}
