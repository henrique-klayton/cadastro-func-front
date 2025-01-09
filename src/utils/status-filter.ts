"use client";
import StatusEnum from "@enums/status.enum";
import HaveStatus from "@interfaces/have-status";

export default function statusFilter(
	value: boolean | null | undefined,
	_data: HaveStatus,
	option: StatusEnum,
): boolean {
	if (value == null) return true;
	switch (option) {
		case StatusEnum.ALL:
			return true;
		case StatusEnum.ACTIVE:
			return value;
		case StatusEnum.INACTIVE:
			return !value;
		default:
			return true;
	}
}
