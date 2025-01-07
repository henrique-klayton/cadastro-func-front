"use client";
import RelationTypeIds from "@components/table-page/interfaces/relation-type-ids.type";
import makePaginationConfig from "@components/table-page/make-pagination-config";
import { RelationDataObject } from "@components/table-page/types";
import { Config, RelatedItem, Relation, RelationTablesState } from "./types";

export default function relationTablesInitializer<T>(
	relationsData: Array<RelationDataObject<T>>,
): RelationTablesState<T> {
	const initializedState = relationsData.reduce(
		(state, { key: dataKey, columns, queryRelatedAction }) => {
			console.log(`Generating props for ${dataKey} table`);
			const relation: Relation<T> = {
				data: [] as RelatedItem<T>,
				dataKey,
				selectedDataKeys: [] as RelationTypeIds<T>,
				loading: true,
				columns,
				pagination: makePaginationConfig({}),
				queryRelatedAction,
			};
			state[dataKey] = relation;
			return state;
		},
		{} as Config<T>,
	);
	return {
		tables: [],
		loaded: false,
		config: initializedState,
	};
}
