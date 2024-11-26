import { FragmentType, useFragment } from "@graphql/types/fragment-masking";
import { graphql } from "@graphql/types/gql";
import { ScheduleDto } from "@graphql/types/graphql";

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
): ScheduleDto {
	const schedule = useFragment(ScheduleFragment, fragment);
	return schedule;
}
