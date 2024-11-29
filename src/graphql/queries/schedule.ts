import { graphql } from "@graphql-types/gql";

export const getSchedulesListQuery = graphql(`
	query GetSchedules {
		scheduleList {
			...Schedule
		}
	}
`);