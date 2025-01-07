"use client";
import RelationTypeIds from "@components/table-page/interfaces/relation-type-ids.type";
import TablePaginationConfig from "@components/table-page/interfaces/table-pagination-config";
import makePaginationConfig from "@components/table-page/make-pagination-config";
import {
	Action,
	ActionType,
	InitialLoadAction,
	PageLoadAction,
	RelatedItem,
	Relation,
	RenderAction,
	State,
} from "./types";

export default function relationTablesReducer<T>(
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
	selectedDataKeys: RelationTypeIds<T>,
) {
	console.log(`Changing rows selection state for ${relation.dataKey} table`);
	relation.selectedDataKeys = selectedDataKeys;
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
