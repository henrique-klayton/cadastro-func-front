"use client";
// import { Col, Row } from "antd";
// import FormItem from "antd/es/form/FormItem";

import Flatten from "@interfaces/flatten.type";
import { IdArray } from "@interfaces/id-array.type";
import StringKeyof from "@interfaces/string-keyof.type";
import {
	ActionType,
	InitialLoadAction,
	ItemRelationsAction,
	PageLoadAction,
	RenderAction,
} from "./interfaces/Item-relations-action";
import TablePaginationConfig from "./interfaces/table-pagination-config";
import makePaginationConfig from "./make-pagination-config";
import {
	RelationDataObject,
	RelationTableProps,
	RelationTablePropsObject,
} from "./types";

type RelatedItem<T> = Array<Flatten<T[StringKeyof<T>]>>;
type Relation<Item> = RelationTableProps<Item, StringKeyof<Item>>;
type State<Item> = RelationTablePropsObject<Item>;
type Action<Item> = ItemRelationsAction<Item>;

export default function itemRelationsReducer<T>(
	state: State<T>,
	action: Action<T>,
) {
	switch (action.type) {
		case ActionType.SET_LOADING:
			setLoading(state[action.dataKey], action.loading);
			break;
		case ActionType.SET_PAGINATION:
			setPagination(state[action.dataKey], action.pagination);
			break;
		case ActionType.SET_SELECTED_KEYS:
			setSelectedDataKeys(state[action.dataKey], action.selectedDataKeys);
			break;
		case ActionType.RENDER_TABLE:
			handleRender(state[action.dataKey], action);
			break;
		case ActionType.INITIAL_LOAD:
			handleInitialLoad(state[action.dataKey], action);
			break;
		case ActionType.PAGINATION_LOAD:
			handlePageLoad(state[action.dataKey], action);
			break;
		case ActionType.RESET_ALL:
			handleReset(state);
			break;
		default:
			return action satisfies never;
	}
	return { ...state };
}

function setLoading<T>(relation: Relation<T>, loading: boolean) {
	console.log(`Changing loading state for ${relation.dataKey} table`);
	relation.loading = loading;
}

function setPagination<T>(
	relation: Relation<T>,
	pagination: TablePaginationConfig,
) {
	console.log(`Changing pagination state for ${relation.dataKey} table`);
	relation.pagination = pagination;
}

function setSelectedDataKeys<T>(
	relation: Relation<T>,
	selectedDataKeys: IdArray,
) {
	console.log(`Changing rows selection state for ${relation.dataKey} table`);
	relation.selectedDataKeys = selectedDataKeys;
}

export function reducerInitializer<T>(
	relationsData: Array<RelationDataObject<T>>,
): RelationTablePropsObject<T> {
	const initializedState = relationsData.reduce(
		(state, { key: dataKey, columns, queryRelatedAction }) => {
			console.log(`Generating props for ${dataKey} table`);
			const relation: Relation<T> = {
				data: [] as RelatedItem<T>,
				dataKey,
				selectedDataKeys: [] as IdArray,
				loading: true,
				element: undefined,
				columns,
				pagination: makePaginationConfig({}),
				queryRelatedAction,
			};
			state[dataKey] = relation;
			return state;
		},
		{} as State<T>,
	);
	return initializedState;
}

function handleRender<T>(relation: Relation<T>, action: RenderAction<T>) {
	console.log(`Save rendered ${action.dataKey} table`);
	relation.element = action.element;
	relation.loading = true;
}

function handleInitialLoad<T>(
	relation: Relation<T>,
	action: InitialLoadAction<T>,
) {
	console.log(`Initial data load for ${action.dataKey} table`);
	relation.data = action.data;
	relation.selectedDataKeys = action.selectedDataKeys;
	relation.loading = false;
	relation.pagination = makePaginationConfig({
		...relation.pagination,
		total: action.total,
		onChange: (page: number, pageSize: number) => {
			action.dispatcher({
				type: ActionType.SET_LOADING,
				dataKey: relation.dataKey,
				loading: true,
			});
			relation.queryRelatedAction(page, pageSize).then(({ data, total }) => {
				action.dispatcher({
					type: ActionType.PAGINATION_LOAD,
					dataKey: relation.dataKey,
					data,
					total,
				});
			});
		},
	});
}

function handlePageLoad<T>(relation: Relation<T>, action: PageLoadAction<T>) {
	console.log(`Loading new page data for ${action.dataKey} table`);
	relation.data = action.data;
	relation.loading = false;
	relation.pagination = makePaginationConfig({
		...relation.pagination,
		total: action.total,
	});
}

function handleReset<T>(state: State<T>) {
	for (const key in state) {
		console.log(`Resetting ${key} table`);
		state[key].data = [] as RelatedItem<T>;
		state[key].selectedDataKeys = [];
		state[key].pagination = makePaginationConfig({});
		state[key].loading = true;
	}
}
