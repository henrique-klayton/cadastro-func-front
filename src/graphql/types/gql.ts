/* eslint-disable */
import * as types from './graphql';



/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
const documents = {
    "\n\tfragment Employee on EmployeeDto {\n\t\tid\n\t\tfirstName\n\t\tlastName\n\t\tbirthDate\n\t\tstatus\n\t\tschedule {\n\t\t\ttype\n\t\t}\n\t}\n": types.EmployeeFragmentDoc,
    "\n\tfragment FullEmployee on EmployeeFullDto {\n\t\tid\n\t\tfirstName\n\t\tlastName\n\t\tbirthDate\n\t\tstatus\n\t\tschedule { ...Schedule }\n\t\tskills { ...Skill }\n\t}\n": types.FullEmployeeFragmentDoc,
    "\n\tfragment Schedule on ScheduleDto {\n\t\tid\n\t\tstartTime\n\t\tendTime\n\t\ttype\n\t\tstatus\n\t}\n": types.ScheduleFragmentDoc,
    "\n\tfragment Skill on SkillDto {\n\t\tid\n\t\tdescription\n\t\tstatus\n\t}\n": types.SkillFragmentDoc,
    "\n\tquery GetFullEmployee($id: ID!) {\n\t\temployeeWithRelations(id: $id) {\n\t\t\t...FullEmployee\n\t\t}\n\t}\n": types.GetFullEmployeeDocument,
    "\n\tquery GetEmployees($limit: Int, $offset: Int, $filter: EmployeeFilterDto!) {\n\t\temployeeList(limit: $limit, offset: $offset, filter: $filter) {\n\t\t\tdata {...Employee}\n\t\t\ttotal\n\t\t}\n\t}\n": types.GetEmployeesDocument,
    "\n\tmutation CreateEmployee($employee: EmployeeCreateDto!, $skills: [Int!]) {\n\t\tcreateEmployee(employee: $employee, skills: $skills) {\n\t\t\t...Employee\n\t\t}\n\t}\n": types.CreateEmployeeDocument,
    "\n\tmutation UpdateEmployee($id: ID!, $employee: EmployeeUpdateDto!, $skills: [Int!]) {\n\t\tupdateEmployee(id: $id, employee: $employee, skills: $skills) {\n\t\t\t...Employee\n\t\t}\n\t}\n": types.UpdateEmployeeDocument,
    "\n\tmutation DeleteEmployee($id: ID!) {\n\t\tdeleteEmployee(id: $id) {\n\t\t\t...Employee\n\t\t}\n\t}\n": types.DeleteEmployeeDocument,
    "\n\tquery EmployeesReport {\n\t\tgenerateEmployeeReport\n\t}\n": types.EmployeesReportDocument,
    "\n\tquery SchedulesReport {\n\t\tgenerateScheduleReport\n\t}\n": types.SchedulesReportDocument,
    "\n\tquery SkillsReport {\n\t\tgenerateSkillReport\n\t}\n": types.SkillsReportDocument,
    "\n\tquery ScheduleTypeValues {\n\t\t__type(name: \"ScheduleType\") {\n\t\t\tenumValues {\n\t\t\t\tname\n\t\t\t}\n\t\t}\n\t}\n": types.ScheduleTypeValuesDocument,
    "\n\tquery GetSchedule($id: Int!) {\n\t\tschedule(id: $id) {\n\t\t\t...Schedule\n\t\t}\n\t}\n": types.GetScheduleDocument,
    "\n\tquery GetSchedules($limit: Int, $offset: Int, $filter: ScheduleFilterDto!) {\n\t\tscheduleList(limit: $limit, offset: $offset, filter: $filter) {\n\t\t\tdata {...Schedule}\n\t\t\ttotal\n\t\t}\n\t}\n": types.GetSchedulesDocument,
    "\n\tmutation CreateSchedule($schedule: ScheduleCreateDto!) {\n\t\tcreateSchedule(schedule: $schedule) {\n\t\t\t...Schedule\n\t\t}\n\t}\n": types.CreateScheduleDocument,
    "\n\tmutation UpdateSchedule($id: Int!, $schedule: ScheduleUpdateDto!) {\n\t\tupdateSchedule(id: $id, schedule: $schedule) {\n\t\t\t...Schedule\n\t\t}\n\t}\n": types.UpdateScheduleDocument,
    "\n\tmutation DeleteSchedule($id: Int!) {\n\t\tdeleteSchedule(id: $id) {\n\t\t\t...Schedule\n\t\t}\n\t}\n": types.DeleteScheduleDocument,
    "\n\tquery GetSkill($id: Int!) {\n\t\tskill(id: $id) {\n\t\t\t...Skill\n\t\t}\n\t}\n": types.GetSkillDocument,
    "\n\tquery GetSkills($limit: Int, $offset: Int, $filter: SkillFilterDto!) {\n\t\tskillList(limit: $limit, offset: $offset, filter: $filter) {\n\t\t\tdata {...Skill}\n\t\t\ttotal\n\t\t}\n\t}\n": types.GetSkillsDocument,
    "\n\tmutation CreateSkill($skill: SkillCreateDto!, $employees: [ID!]) {\n\t\tcreateSkill(skill: $skill, employees: $employees) {\n\t\t\t...Skill\n\t\t}\n\t}\n": types.CreateSkillDocument,
    "\n\tmutation UpdateSkill($id: Int!, $skill: SkillUpdateDto!, $employees: [ID!]) {\n\t\tupdateSkill(id: $id, skill: $skill, employees: $employees) {\n\t\t\t...Skill\n\t\t}\n\t}\n": types.UpdateSkillDocument,
    "\n\tmutation DeleteSkill($id: Int!) {\n\t\tdeleteSkill(id: $id) {\n\t\t\t...Skill\n\t\t}\n\t}\n": types.DeleteSkillDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tfragment Employee on EmployeeDto {\n\t\tid\n\t\tfirstName\n\t\tlastName\n\t\tbirthDate\n\t\tstatus\n\t\tschedule {\n\t\t\ttype\n\t\t}\n\t}\n"): typeof import('./graphql').EmployeeFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tfragment FullEmployee on EmployeeFullDto {\n\t\tid\n\t\tfirstName\n\t\tlastName\n\t\tbirthDate\n\t\tstatus\n\t\tschedule { ...Schedule }\n\t\tskills { ...Skill }\n\t}\n"): typeof import('./graphql').FullEmployeeFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tfragment Schedule on ScheduleDto {\n\t\tid\n\t\tstartTime\n\t\tendTime\n\t\ttype\n\t\tstatus\n\t}\n"): typeof import('./graphql').ScheduleFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tfragment Skill on SkillDto {\n\t\tid\n\t\tdescription\n\t\tstatus\n\t}\n"): typeof import('./graphql').SkillFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tquery GetFullEmployee($id: ID!) {\n\t\temployeeWithRelations(id: $id) {\n\t\t\t...FullEmployee\n\t\t}\n\t}\n"): typeof import('./graphql').GetFullEmployeeDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tquery GetEmployees($limit: Int, $offset: Int, $filter: EmployeeFilterDto!) {\n\t\temployeeList(limit: $limit, offset: $offset, filter: $filter) {\n\t\t\tdata {...Employee}\n\t\t\ttotal\n\t\t}\n\t}\n"): typeof import('./graphql').GetEmployeesDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tmutation CreateEmployee($employee: EmployeeCreateDto!, $skills: [Int!]) {\n\t\tcreateEmployee(employee: $employee, skills: $skills) {\n\t\t\t...Employee\n\t\t}\n\t}\n"): typeof import('./graphql').CreateEmployeeDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tmutation UpdateEmployee($id: ID!, $employee: EmployeeUpdateDto!, $skills: [Int!]) {\n\t\tupdateEmployee(id: $id, employee: $employee, skills: $skills) {\n\t\t\t...Employee\n\t\t}\n\t}\n"): typeof import('./graphql').UpdateEmployeeDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tmutation DeleteEmployee($id: ID!) {\n\t\tdeleteEmployee(id: $id) {\n\t\t\t...Employee\n\t\t}\n\t}\n"): typeof import('./graphql').DeleteEmployeeDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tquery EmployeesReport {\n\t\tgenerateEmployeeReport\n\t}\n"): typeof import('./graphql').EmployeesReportDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tquery SchedulesReport {\n\t\tgenerateScheduleReport\n\t}\n"): typeof import('./graphql').SchedulesReportDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tquery SkillsReport {\n\t\tgenerateSkillReport\n\t}\n"): typeof import('./graphql').SkillsReportDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tquery ScheduleTypeValues {\n\t\t__type(name: \"ScheduleType\") {\n\t\t\tenumValues {\n\t\t\t\tname\n\t\t\t}\n\t\t}\n\t}\n"): typeof import('./graphql').ScheduleTypeValuesDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tquery GetSchedule($id: Int!) {\n\t\tschedule(id: $id) {\n\t\t\t...Schedule\n\t\t}\n\t}\n"): typeof import('./graphql').GetScheduleDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tquery GetSchedules($limit: Int, $offset: Int, $filter: ScheduleFilterDto!) {\n\t\tscheduleList(limit: $limit, offset: $offset, filter: $filter) {\n\t\t\tdata {...Schedule}\n\t\t\ttotal\n\t\t}\n\t}\n"): typeof import('./graphql').GetSchedulesDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tmutation CreateSchedule($schedule: ScheduleCreateDto!) {\n\t\tcreateSchedule(schedule: $schedule) {\n\t\t\t...Schedule\n\t\t}\n\t}\n"): typeof import('./graphql').CreateScheduleDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tmutation UpdateSchedule($id: Int!, $schedule: ScheduleUpdateDto!) {\n\t\tupdateSchedule(id: $id, schedule: $schedule) {\n\t\t\t...Schedule\n\t\t}\n\t}\n"): typeof import('./graphql').UpdateScheduleDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tmutation DeleteSchedule($id: Int!) {\n\t\tdeleteSchedule(id: $id) {\n\t\t\t...Schedule\n\t\t}\n\t}\n"): typeof import('./graphql').DeleteScheduleDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tquery GetSkill($id: Int!) {\n\t\tskill(id: $id) {\n\t\t\t...Skill\n\t\t}\n\t}\n"): typeof import('./graphql').GetSkillDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tquery GetSkills($limit: Int, $offset: Int, $filter: SkillFilterDto!) {\n\t\tskillList(limit: $limit, offset: $offset, filter: $filter) {\n\t\t\tdata {...Skill}\n\t\t\ttotal\n\t\t}\n\t}\n"): typeof import('./graphql').GetSkillsDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tmutation CreateSkill($skill: SkillCreateDto!, $employees: [ID!]) {\n\t\tcreateSkill(skill: $skill, employees: $employees) {\n\t\t\t...Skill\n\t\t}\n\t}\n"): typeof import('./graphql').CreateSkillDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tmutation UpdateSkill($id: Int!, $skill: SkillUpdateDto!, $employees: [ID!]) {\n\t\tupdateSkill(id: $id, skill: $skill, employees: $employees) {\n\t\t\t...Skill\n\t\t}\n\t}\n"): typeof import('./graphql').UpdateSkillDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tmutation DeleteSkill($id: Int!) {\n\t\tdeleteSkill(id: $id) {\n\t\t\t...Skill\n\t\t}\n\t}\n"): typeof import('./graphql').DeleteSkillDocument;


export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}
