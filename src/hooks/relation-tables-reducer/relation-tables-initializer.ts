import buildPaginationConfig from "@components/table-page/build-pagination-config";
import RelationDataObject from "@components/table-page/interfaces/relation-data-object";
import RelationTypeIds from "@components/table-page/interfaces/relation-type-ids.type";
import RelationTablesState from "./interfaces/relation-tables-state";
import { Config, RelatedItem, Relation } from "./types/aliases";

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
				pagination: buildPaginationConfig({}),
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
