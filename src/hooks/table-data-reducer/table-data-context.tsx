import { createContext, useContext } from "react";

import HaveId from "@interfaces/have-id";
import HaveStatus from "@interfaces/have-status";
import TableDataState from "./interfaces/table-data-state";
import TableDataAction from "./types/table-data-action";

export const TableDataContext = createContext(
	{} as TableDataState<unknown, unknown>,
);
export const TableDataDispatchContext = createContext(
	null as unknown as React.Dispatch<
		TableDataAction<HaveId & HaveStatus, object>
	>,
);

export const createTableDataContext = <T extends HaveId & HaveStatus, F>() =>
	TableDataContext as React.Context<TableDataState<T, F>>;
export const createTableDataDispatchContext = <
	T extends HaveId & HaveStatus,
	F,
>() =>
	TableDataDispatchContext as React.Context<
		React.Dispatch<TableDataAction<T, F>>
	>;

export function useTableData<T extends HaveId & HaveStatus, F>() {
	return useContext(TableDataContext) as TableDataState<T, F>;
}

export function useTableDataDispatch<T extends HaveId & HaveStatus, F>() {
	// FIXME Could be null
	return useContext(TableDataDispatchContext) as React.Dispatch<
		TableDataAction<T, F>
	>;
}

export default function useTableDataReducer<
	T extends HaveId & HaveStatus,
	F,
>(): [
	ReturnType<typeof useTableData<T, F>>,
	ReturnType<typeof useTableDataDispatch<T, F>>,
] {
	return [useTableData<T, F>(), useTableDataDispatch<T, F>()];
}
