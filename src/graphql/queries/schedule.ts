import { graphql } from "@graphql/types/gql";

export const getScheduleQuery = graphql(`
	query GetSchedule($id: Int!) {
		schedule(id: $id) {
			...Schedule
		}
	}
`);

export const getSchedulesListQuery = graphql(`
	query GetSchedules($limit: Int, $offset: Int, $filterStatus: Boolean) {
		scheduleList(limit: $limit, offset: $offset, filterStatus: $filterStatus) {
			data {...Schedule}
			total
		}
	}
`);

export const createScheduleMutation = graphql(`
	mutation CreateSchedule($schedule: ScheduleCreateDto!) {
		createSchedule(schedule: $schedule) {
			...Schedule
		}
	}
`);

export const updateScheduleMutation = graphql(`
	mutation UpdateSchedule($id: Int!, $schedule: ScheduleUpdateDto!) {
		updateSchedule(id: $id, schedule: $schedule) {
			...Schedule
		}
	}
`);

export const deleteScheduleMutation = graphql(`
	mutation DeleteSchedule($id: Int!) {
		deleteSchedule(id: $id) {
			...Schedule
		}
	}
`);
