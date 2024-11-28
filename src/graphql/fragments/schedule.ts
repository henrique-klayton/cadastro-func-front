import { FragmentType, useFragment } from "@graphql-types/fragment-masking";
import { graphql } from "@graphql-types/gql";
import { ScheduleFragment as ScheduleFragmentType } from "@graphql-types/graphql";

export type ScheduleType = ScheduleFragmentType;

export const ScheduleFragment = graphql(`
	fragment Schedule on ScheduleDto {
		id
		startTime
		endTime
		type
		status
	}
`);

export default function Schedule(
	fragment: FragmentType<typeof ScheduleFragment>,
): ScheduleType {
	const schedule = useFragment(ScheduleFragment, fragment);
	return schedule;
}
