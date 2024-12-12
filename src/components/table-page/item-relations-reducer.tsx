"use client";
import { Col, Row } from "antd";
import FormItem from "antd/es/form/FormItem";

import { IdArray } from "@interfaces/id-array.type";
import {
	InitAction,
	ItemRelationsAction,
	UpdateAction,
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
		case "initRelation":
			return handleInit(action);
		case "setLoading":
			setLoading(state[action.dataKey], action.loading);
			break;
		case "setPagination":
			setPagination(state[action.dataKey], action.pagination);
			break;
		case "initialLoad":
			handleInitialLoad(state[action.dataKey], action.selectedDataKeys);
			break;
		case "pageLoad":
			handlePageLoad(state[action.dataKey]);
			break;
		case "updateTable":
			handleUpdate(state[action.dataKey], action);
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
						type: "pageLoad",
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
	relation: Relation<T>,
	selectedDataKeys: IdArray,
) {
	relation.selectedDataKeys = selectedDataKeys;
	relation.loading = false;
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

function handleUpdate<T>(relation: Relation<T>, action: UpdateAction<T>) {
	// state[action.dataKey] = action.relation;
}
