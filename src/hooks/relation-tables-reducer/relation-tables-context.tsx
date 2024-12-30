"use client";
import { createContext, useContext } from "react";

import StringKeyof from "@interfaces/string-keyof.type";
import { RelationTablesAction, RelationTablesConfigsObject } from "./types";

export const RelationTablesContext = createContext(
	{} as RelationTablesConfigsObject<object>,
);
export const RelationTablesDispatchContext = createContext(
	null as unknown as React.Dispatch<RelationTablesAction<unknown>>,
);

export const createRelationTablesContext = <T,>() =>
	RelationTablesContext as React.Context<RelationTablesConfigsObject<T>>;
export const createRelationTablesDispatchContext = <T,>() =>
	RelationTablesDispatchContext as React.Context<
		React.Dispatch<RelationTablesAction<T>>
	>;

export function useRelationTables() {
	return useContext(RelationTablesContext);
}

export function useRelationTable<T>(key: StringKeyof<T>) {
	const relations = useContext(
		RelationTablesContext,
	) as RelationTablesConfigsObject<T>;
	return relations[key];
}

export function useRelationTablesDispatch<T>() {
	return useContext(RelationTablesDispatchContext) as React.Dispatch<
		RelationTablesAction<T>
	>;
}
