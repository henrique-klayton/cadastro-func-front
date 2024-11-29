import { graphql } from "@graphql-types/gql";

export const getScheduleQuery = graphql(`
	query GetSchedule($id: Int!) {
		schedule(id: $id) {
			...Schedule
		}
	}
`);

export const getSchedulesListQuery = graphql(`
	query GetSchedules {
		scheduleList {
			...Schedule
		}
	}
`);

export const createEmployeeMutation = graphql(`
	mutation CreateSchedule($schedule: ScheduleCreateDto!) {
		createSchedule(schedule: $schedule) {
			...Schedule
		}
	}
`);

export const updateEmployeeMutation = graphql(`
	mutation UpdateSchedule($id: Int!, $schedule: ScheduleUpdateDto!) {
		updateSchedule(id: $id, schedule: $schedule) {
			...Schedule
		}
	}
`);

export const deleteEmployeeMutation = graphql(`
	mutation DeleteSchedule($id: Int!) {
		deleteSchedule(id: $id) {
			...Schedule
		}
	}
`);
