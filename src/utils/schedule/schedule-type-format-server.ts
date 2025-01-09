import { ScheduleType } from "@graphql/types/graphql";

export default function scheduleTypeFormat(type: ScheduleType): string {
	return type.substring(9);
}
