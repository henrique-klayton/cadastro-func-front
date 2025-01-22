"use client";
import { ScheduleFragmentType } from "@fragments/schedule";
import scheduleTypeFormat from "../schedule/schedule-type-format";

export default function employeeScheduleTableFormat(
	schedule?: Pick<ScheduleFragmentType, "type">,
) {
	if (schedule) return scheduleTypeFormat(schedule.type);
	return undefined;
}
