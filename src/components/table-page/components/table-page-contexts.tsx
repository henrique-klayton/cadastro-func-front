import { useReducer } from "react";

import TableFilterConfigsObject from "@components/table-filter/types/table-filter-configs-object";
import {
	createFormModalContext,
	createFormModalDispatchContext,
} from "@hooks/form-modal-reducer/form-modal-context";
import formModalReducer from "@hooks/form-modal-reducer/form-modal-reducer";
import FormModalState from "@hooks/form-modal-reducer/types/form-modal-state";
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
import { FormInstance, useForm } from "antd/es/form/Form";
import RelationDataObject from "../interfaces/relation-data-object";

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
	const [form] = useForm() as [FormInstance<U>];
	const formReset = { status: false } as Partial<U>;

	const tableDataConfig: TableDataInitializerConfig<T, F> = {
		filterConfig,
	};

	const formModalState: FormModalState<T, C, U> = {
		action: undefined,
		form,
		formReset,
		initialData: undefined,
		itemId: undefined,
		loading: true,
		open: false,
	};

	const [relationTablesState, relationsDispatch] = useReducer(
		relationTablesReducer<U>,
		relationsData ?? [],
		relationTablesInitializer<U>,
	);

	const [table, tableDispatch] = useReducer(
		tableDataReducer<T, F>,
		tableDataConfig,
		tableDataInitializer<T, F>,
	);

	const [formModal, formModalDispatch] = useReducer(
		formModalReducer<T, C, U>,
		formModalState,
	);

	const RelationTablesContext = createRelationTablesContext<U>();
	const RelationTablesDispatchContext =
		createRelationTablesDispatchContext<U>();

	const TableDataContext = createTableDataContext<T, F>();
	const TableDataDispatchContext = createTableDataDispatchContext<T, F>();

	const FormModalContext = createFormModalContext<T, C, U>();
	const FormModalDispatchContext = createFormModalDispatchContext<T, C, U>();

	return (
		<RelationTablesContext.Provider value={relationTablesState}>
			<RelationTablesDispatchContext.Provider value={relationsDispatch}>
				<TableDataContext.Provider value={table}>
					<TableDataDispatchContext.Provider value={tableDispatch}>
						<FormModalContext.Provider value={formModal}>
							<FormModalDispatchContext.Provider value={formModalDispatch}>
								{children}
							</FormModalDispatchContext.Provider>
						</FormModalContext.Provider>
					</TableDataDispatchContext.Provider>
				</TableDataContext.Provider>
			</RelationTablesDispatchContext.Provider>
		</RelationTablesContext.Provider>
	);
}
