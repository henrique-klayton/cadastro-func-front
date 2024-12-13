"use client";
import { Col, Row } from "antd";
import FormItem from "antd/es/form/FormItem";

import { IdArray } from "@interfaces/id-array.type";
import {
	ActionType,
	InitAction,
	InitialLoadAction,
	ItemRelationsAction,
} from "./interfaces/Item-relations-action";
import TablePaginationConfig from "./interfaces/table-pagination-config";
import makePaginationConfig from "./make-pagination-config";
import { ItemRelationObject, RelationTableProps } from "./types";

type RelatedItem<T> = T[keyof T];
type Relation<Item> = RelationTableProps<Item, keyof Item>;
type State<Item> = ItemRelationObject<Item>;
type Action<Item> = ItemRelationsAction<Item>;

let loadStatus = false;

export default function itemRelationsReducer<T>(
	state: State<T>,
	action: Action<T>,
) {
	switch (action.type) {
		case ActionType.INIT:
			return handleInit(action);
		case ActionType.SET_LOADING:
			setLoading(state[action.dataKey], action.loading);
			break;
		case ActionType.SET_PAGINATION:
			setPagination(state[action.dataKey], action.pagination);
			break;
		case ActionType.INITIAL_LOAD:
			handleInitialLoad(state, action.selectedDataKeys);
			break;
		case ActionType.PAGINATION_LOAD:
			handlePageLoad(state[action.dataKey]);
			break;
		case ActionType.RESET:
			handleReset(state);
			break;
		default:
			return action satisfies never;
	}
	return { ...state };
}

function setLoading<T>(relation: Relation<T>, loading: boolean) {
	relation.loading = loading;
}

function setPagination<T>(
	relation: Relation<T>,
	pagination: TablePaginationConfig,
) {
	relation.pagination = pagination;
}

function handleInit<T>(action: InitAction<T>) {
	const initializedState = action.relationsKeys.reduce(
		(state, { key: dataKey, component, queryRelatedAction }) => {
			console.log(`Generating props for ${String(dataKey)} table`);
			const loadTableData = (page: number, pageSize: number) => {
				queryRelatedAction(page, pageSize).then(({ data, total }) => {
					action.dispatcher({
						type: ActionType.PAGINATION_LOAD,
						dataKey,
						data,
						total,
					});
				});
			};

			const relation: Relation<T> = {
				data: [] as RelatedItem<T>,
				dataKey: dataKey,
				selectedDataKeys: [] as IdArray,
				loading: true,
				element: <></>,
				pagination: makePaginationConfig({ onChange: loadTableData }),
				queryRelatedAction,
			};
			relation.element = (
				<Row>
					<Col span={24}>
						<FormItem name={dataKey as string} key={dataKey as string}>
							{component({
								data: relation.data,
								dataKey: relation.dataKey,
								selectedDataKeys: relation.selectedDataKeys,
								loading: relation.loading,
								pagination: relation.pagination,
							})}
						</FormItem>
					</Col>
				</Row>
			);
			state[dataKey] = relation;
			return state;
		},
		{} as State<T>,
	);

	loadStatus = true;
	return initializedState;
}

function handleInitialLoad<T>(
	state: State<T>,
	selectedDataKeys: InitialLoadAction<T>["selectedDataKeys"],
) {
	for (const key in selectedDataKeys) {
		state[key].selectedDataKeys = selectedDataKeys[key];
		state[key].loading = false;
	}
}

function handlePageLoad<T>(relation: Relation<T>) {
	const pagination = relation.pagination;
	relation
		.queryRelatedAction(pagination.page, pagination.pageSize)
		.then(({ data, total }) => {
			relation.data = data;
			relation.pagination = makePaginationConfig({
				...relation.pagination,
				total,
			});
		});
}

function handleReset<T>(state: State<T>) {
	for (const dataKey in state) {
		const key = dataKey as keyof T;
		state[key].data = [] as RelatedItem<T>;
		state[key].selectedDataKeys = [];
	}
}
