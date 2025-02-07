"use client";
import HaveId from "@interfaces/have-id";
import HaveStatus from "@interfaces/have-status";
import PartialNullable from "@typings/partial-nullable";
import TablePageContexts from "./components/table-page-contexts";
import TablePageProps from "./interfaces/table-page-props";
import TablePageComponent from "./table-page-component";

export default function TablePage<
	T extends HaveId & HaveStatus,
	C extends U,
	U extends PartialNullable<HaveId & HaveStatus>,
	F,
>(props: TablePageProps<T, C, U, F>) {
	return (
		<>
			<TablePageContexts
				relationsData={props.relationsData ?? []}
				filterConfig={props.filters}
			>
				<TablePageComponent {...props} />
			</TablePageContexts>
		</>
	);
}
