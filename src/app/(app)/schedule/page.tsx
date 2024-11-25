import { graphql } from "@graphql/types/gql";

export default function Schedule() {
	const schedules = graphql(`
		query GetSchedules {
			scheduleList {
				...Schedule
			}
		}
	`);
	return <div></div>;
}
