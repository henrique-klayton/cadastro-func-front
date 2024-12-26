"use client";
import { ItemRelationsAction } from "@components/table-page/interfaces/Item-relations-action";
import { RelationTablePropsObject } from "@components/table-page/types";
import StringKeyof from "@interfaces/string-keyof.type";
import { createContext, useContext } from "react";

export const RelationsContext = createContext(
	{} as RelationTablePropsObject<object>,
);
export const RelationsDispatchContext = createContext(
	null as unknown as React.Dispatch<ItemRelationsAction<unknown>>,
);

export const createRelationsContext = <T,>() =>
	RelationsContext as React.Context<RelationTablePropsObject<T>>;
export const createRelationsDispatchContext = <T,>() =>
	RelationsDispatchContext as React.Context<
		React.Dispatch<ItemRelationsAction<T>>
	>;

export function useRelations() {
	return useContext(RelationsContext);
}

export function useRelation<T>(key: StringKeyof<T>) {
	const relations = useContext(RelationsContext) as RelationTablePropsObject<T>;
	return relations[key];
}

export function useRelationsDispatch() {
	return useContext(RelationsDispatchContext);
}
