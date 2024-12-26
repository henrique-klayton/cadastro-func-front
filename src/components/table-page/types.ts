import { DataTableProps, TableColumn } from "@components/data-table/types";
import {
	FormData,
	FormModalCreateProps,
	FormModalUpdateProps,
	MergedFormModalProps,
} from "@components/form-modal/types";
import Flatten from "@interfaces/flatten.type";
import { HaveId } from "@interfaces/have-id";
import { HaveStatus } from "@interfaces/have-status";
import { IdArray } from "@interfaces/id-array.type";
import { Optional } from "@interfaces/optional.type";
import { PartialNullable } from "@interfaces/partial-nullable.type";
import StringKeyof from "@interfaces/string-keyof.type";
import TablePaginationConfig from "./interfaces/table-pagination-config";

// biome-ignore lint/suspicious/noExplicitAny: Impossible to know formatter return value beforehand
export type QueryDataParsers<T> = { [P in keyof T]: (value: T[P]) => any };
export type FormDataSerializer<T> = (data: FormData<T>) => T;
export type RelationData<T, K extends StringKeyof<T> = StringKeyof<T>> = Array<
	Flatten<T[K]>
>;

export type TablePageFormModalProps<CreateItem, UpdateItem> =
	| FormModalCreateProps<CreateItem>
	| FormModalUpdateProps<UpdateItem>;

export type FormModalStateProps<CreateItem, UpdateItem> = MergedFormModalProps<
	CreateItem,
	UpdateItem
>;
export type RelationTablePropsObject<
	Item,
	Key extends StringKeyof<Item> = StringKeyof<Item>,
> = {
	[Property in keyof Item]: RelationTableProps<Item, Key>;
};
export interface TablePageProps<
	TableItem extends HaveId & HaveStatus,
	CreateItem extends UpdateItem,
	UpdateItem extends PartialNullable<HaveId & HaveStatus>,
> {
	children: React.ReactNode;
	table: DataTableProps<TableItem>;
	totalCount: number;
	actions: ServerActions<TableItem, CreateItem, UpdateItem>;
	title: string;
	itemName: string;
	queryDataParsers?: QueryDataParsers<UpdateItem>;
	relationsData?: Array<
		RelationDataObject<UpdateItem, StringKeyof<UpdateItem>>
	>;
}

// TODO Move to another file
type PaginationQueryType<RelationType> = (
	page?: number,
	pageSize?: number,
) => Promise<{ data: RelationType[]; total: number }>;

export interface ServerActions<
	TableItem extends HaveId,
	CreateItem,
	UpdateItem,
> {
	tableQueryAction: PaginationQueryType<TableItem>;
	formQueryAction: (id: TableItem["id"]) => Promise<UpdateItem>;
	createAction: (data: CreateItem) => Promise<Optional<TableItem>>;
	updateAction: (
		id: TableItem["id"],
		data: UpdateItem,
	) => Promise<Optional<TableItem>>;
	deleteAction: (id: TableItem["id"]) => Promise<Optional<TableItem>>;
}

// TODO Move RelationTable types to somewhere else
export type RelationTableComponentProps<Item> = {
	dataKey: StringKeyof<Item>;
};

export interface RelationDataObject<
	Item,
	Key extends StringKeyof<Item> = StringKeyof<Item>,
	RelationType = Flatten<Item[Key]>,
	RelationData = Array<RelationType>,
> {
	key: Key;
	columns: Array<TableColumn<RelationType>>;
	queryRelatedAction: PaginationQueryType<RelationType>;
	component: React.FunctionComponent<RelationTableComponentProps<Item>>;
}

export interface RelationTableProps<
	Item,
	Key extends StringKeyof<Item> = StringKeyof<Item>,
	RelationType = Flatten<Item[Key]>,
	RelationData = Array<RelationType>,
> {
	data: RelationData;
	dataKey: Key;
	selectedDataKeys: IdArray;
	loading: boolean;
	columns: Array<TableColumn<RelationType>>;
	pagination: TablePaginationConfig;
	element: React.ReactNode;
	queryRelatedAction: PaginationQueryType<RelationType>;
}

export function createRelationDataObject<
	Item,
	Key extends StringKeyof<Item> = StringKeyof<Item>,
	RelationType = Flatten<Required<Item>[Key]>,
	RelationData = Array<RelationType>,
>(
	key: Key,
	columns: Array<TableColumn<RelationType>>,
	queryRelatedAction: PaginationQueryType<RelationType>,
	component: React.FunctionComponent<RelationTableComponentProps<Item>>,
): RelationDataObject<Item, Key, RelationType, RelationData> {
	return { key, columns, queryRelatedAction, component };
}
