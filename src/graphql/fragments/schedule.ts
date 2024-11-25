import { FragmentType, useFragment } from "@graphql/types/fragment-masking";
import { graphql } from "@graphql/types/gql";

export const ScheduleFragment = graphql(`
	fragment Schedule on ScheduleDto {
		id
		startTime
		endTime
		status
	}
`);

export default function Schedule(props: {
	schedule: FragmentType<typeof ScheduleFragment>;
}) {
	const schedule = useFragment(ScheduleFragment, props.schedule);
	return schedule;
}
