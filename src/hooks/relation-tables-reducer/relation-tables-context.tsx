"use client";
import { createContext, useContext } from "react";

import StringKeyof from "@interfaces/string-keyof.type";
import { RelationTablesAction, RelationTablesState } from "./types";

export const RelationTablesContext = createContext(
	{} as RelationTablesState<object>,
);
export const RelationTablesDispatchContext = createContext(
	null as unknown as React.Dispatch<RelationTablesAction<unknown>>,
);

export const createRelationTablesContext = <T,>() =>
	RelationTablesContext as React.Context<RelationTablesState<T>>;
export const createRelationTablesDispatchContext = <T,>() =>
	RelationTablesDispatchContext as React.Context<
		React.Dispatch<RelationTablesAction<T>>
	>;

export function useRelationTables<T>() {
	return useContext(RelationTablesContext) as
		| Record<string, never>
		| RelationTablesState<T>;
}

export function useRelationTable<T>(key: StringKeyof<T>) {
	// FIXME Could be null
	const state = useContext(RelationTablesContext) as RelationTablesState<T>;
	return state.config[key];
}

export function useRelationTablesDispatch<T>() {
	// FIXME Could be null
	return useContext(RelationTablesDispatchContext) as React.Dispatch<
		RelationTablesAction<T>
	>;
}
