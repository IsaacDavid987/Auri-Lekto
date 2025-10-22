import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, MutationRef, MutationPromise } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface Course_Key {
  id: UUIDString;
  __typename?: 'Course_Key';
}

export interface CreateNewUserData {
  user_insert: User_Key;
}

export interface CreateNewUserVariables {
  email: string;
  passwordHash: string;
  username: string;
  createdAt: TimestampString;
}

export interface GetUserByUsernameData {
  users: ({
    id: UUIDString;
    email: string;
    username: string;
    displayName?: string | null;
    profilePictureUrl?: string | null;
  } & User_Key)[];
}

export interface GetUserByUsernameVariables {
  username: string;
}

export interface Language_Key {
  id: UUIDString;
  __typename?: 'Language_Key';
}

export interface Lesson_Key {
  id: UUIDString;
  __typename?: 'Lesson_Key';
}

export interface ListCoursesForLanguageData {
  courses: ({
    id: UUIDString;
    title: string;
    description: string;
    imageUrl?: string | null;
    level: string;
  } & Course_Key)[];
}

export interface ListCoursesForLanguageVariables {
  languageId: UUIDString;
}

export interface UpdateUserDisplayNameData {
  user_update?: User_Key | null;
}

export interface UpdateUserDisplayNameVariables {
  id: UUIDString;
  displayName: string;
}

export interface UserLanguage_Key {
  id: UUIDString;
  __typename?: 'UserLanguage_Key';
}

export interface UserProgress_Key {
  id: UUIDString;
  __typename?: 'UserProgress_Key';
}

export interface User_Key {
  id: UUIDString;
  __typename?: 'User_Key';
}

export interface VocabularyWord_Key {
  id: UUIDString;
  __typename?: 'VocabularyWord_Key';
}

interface CreateNewUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateNewUserVariables): MutationRef<CreateNewUserData, CreateNewUserVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateNewUserVariables): MutationRef<CreateNewUserData, CreateNewUserVariables>;
  operationName: string;
}
export const createNewUserRef: CreateNewUserRef;

export function createNewUser(vars: CreateNewUserVariables): MutationPromise<CreateNewUserData, CreateNewUserVariables>;
export function createNewUser(dc: DataConnect, vars: CreateNewUserVariables): MutationPromise<CreateNewUserData, CreateNewUserVariables>;

interface GetUserByUsernameRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetUserByUsernameVariables): QueryRef<GetUserByUsernameData, GetUserByUsernameVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetUserByUsernameVariables): QueryRef<GetUserByUsernameData, GetUserByUsernameVariables>;
  operationName: string;
}
export const getUserByUsernameRef: GetUserByUsernameRef;

export function getUserByUsername(vars: GetUserByUsernameVariables): QueryPromise<GetUserByUsernameData, GetUserByUsernameVariables>;
export function getUserByUsername(dc: DataConnect, vars: GetUserByUsernameVariables): QueryPromise<GetUserByUsernameData, GetUserByUsernameVariables>;

interface UpdateUserDisplayNameRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateUserDisplayNameVariables): MutationRef<UpdateUserDisplayNameData, UpdateUserDisplayNameVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateUserDisplayNameVariables): MutationRef<UpdateUserDisplayNameData, UpdateUserDisplayNameVariables>;
  operationName: string;
}
export const updateUserDisplayNameRef: UpdateUserDisplayNameRef;

export function updateUserDisplayName(vars: UpdateUserDisplayNameVariables): MutationPromise<UpdateUserDisplayNameData, UpdateUserDisplayNameVariables>;
export function updateUserDisplayName(dc: DataConnect, vars: UpdateUserDisplayNameVariables): MutationPromise<UpdateUserDisplayNameData, UpdateUserDisplayNameVariables>;

interface ListCoursesForLanguageRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListCoursesForLanguageVariables): QueryRef<ListCoursesForLanguageData, ListCoursesForLanguageVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ListCoursesForLanguageVariables): QueryRef<ListCoursesForLanguageData, ListCoursesForLanguageVariables>;
  operationName: string;
}
export const listCoursesForLanguageRef: ListCoursesForLanguageRef;

export function listCoursesForLanguage(vars: ListCoursesForLanguageVariables): QueryPromise<ListCoursesForLanguageData, ListCoursesForLanguageVariables>;
export function listCoursesForLanguage(dc: DataConnect, vars: ListCoursesForLanguageVariables): QueryPromise<ListCoursesForLanguageData, ListCoursesForLanguageVariables>;

