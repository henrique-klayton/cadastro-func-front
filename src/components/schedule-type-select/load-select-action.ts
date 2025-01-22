"use server";
import { DefaultOptionType } from "antd/es/select";

import scheduleTypeFormat from "@functions/schedule/schedule-type-format-server";
import runQuery from "@graphql/run-query";
import { ScheduleType } from "@graphql/types/graphql";
import scheduleTypeValuesQuery from "@queries/schedule-type";

export default async function loadScheduleTypeSelect(): Promise<
	DefaultOptionType[]
> {
	const queryResult = await runQuery(scheduleTypeValuesQuery);
	const values = queryResult?.__type?.enumValues;
	if (values)
		return values.map((type) => ({
			label: scheduleTypeFormat(type.name as ScheduleType),
			value: type.name as ScheduleType,
		}));
	return [];
}
