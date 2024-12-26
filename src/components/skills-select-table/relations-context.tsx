"use client";
import { ItemRelationsAction } from "@components/table-page/interfaces/Item-relations-action";
import {
	ItemRelationObject,
	RelationKeyObject,
} from "@components/table-page/types";
import StringKeyof from "@interfaces/string-keyof.type";
import { createContext, useContext } from "react";

export interface RelationsTablesProviderProps<T> {
	children: React.ReactNode;
	relationsKeys?: Array<RelationKeyObject<T>>;
}

export const RelationsContext = createContext({} as ItemRelationObject<object>);
export const RelationsDispatchContext = createContext(
	null as unknown as React.Dispatch<ItemRelationsAction<unknown>>,
);

export const createRelationsContext = <T,>() =>
	RelationsContext as React.Context<ItemRelationObject<T>>;
export const createRelationsDispatchContext = <T,>() =>
	RelationsDispatchContext as React.Context<
		React.Dispatch<ItemRelationsAction<T>>
	>;

export function useRelations() {
	return useContext(RelationsContext);
}

export function useRelation<T>(key: StringKeyof<T>) {
	const relations = useContext(RelationsContext) as ItemRelationObject<T>;
	return relations[key];
}

export function useRelationsDispatch() {
	return useContext(RelationsDispatchContext);
}
