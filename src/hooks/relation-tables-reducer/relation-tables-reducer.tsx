import buildPaginationConfig from "@components/table-page/build-pagination-config";
import RelationTypeIds from "@components/table-page/interfaces/relation-type-ids.type";
import TablePaginationConfig from "@components/table-page/interfaces/table-pagination-config";
import { Action, Config, RelatedItem, Relation, State } from "./types/aliases";
import {
	InitialLoadAction,
	PageLoadAction,
	RenderAction,
} from "./types/relation-tables-action";
import ActionTypeEnum from "./types/relation-tables-action-type";

export default function relationTablesReducer<T>(
	state: State<T>,
	action: Action<T>,
): State<T> {
	const config = state.config;
	switch (action.type) {
		case ActionTypeEnum.RENDER_ALL:
			return handleRender(state, config, action);
		case ActionTypeEnum.SET_LOADING:
			setLoading(config[action.dataKey], action.loading);
			break;
		case ActionTypeEnum.SET_PAGINATION:
			setPagination(config[action.dataKey], action.pagination);
			break;
		case ActionTypeEnum.SET_SELECTED_KEYS:
			setSelectedDataKeys(config[action.dataKey], action.selectedDataKeys);
			break;
		case ActionTypeEnum.INITIAL_LOAD:
			handleInitialLoad(config[action.dataKey], action);
			break;
		case ActionTypeEnum.PAGINATION_LOAD:
			handlePageLoad(config[action.dataKey], action);
			break;
		case ActionTypeEnum.RESET_ALL:
			handleReset(config);
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

function handleRender<T>(
	state: State<T>,
	config: Config<T>,
	action: RenderAction,
) {
	if (state.loaded) return state;

	console.log("Rendering relation tables");
	for (const key in config) {
		config[key].loading = true;
	}

	return {
		tables: action.elements,
		loaded: true,
		config: config,
	};
}

function handleInitialLoad<T>(
	relation: Relation<T>,
	action: InitialLoadAction<T>,
) {
	console.log(`Initial data load for ${action.dataKey} table`);
	relation.data = action.data;
	relation.selectedDataKeys = action.selectedDataKeys;
	relation.loading = false;
	relation.pagination = buildPaginationConfig({
		...relation.pagination,
		total: action.total,
		onChange: (page: number, pageSize: number) => {
			action.dispatcher({
				type: ActionTypeEnum.SET_LOADING,
				dataKey: relation.dataKey,
				loading: true,
			});
			relation
				.queryRelatedAction({ status: true }, page, pageSize)
				.then(({ data, total }) => {
					action.dispatcher({
						type: ActionTypeEnum.PAGINATION_LOAD,
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
	relation.pagination = buildPaginationConfig({
		...relation.pagination,
		total: action.total,
	});
}

function handleReset<T>(config: Config<T>) {
	for (const key in config) {
		console.log(`Resetting ${key} table`);
		config[key].data = [] as RelatedItem<T>;
		config[key].selectedDataKeys = [];
		config[key].pagination = buildPaginationConfig({});
		config[key].loading = true;
	}
}
