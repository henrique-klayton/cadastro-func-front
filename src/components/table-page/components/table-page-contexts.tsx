import { useReducer } from "react";

import TableFilterConfigsObject from "@components/table-filter/types/table-filter-configs-object";
import relationTablesReducer from "@hooks/relation-tables-reducer";
import {
	createRelationTablesContext,
	createRelationTablesDispatchContext,
} from "@hooks/relation-tables-reducer/relation-tables-context";
import relationTablesInitializer from "@hooks/relation-tables-reducer/relation-tables-initializer";
import TableDataInitializerConfig from "@hooks/table-data-reducer/interfaces/table-data-initializer-config";
import {
	createTableDataContext,
	createTableDataDispatchContext,
} from "@hooks/table-data-reducer/table-data-context";
import tableDataInitializer from "@hooks/table-data-reducer/table-data-initializer";
import tableDataReducer from "@hooks/table-data-reducer/table-data-reducer";
import HaveId from "@interfaces/have-id";
import HaveStatus from "@interfaces/have-status";
import PartialNullable from "@typings/partial-nullable";
import { RelationDataObject } from "../types";

export interface TablePageContextsProps<
	T extends HaveId & HaveStatus,
	C extends U,
	U extends PartialNullable<HaveId & HaveStatus>,
	F,
> {
	children: React.ReactNode;
	relationsData: Array<RelationDataObject<U>>;
	filterConfig: TableFilterConfigsObject<F>;
}

export default function TablePageContexts<
	T extends HaveId & HaveStatus,
	C extends U,
	U extends PartialNullable<HaveId & HaveStatus>,
	F,
>({
	children,
	relationsData,
	filterConfig,
}: TablePageContextsProps<T, C, U, F>) {
	const [relationTablesState, relationsDispatch] = useReducer(
		relationTablesReducer<U>,
		relationsData ?? [],
		relationTablesInitializer<U>,
	);

	const tableDataConfig: TableDataInitializerConfig<T, F> = {
		filterConfig,
	};
	const [table, tableDispatch] = useReducer(
		tableDataReducer<T, F>,
		tableDataConfig,
		tableDataInitializer<T, F>,
	);

	const RelationTablesContext = createRelationTablesContext<U>();
	const RelationTablesDispatchContext =
		createRelationTablesDispatchContext<U>();

	const TableDataContext = createTableDataContext<T, F>();
	const TableDataDispatchContext = createTableDataDispatchContext<T, F>();

	return (
		<RelationTablesContext.Provider value={relationTablesState}>
			<RelationTablesDispatchContext.Provider value={relationsDispatch}>
				<TableDataContext.Provider value={table}>
					<TableDataDispatchContext.Provider value={tableDispatch}>
						{children}
					</TableDataDispatchContext.Provider>
				</TableDataContext.Provider>
			</RelationTablesDispatchContext.Provider>
		</RelationTablesContext.Provider>
	);
}
