/* eslint-disable */
import { DocumentTypeDecoration } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
  /** Format representating time with timezone in the format HH:mm:ss.sssZ */
  Time: { input: any; output: any; }
};

export type EmployeeCreateDto = {
  birthDate: Scalars['DateTime']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  scheduleId?: InputMaybe<Scalars['Int']['input']>;
  status?: Scalars['Boolean']['input'];
};

export type EmployeeDto = {
  __typename?: 'EmployeeDto';
  birthDate: Scalars['DateTime']['output'];
  createdAt: Scalars['DateTime']['output'];
  firstName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  lastName: Scalars['String']['output'];
  scheduleId?: Maybe<Scalars['Int']['output']>;
  status: Scalars['Boolean']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type EmployeeFullDto = {
  __typename?: 'EmployeeFullDto';
  birthDate: Scalars['DateTime']['output'];
  createdAt: Scalars['DateTime']['output'];
  firstName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  lastName: Scalars['String']['output'];
  schedule: ScheduleDto;
  scheduleId?: Maybe<Scalars['Int']['output']>;
  skills: Array<SkillDto>;
  status: Scalars['Boolean']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type EmployeeUpdateDto = {
  birthDate?: InputMaybe<Scalars['DateTime']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  scheduleId?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<Scalars['Boolean']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createEmployee: EmployeeDto;
  createSchedule: ScheduleDto;
  createSkill: SkillDto;
  deleteEmployee: EmployeeDto;
  deleteSchedule: ScheduleDto;
  deleteSkill: SkillDto;
  updateEmployee: EmployeeDto;
  updateEmployeeStatus: EmployeeDto;
  updateSchedule: ScheduleDto;
  updateScheduleStatus: ScheduleDto;
  updateSkill: SkillDto;
  updateSkillStatus: SkillDto;
};


export type MutationCreateEmployeeArgs = {
  employee: EmployeeCreateDto;
  skills?: InputMaybe<Array<Scalars['Int']['input']>>;
};


export type MutationCreateScheduleArgs = {
  schedule: ScheduleCreateDto;
};


export type MutationCreateSkillArgs = {
  employees?: InputMaybe<Array<Scalars['ID']['input']>>;
  skill: SkillCreateDto;
};


export type MutationDeleteEmployeeArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteScheduleArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteSkillArgs = {
  id: Scalars['Int']['input'];
};


export type MutationUpdateEmployeeArgs = {
  employee: EmployeeUpdateDto;
  id: Scalars['ID']['input'];
  skills?: InputMaybe<Array<Scalars['Int']['input']>>;
};


export type MutationUpdateEmployeeStatusArgs = {
  id: Scalars['ID']['input'];
  status: Scalars['Boolean']['input'];
};


export type MutationUpdateScheduleArgs = {
  id: Scalars['Int']['input'];
  schedule: ScheduleUpdateDto;
};


export type MutationUpdateScheduleStatusArgs = {
  id: Scalars['Int']['input'];
  status: Scalars['Boolean']['input'];
};


export type MutationUpdateSkillArgs = {
  employees?: InputMaybe<Array<Scalars['ID']['input']>>;
  id: Scalars['Int']['input'];
  skill: SkillUpdateDto;
};


export type MutationUpdateSkillStatusArgs = {
  id: Scalars['Int']['input'];
  status: Scalars['Boolean']['input'];
};

export type Query = {
  __typename?: 'Query';
  employee: EmployeeDto;
  employeeList: Array<EmployeeDto>;
  employeeWithRelations: EmployeeFullDto;
  schedule: ScheduleDto;
  scheduleList: Array<ScheduleDto>;
  skill: SkillDto;
  skillList: Array<SkillDto>;
};


export type QueryEmployeeArgs = {
  id: Scalars['ID']['input'];
};


export type QueryEmployeeListArgs = {
  filterStatus?: Scalars['Boolean']['input'];
  limit?: Scalars['Int']['input'];
  offset?: Scalars['Int']['input'];
};


export type QueryEmployeeWithRelationsArgs = {
  id: Scalars['ID']['input'];
};


export type QueryScheduleArgs = {
  id: Scalars['Int']['input'];
};


export type QueryScheduleListArgs = {
  filterStatus?: Scalars['Boolean']['input'];
  limit?: Scalars['Int']['input'];
  offset?: Scalars['Int']['input'];
};


export type QuerySkillArgs = {
  id: Scalars['Int']['input'];
};


export type QuerySkillListArgs = {
  filterStatus?: Scalars['Boolean']['input'];
  limit?: Scalars['Int']['input'];
  offset?: Scalars['Int']['input'];
};

export type ScheduleCreateDto = {
  endTime: Scalars['Time']['input'];
  startTime: Scalars['Time']['input'];
  status?: Scalars['Boolean']['input'];
  type: ScheduleType;
};

export type ScheduleDto = {
  __typename?: 'ScheduleDto';
  endTime: Scalars['Time']['output'];
  id: Scalars['Int']['output'];
  startTime: Scalars['Time']['output'];
  status: Scalars['Boolean']['output'];
  type: ScheduleType;
};

export enum ScheduleType {
  Schedule_5x2 = 'SCHEDULE_5x2',
  Schedule_6x1 = 'SCHEDULE_6x1',
  Schedule_12x36 = 'SCHEDULE_12x36'
}

export type ScheduleUpdateDto = {
  endTime?: InputMaybe<Scalars['Time']['input']>;
  startTime?: InputMaybe<Scalars['Time']['input']>;
  status?: InputMaybe<Scalars['Boolean']['input']>;
  type?: InputMaybe<ScheduleType>;
};

export type SkillCreateDto = {
  description: Scalars['String']['input'];
  status?: Scalars['Boolean']['input'];
};

export type SkillDto = {
  __typename?: 'SkillDto';
  description: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  status: Scalars['Boolean']['output'];
};

export type SkillUpdateDto = {
  description?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['Boolean']['input']>;
};

/**
 * The fundamental unit of any GraphQL Schema is the type. There are many kinds of types in GraphQL as represented by the `__TypeKind` enum.
 *
 * Depending on the kind of a type, certain fields describe information about that type. Scalar types provide no information beyond a name, description and optional `specifiedByURL`, while Enum types provide their values. Object and Interface types provide the fields they describe. Abstract types, Union and Interface, provide the Object types possible at runtime. List and NonNull types compose other types.
 */
export type __Type = {
  __typename?: '__Type';
  kind: __TypeKind;
  name?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  specifiedByURL?: Maybe<Scalars['String']['output']>;
  fields?: Maybe<Array<__Field>>;
  interfaces?: Maybe<Array<__Type>>;
  possibleTypes?: Maybe<Array<__Type>>;
  enumValues?: Maybe<Array<__EnumValue>>;
  inputFields?: Maybe<Array<__InputValue>>;
  ofType?: Maybe<__Type>;
  isOneOf?: Maybe<Scalars['Boolean']['output']>;
};


/**
 * The fundamental unit of any GraphQL Schema is the type. There are many kinds of types in GraphQL as represented by the `__TypeKind` enum.
 *
 * Depending on the kind of a type, certain fields describe information about that type. Scalar types provide no information beyond a name, description and optional `specifiedByURL`, while Enum types provide their values. Object and Interface types provide the fields they describe. Abstract types, Union and Interface, provide the Object types possible at runtime. List and NonNull types compose other types.
 */
export type __TypeFieldsArgs = {
  includeDeprecated?: InputMaybe<Scalars['Boolean']['input']>;
};


/**
 * The fundamental unit of any GraphQL Schema is the type. There are many kinds of types in GraphQL as represented by the `__TypeKind` enum.
 *
 * Depending on the kind of a type, certain fields describe information about that type. Scalar types provide no information beyond a name, description and optional `specifiedByURL`, while Enum types provide their values. Object and Interface types provide the fields they describe. Abstract types, Union and Interface, provide the Object types possible at runtime. List and NonNull types compose other types.
 */
export type __TypeEnumValuesArgs = {
  includeDeprecated?: InputMaybe<Scalars['Boolean']['input']>;
};


/**
 * The fundamental unit of any GraphQL Schema is the type. There are many kinds of types in GraphQL as represented by the `__TypeKind` enum.
 *
 * Depending on the kind of a type, certain fields describe information about that type. Scalar types provide no information beyond a name, description and optional `specifiedByURL`, while Enum types provide their values. Object and Interface types provide the fields they describe. Abstract types, Union and Interface, provide the Object types possible at runtime. List and NonNull types compose other types.
 */
export type __TypeInputFieldsArgs = {
  includeDeprecated?: InputMaybe<Scalars['Boolean']['input']>;
};

/** An enum describing what kind of type a given `__Type` is. */
export enum __TypeKind {
  /** Indicates this type is a scalar. */
  Scalar = 'SCALAR',
  /** Indicates this type is an object. `fields` and `interfaces` are valid fields. */
  Object = 'OBJECT',
  /** Indicates this type is an interface. `fields`, `interfaces`, and `possibleTypes` are valid fields. */
  Interface = 'INTERFACE',
  /** Indicates this type is a union. `possibleTypes` is a valid field. */
  Union = 'UNION',
  /** Indicates this type is an enum. `enumValues` is a valid field. */
  Enum = 'ENUM',
  /** Indicates this type is an input object. `inputFields` is a valid field. */
  InputObject = 'INPUT_OBJECT',
  /** Indicates this type is a list. `ofType` is a valid field. */
  List = 'LIST',
  /** Indicates this type is a non-null. `ofType` is a valid field. */
  NonNull = 'NON_NULL'
}

/** Object and Interface types are described by a list of Fields, each of which has a name, potentially a list of arguments, and a return type. */
export type __Field = {
  __typename?: '__Field';
  name: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  args: Array<__InputValue>;
  type: __Type;
  isDeprecated: Scalars['Boolean']['output'];
  deprecationReason?: Maybe<Scalars['String']['output']>;
};


/** Object and Interface types are described by a list of Fields, each of which has a name, potentially a list of arguments, and a return type. */
export type __FieldArgsArgs = {
  includeDeprecated?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Arguments provided to Fields or Directives and the input fields of an InputObject are represented as Input Values which describe their type and optionally a default value. */
export type __InputValue = {
  __typename?: '__InputValue';
  name: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  type: __Type;
  /** A GraphQL-formatted string representing the default value for this input value. */
  defaultValue?: Maybe<Scalars['String']['output']>;
  isDeprecated: Scalars['Boolean']['output'];
  deprecationReason?: Maybe<Scalars['String']['output']>;
};

/** One possible value for a given Enum. Enum values are unique values, not a placeholder for a string or numeric value. However an Enum value is returned in a JSON response as a string. */
export type __EnumValue = {
  __typename?: '__EnumValue';
  name: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  isDeprecated: Scalars['Boolean']['output'];
  deprecationReason?: Maybe<Scalars['String']['output']>;
};

export type EmployeeFragment = { __typename: 'EmployeeDto', id: string, firstName: string, lastName: string, birthDate: any, status: boolean } & { ' $fragmentName'?: 'EmployeeFragment' };

export type FullEmployeeFragment = { __typename: 'EmployeeFullDto', id: string, firstName: string, lastName: string, birthDate: any, status: boolean, schedule: (
    { __typename: 'ScheduleDto' }
    & { ' $fragmentRefs'?: { 'ScheduleFragment': ScheduleFragment } }
  ), skills: Array<(
    { __typename: 'SkillDto' }
    & { ' $fragmentRefs'?: { 'SkillFragment': SkillFragment } }
  )> } & { ' $fragmentName'?: 'FullEmployeeFragment' };

export type ScheduleFragment = { __typename: 'ScheduleDto', id: number, startTime: any, endTime: any, type: ScheduleType, status: boolean } & { ' $fragmentName'?: 'ScheduleFragment' };

export type SkillFragment = { __typename: 'SkillDto', id: number, description: string, status: boolean } & { ' $fragmentName'?: 'SkillFragment' };

export type GetFullEmployeeQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetFullEmployeeQuery = { __typename: 'Query', employeeWithRelations: (
    { __typename: 'EmployeeFullDto' }
    & { ' $fragmentRefs'?: { 'FullEmployeeFragment': FullEmployeeFragment } }
  ) };

export type GetEmployeesQueryVariables = Exact<{
  filterStatus?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type GetEmployeesQuery = { __typename: 'Query', employeeList: Array<(
    { __typename: 'EmployeeDto' }
    & { ' $fragmentRefs'?: { 'EmployeeFragment': EmployeeFragment } }
  )> };

export type CreateEmployeeMutationVariables = Exact<{
  employee: EmployeeCreateDto;
}>;


export type CreateEmployeeMutation = { __typename: 'Mutation', createEmployee: (
    { __typename: 'EmployeeDto' }
    & { ' $fragmentRefs'?: { 'EmployeeFragment': EmployeeFragment } }
  ) };

export type UpdateEmployeeMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  employee: EmployeeUpdateDto;
}>;


export type UpdateEmployeeMutation = { __typename: 'Mutation', updateEmployee: (
    { __typename: 'EmployeeDto' }
    & { ' $fragmentRefs'?: { 'EmployeeFragment': EmployeeFragment } }
  ) };

export type DeleteEmployeeMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteEmployeeMutation = { __typename: 'Mutation', deleteEmployee: (
    { __typename: 'EmployeeDto' }
    & { ' $fragmentRefs'?: { 'EmployeeFragment': EmployeeFragment } }
  ) };

export type ScheduleTypeValuesQueryVariables = Exact<{ [key: string]: never; }>;


export type ScheduleTypeValuesQuery = { __typename: 'Query', __type?: { __typename: '__Type', enumValues?: Array<{ __typename: '__EnumValue', name: string }> | null } | null };

export type GetScheduleQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type GetScheduleQuery = { __typename: 'Query', schedule: (
    { __typename: 'ScheduleDto' }
    & { ' $fragmentRefs'?: { 'ScheduleFragment': ScheduleFragment } }
  ) };

export type GetSchedulesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSchedulesQuery = { __typename: 'Query', scheduleList: Array<(
    { __typename: 'ScheduleDto' }
    & { ' $fragmentRefs'?: { 'ScheduleFragment': ScheduleFragment } }
  )> };

export type CreateScheduleMutationVariables = Exact<{
  schedule: ScheduleCreateDto;
}>;


export type CreateScheduleMutation = { __typename: 'Mutation', createSchedule: (
    { __typename: 'ScheduleDto' }
    & { ' $fragmentRefs'?: { 'ScheduleFragment': ScheduleFragment } }
  ) };

export type UpdateScheduleMutationVariables = Exact<{
  id: Scalars['Int']['input'];
  schedule: ScheduleUpdateDto;
}>;


export type UpdateScheduleMutation = { __typename: 'Mutation', updateSchedule: (
    { __typename: 'ScheduleDto' }
    & { ' $fragmentRefs'?: { 'ScheduleFragment': ScheduleFragment } }
  ) };

export type DeleteScheduleMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type DeleteScheduleMutation = { __typename: 'Mutation', deleteSchedule: (
    { __typename: 'ScheduleDto' }
    & { ' $fragmentRefs'?: { 'ScheduleFragment': ScheduleFragment } }
  ) };

export type GetSkillsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSkillsQuery = { __typename: 'Query', skillList: Array<(
    { __typename: 'SkillDto' }
    & { ' $fragmentRefs'?: { 'SkillFragment': SkillFragment } }
  )> };

export class TypedDocumentString<TResult, TVariables>
  extends String
  implements DocumentTypeDecoration<TResult, TVariables>
{
  __apiType?: DocumentTypeDecoration<TResult, TVariables>['__apiType'];

  constructor(private value: string, public __meta__?: Record<string, any> | undefined) {
    super(value);
  }

  toString(): string & DocumentTypeDecoration<TResult, TVariables> {
    return this.value;
  }
}
export const EmployeeFragmentDoc = new TypedDocumentString(`
    fragment Employee on EmployeeDto {
  __typename
  id
  firstName
  lastName
  birthDate
  status
}
    `, {"fragmentName":"Employee"}) as unknown as TypedDocumentString<EmployeeFragment, unknown>;
export const ScheduleFragmentDoc = new TypedDocumentString(`
    fragment Schedule on ScheduleDto {
  __typename
  id
  startTime
  endTime
  type
  status
}
    `, {"fragmentName":"Schedule"}) as unknown as TypedDocumentString<ScheduleFragment, unknown>;
export const SkillFragmentDoc = new TypedDocumentString(`
    fragment Skill on SkillDto {
  __typename
  id
  description
  status
}
    `, {"fragmentName":"Skill"}) as unknown as TypedDocumentString<SkillFragment, unknown>;
export const FullEmployeeFragmentDoc = new TypedDocumentString(`
    fragment FullEmployee on EmployeeFullDto {
  __typename
  id
  firstName
  lastName
  birthDate
  status
  schedule {
    __typename
    ...Schedule
  }
  skills {
    __typename
    ...Skill
  }
}
    fragment Schedule on ScheduleDto {
  __typename
  id
  startTime
  endTime
  type
  status
}
fragment Skill on SkillDto {
  __typename
  id
  description
  status
}`, {"fragmentName":"FullEmployee"}) as unknown as TypedDocumentString<FullEmployeeFragment, unknown>;
export const GetFullEmployeeDocument = new TypedDocumentString(`
    query GetFullEmployee($id: ID!) {
  __typename
  employeeWithRelations(id: $id) {
    __typename
    ...FullEmployee
  }
}
    fragment FullEmployee on EmployeeFullDto {
  __typename
  id
  firstName
  lastName
  birthDate
  status
  schedule {
    __typename
    ...Schedule
  }
  skills {
    __typename
    ...Skill
  }
}
fragment Schedule on ScheduleDto {
  __typename
  id
  startTime
  endTime
  type
  status
}
fragment Skill on SkillDto {
  __typename
  id
  description
  status
}`) as unknown as TypedDocumentString<GetFullEmployeeQuery, GetFullEmployeeQueryVariables>;
export const GetEmployeesDocument = new TypedDocumentString(`
    query GetEmployees($filterStatus: Boolean) {
  __typename
  employeeList(filterStatus: $filterStatus) {
    __typename
    ...Employee
  }
}
    fragment Employee on EmployeeDto {
  __typename
  id
  firstName
  lastName
  birthDate
  status
}`) as unknown as TypedDocumentString<GetEmployeesQuery, GetEmployeesQueryVariables>;
export const CreateEmployeeDocument = new TypedDocumentString(`
    mutation CreateEmployee($employee: EmployeeCreateDto!) {
  __typename
  createEmployee(employee: $employee) {
    __typename
    ...Employee
  }
}
    fragment Employee on EmployeeDto {
  __typename
  id
  firstName
  lastName
  birthDate
  status
}`) as unknown as TypedDocumentString<CreateEmployeeMutation, CreateEmployeeMutationVariables>;
export const UpdateEmployeeDocument = new TypedDocumentString(`
    mutation UpdateEmployee($id: ID!, $employee: EmployeeUpdateDto!) {
  __typename
  updateEmployee(id: $id, employee: $employee) {
    __typename
    ...Employee
  }
}
    fragment Employee on EmployeeDto {
  __typename
  id
  firstName
  lastName
  birthDate
  status
}`) as unknown as TypedDocumentString<UpdateEmployeeMutation, UpdateEmployeeMutationVariables>;
export const DeleteEmployeeDocument = new TypedDocumentString(`
    mutation DeleteEmployee($id: ID!) {
  __typename
  deleteEmployee(id: $id) {
    __typename
    ...Employee
  }
}
    fragment Employee on EmployeeDto {
  __typename
  id
  firstName
  lastName
  birthDate
  status
}`) as unknown as TypedDocumentString<DeleteEmployeeMutation, DeleteEmployeeMutationVariables>;
export const ScheduleTypeValuesDocument = new TypedDocumentString(`
    query ScheduleTypeValues {
  __typename
  __type(name: "ScheduleType") {
    __typename
    enumValues {
      __typename
      name
    }
  }
}
    `) as unknown as TypedDocumentString<ScheduleTypeValuesQuery, ScheduleTypeValuesQueryVariables>;
export const GetScheduleDocument = new TypedDocumentString(`
    query GetSchedule($id: Int!) {
  __typename
  schedule(id: $id) {
    __typename
    ...Schedule
  }
}
    fragment Schedule on ScheduleDto {
  __typename
  id
  startTime
  endTime
  type
  status
}`) as unknown as TypedDocumentString<GetScheduleQuery, GetScheduleQueryVariables>;
export const GetSchedulesDocument = new TypedDocumentString(`
    query GetSchedules {
  __typename
  scheduleList {
    __typename
    ...Schedule
  }
}
    fragment Schedule on ScheduleDto {
  __typename
  id
  startTime
  endTime
  type
  status
}`) as unknown as TypedDocumentString<GetSchedulesQuery, GetSchedulesQueryVariables>;
export const CreateScheduleDocument = new TypedDocumentString(`
    mutation CreateSchedule($schedule: ScheduleCreateDto!) {
  __typename
  createSchedule(schedule: $schedule) {
    __typename
    ...Schedule
  }
}
    fragment Schedule on ScheduleDto {
  __typename
  id
  startTime
  endTime
  type
  status
}`) as unknown as TypedDocumentString<CreateScheduleMutation, CreateScheduleMutationVariables>;
export const UpdateScheduleDocument = new TypedDocumentString(`
    mutation UpdateSchedule($id: Int!, $schedule: ScheduleUpdateDto!) {
  __typename
  updateSchedule(id: $id, schedule: $schedule) {
    __typename
    ...Schedule
  }
}
    fragment Schedule on ScheduleDto {
  __typename
  id
  startTime
  endTime
  type
  status
}`) as unknown as TypedDocumentString<UpdateScheduleMutation, UpdateScheduleMutationVariables>;
export const DeleteScheduleDocument = new TypedDocumentString(`
    mutation DeleteSchedule($id: Int!) {
  __typename
  deleteSchedule(id: $id) {
    __typename
    ...Schedule
  }
}
    fragment Schedule on ScheduleDto {
  __typename
  id
  startTime
  endTime
  type
  status
}`) as unknown as TypedDocumentString<DeleteScheduleMutation, DeleteScheduleMutationVariables>;
export const GetSkillsDocument = new TypedDocumentString(`
    query GetSkills {
  __typename
  skillList {
    __typename
    ...Skill
  }
}
    fragment Skill on SkillDto {
  __typename
  id
  description
  status
}`) as unknown as TypedDocumentString<GetSkillsQuery, GetSkillsQueryVariables>;