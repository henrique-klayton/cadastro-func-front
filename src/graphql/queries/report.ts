import { graphql } from "@graphql/types/gql";

export const employeesReport = graphql(`
	query EmployeesReport {
		generateEmployeeReport
	}
`);

export const schedulesReport = graphql(`
	query SchedulesReport {
		generateScheduleReport
	}
`);

export const skillsReport = graphql(`
	query SkillsReport {
		generateSkillReport
	}
`);
