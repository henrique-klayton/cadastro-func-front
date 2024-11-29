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
    "\n\t\tquery GetSchedules {\n\t\t\tscheduleList {\n\t\t\t\t...Schedule\n\t\t\t}\n\t\t}\n\t": types.GetSchedulesDocument,
    "\n\t\tquery GetSkills {\n\t\t\tskillList {\n\t\t\t\t...Skill\n\t\t\t}\n\t\t}\n\t": types.GetSkillsDocument,
    "\n\tfragment Employee on EmployeeDto {\n\t\tid\n\t\tfirstName\n\t\tlastName\n\t\tbirthDate\n\t\tstatus\n\t}\n": types.EmployeeFragmentDoc,
    "\n\tfragment FullEmployee on EmployeeFullDto {\n\t\tid\n\t\tfirstName\n\t\tlastName\n\t\tbirthDate\n\t\tstatus\n\t\tschedule { ...Schedule }\n\t\tskills { ...Skill }\n\t}\n": types.FullEmployeeFragmentDoc,
    "\n\tfragment Schedule on ScheduleDto {\n\t\tid\n\t\tstartTime\n\t\tendTime\n\t\ttype\n\t\tstatus\n\t}\n": types.ScheduleFragmentDoc,
    "\n\tfragment Skill on SkillDto {\n\t\tid\n\t\tdescription\n\t\tstatus\n\t}\n": types.SkillFragmentDoc,
    "\n\tquery GetFullEmployee($id: ID!) {\n\t\temployeeWithRelations(id: $id) {\n\t\t\t...FullEmployee\n\t\t}\n\t}\n": types.GetFullEmployeeDocument,
    "\n\tquery GetEmployees($filterStatus: Boolean) {\n\t\temployeeList(filterStatus: $filterStatus) {\n\t\t\t...Employee\n\t\t}\n\t}\n": types.GetEmployeesDocument,
    "\n\tmutation CreateEmployee($employee: EmployeeCreateDto!) {\n\t\tcreateEmployee(employee: $employee) {\n\t\t\t...Employee\n\t\t}\n\t}\n": types.CreateEmployeeDocument,
    "\n\tmutation UpdateEmployee($id: ID!, $employee: EmployeeUpdateDto!) {\n\t\tupdateEmployee(id: $id, employee: $employee) {\n\t\t\t...Employee\n\t\t}\n\t}\n": types.UpdateEmployeeDocument,
    "\n\tmutation DeleteEmployee($id: ID!) {\n\t\tdeleteEmployee(id: $id) {\n\t\t\t...Employee\n\t\t}\n\t}\n": types.DeleteEmployeeDocument,
    "\n\tquery GetSchedules {\n\t\tscheduleList {\n\t\t\t...Schedule\n\t\t}\n\t}\n": types.GetSchedulesDocument,
    "\n\tquery GetSkills {\n\t\tskillList {\n\t\t\t...Skill\n\t\t}\n\t}\n": types.GetSkillsDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\t\tquery GetSchedules {\n\t\t\tscheduleList {\n\t\t\t\t...Schedule\n\t\t\t}\n\t\t}\n\t"): typeof import('./graphql').GetSchedulesDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\t\tquery GetSkills {\n\t\t\tskillList {\n\t\t\t\t...Skill\n\t\t\t}\n\t\t}\n\t"): typeof import('./graphql').GetSkillsDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tfragment Employee on EmployeeDto {\n\t\tid\n\t\tfirstName\n\t\tlastName\n\t\tbirthDate\n\t\tstatus\n\t}\n"): typeof import('./graphql').EmployeeFragmentDoc;
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
export function graphql(source: "\n\tquery GetEmployees($filterStatus: Boolean) {\n\t\temployeeList(filterStatus: $filterStatus) {\n\t\t\t...Employee\n\t\t}\n\t}\n"): typeof import('./graphql').GetEmployeesDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tmutation CreateEmployee($employee: EmployeeCreateDto!) {\n\t\tcreateEmployee(employee: $employee) {\n\t\t\t...Employee\n\t\t}\n\t}\n"): typeof import('./graphql').CreateEmployeeDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tmutation UpdateEmployee($id: ID!, $employee: EmployeeUpdateDto!) {\n\t\tupdateEmployee(id: $id, employee: $employee) {\n\t\t\t...Employee\n\t\t}\n\t}\n"): typeof import('./graphql').UpdateEmployeeDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tmutation DeleteEmployee($id: ID!) {\n\t\tdeleteEmployee(id: $id) {\n\t\t\t...Employee\n\t\t}\n\t}\n"): typeof import('./graphql').DeleteEmployeeDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tquery GetSchedules {\n\t\tscheduleList {\n\t\t\t...Schedule\n\t\t}\n\t}\n"): typeof import('./graphql').GetSchedulesDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tquery GetSkills {\n\t\tskillList {\n\t\t\t...Skill\n\t\t}\n\t}\n"): typeof import('./graphql').GetSkillsDocument;


export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}
