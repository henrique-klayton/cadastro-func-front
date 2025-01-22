"use client";
import StatusEnum from "@enums/status.enum";

export default function statusFilterSerializer(
	option: StatusEnum,
): boolean | undefined {
	switch (option) {
		case StatusEnum.ALL:
			return undefined;
		case StatusEnum.ACTIVE:
			return true;
		case StatusEnum.INACTIVE:
			return false;
		default:
			return option satisfies never;
	}
}
