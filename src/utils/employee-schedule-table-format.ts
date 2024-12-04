"use client";
import { ScheduleType } from "@fragments/schedule";
import scheduleTypeFormat from "./schedule-type-format";

export default function employeeScheduleTableFormat(
	schedule?: Pick<ScheduleType, "type">,
) {
	if (schedule) return scheduleTypeFormat(schedule.type);
	return undefined;
}
