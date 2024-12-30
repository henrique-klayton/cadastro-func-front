"use client";
import RelationTypeIds from "@components/table-page/interfaces/relation-type-ids.type";
import makePaginationConfig from "@components/table-page/make-pagination-config";
import { RelationDataObject } from "@components/table-page/types";
import { RelatedItem, Relation, State } from "./type-aliases";
import { RelationTablesConfigsObject } from "./types";

export default function relationTablesInitializer<T>(
	relationsData: Array<RelationDataObject<T>>,
): RelationTablesConfigsObject<T> {
	const initializedState = relationsData.reduce(
		(state, { key: dataKey, columns, queryRelatedAction }) => {
			console.log(`Generating props for ${dataKey} table`);
			const relation: Relation<T> = {
				data: [] as RelatedItem<T>,
				dataKey,
				selectedDataKeys: [] as RelationTypeIds<T>,
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
