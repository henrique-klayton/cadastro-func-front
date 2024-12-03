import { graphql } from "@graphql/types";

const scheduleTypeValuesQuery = graphql(`
	query ScheduleTypeValues {
		__type(name: "ScheduleType") {
			enumValues {
				name
			}
		}
	}
`);

export default scheduleTypeValuesQuery;
