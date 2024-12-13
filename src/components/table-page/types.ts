import { DataTableProps } from "@components/data-table/types";
import {
	FormData,
	FormModalCreateProps,
	FormModalUpdateProps,
	MergedFormModalProps,
} from "@components/form-modal/types";
import { HaveId } from "@interfaces/have-id";
import { IdArray } from "@interfaces/id-array.type";
import { Optional } from "@interfaces/optional.type";
import StringKeyof from "@interfaces/string-keyof.type";
import TablePaginationConfig from "./interfaces/table-pagination-config";

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
export type ItemRelationObject<Item> = {
	[Property in keyof Item]: RelationTableProps<Item, Extract<Property, string>>;
};
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
	relationsKeys?: Array<RelationKeyObject<UpdateItem, StringKeyof<UpdateItem>>>;
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
	RelationTableProps<RelatedItem, StringKeyof<RelatedItem>>,
	| "element"
	| "queryRelatedAction"
	| "setData"
	| "setSelectedDataKeys"
	| "setLoading"
	| "setPagination"
>;

export interface RelationKeyObject<
	Item,
	Key extends StringKeyof<Item> = StringKeyof<Item>,
> {
	key: Key;
	queryRelatedAction: PaginationQueryType<Item[Key]>;
	component: React.FunctionComponent<RelationTableComponentProps<Item>>;
}

export interface RelationTableProps<Item, Key extends StringKeyof<Item>> {
	data: Item[Key];
	dataKey: Key;
	selectedDataKeys: IdArray;
	loading: boolean;
	pagination: TablePaginationConfig;
	element: React.ReactElement;
	queryRelatedAction: PaginationQueryType<Item[Key]>;
}

export function createRelationKeyObject<T, K extends StringKeyof<T>>(
	key: K,
	queryRelatedAction: PaginationQueryType<T[K]>,
	component: React.FunctionComponent<RelationTableComponentProps<T>>,
): RelationKeyObject<T, K> {
	return { key, queryRelatedAction, component };
}
