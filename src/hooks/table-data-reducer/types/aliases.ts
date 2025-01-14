import HaveId from "@interfaces/have-id";
import HaveStatus from "@interfaces/have-status";
import TableDataState from "../interfaces/table-data-state";
import TableDataAction from "./table-data-action";

export type State<T, F> = TableDataState<T, F>;
export type Action<Item extends HaveId & HaveStatus, Filter> = TableDataAction<
	Item,
	Filter
>;
