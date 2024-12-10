import { FragmentType, useFragment } from "@graphql/types/fragment-masking";
import { graphql } from "@graphql/types/gql";
import { ScheduleFragment as ScheduleFragmentType } from "@graphql/types/graphql";
export type { ScheduleFragment as ScheduleFragmentType } from "@graphql/types/graphql";

export interface PaginatedSchedule {
	data: ScheduleFragmentType[];
	total: number;
}

export const ScheduleFragment = graphql(`
	fragment Schedule on ScheduleDto {
		id
		startTime
		endTime
		type
		status
	}
`);

export function Schedule(
	fragment: FragmentType<typeof ScheduleFragment>,
): ScheduleFragmentType {
	const schedule = useFragment(ScheduleFragment, fragment);
	return schedule;
}
