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

export type GetEmployeesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetEmployeesQuery = { __typename?: 'Query', employeeList: Array<(
    { __typename?: 'EmployeeDto' }
    & { ' $fragmentRefs'?: { 'EmployeeFragment': EmployeeFragment } }
  )> };

export type GetSchedulesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSchedulesQuery = { __typename?: 'Query', scheduleList: Array<(
    { __typename?: 'ScheduleDto' }
    & { ' $fragmentRefs'?: { 'ScheduleFragment': ScheduleFragment } }
  )> };

export type GetSkillsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSkillsQuery = { __typename?: 'Query', skillList: Array<(
    { __typename?: 'SkillDto' }
    & { ' $fragmentRefs'?: { 'SkillFragment': SkillFragment } }
  )> };

export type EmployeeFragment = { __typename?: 'EmployeeDto', id: string, firstName: string, lastName: string, birthDate: any, status: boolean } & { ' $fragmentName'?: 'EmployeeFragment' };

export type ScheduleFragment = { __typename?: 'ScheduleDto', id: number, startTime: any, endTime: any, type: ScheduleType, status: boolean } & { ' $fragmentName'?: 'ScheduleFragment' };

export type SkillFragment = { __typename?: 'SkillDto', id: number, description: string, status: boolean } & { ' $fragmentName'?: 'SkillFragment' };

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
  id
  firstName
  lastName
  birthDate
  status
}
    `, {"fragmentName":"Employee"}) as unknown as TypedDocumentString<EmployeeFragment, unknown>;
export const ScheduleFragmentDoc = new TypedDocumentString(`
    fragment Schedule on ScheduleDto {
  id
  startTime
  endTime
  type
  status
}
    `, {"fragmentName":"Schedule"}) as unknown as TypedDocumentString<ScheduleFragment, unknown>;
export const SkillFragmentDoc = new TypedDocumentString(`
    fragment Skill on SkillDto {
  id
  description
  status
}
    `, {"fragmentName":"Skill"}) as unknown as TypedDocumentString<SkillFragment, unknown>;
export const GetEmployeesDocument = new TypedDocumentString(`
    query GetEmployees {
  employeeList {
    ...Employee
  }
}
    fragment Employee on EmployeeDto {
  id
  firstName
  lastName
  birthDate
  status
}`) as unknown as TypedDocumentString<GetEmployeesQuery, GetEmployeesQueryVariables>;
export const GetSchedulesDocument = new TypedDocumentString(`
    query GetSchedules {
  scheduleList {
    ...Schedule
  }
}
    fragment Schedule on ScheduleDto {
  id
  startTime
  endTime
  type
  status
}`) as unknown as TypedDocumentString<GetSchedulesQuery, GetSchedulesQueryVariables>;
export const GetSkillsDocument = new TypedDocumentString(`
    query GetSkills {
  skillList {
    ...Skill
  }
}
    fragment Skill on SkillDto {
  id
  description
  status
}`) as unknown as TypedDocumentString<GetSkillsQuery, GetSkillsQueryVariables>;