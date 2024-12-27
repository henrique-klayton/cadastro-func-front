"use client";

// biome-ignore lint/style/useEnumInitializers: The enum members value doesn't matter
export enum ActionType {
	RENDER_TABLE,
	SET_LOADING,
	SET_PAGINATION,
	INITIAL_LOAD,
	PAGINATION_LOAD,
	SET_SELECTED_KEYS,
	RESET_ALL,
}
