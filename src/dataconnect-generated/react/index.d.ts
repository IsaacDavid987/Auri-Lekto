import { CreateNewUserData, CreateNewUserVariables, GetUserByUsernameData, GetUserByUsernameVariables, UpdateUserDisplayNameData, UpdateUserDisplayNameVariables, ListCoursesForLanguageData, ListCoursesForLanguageVariables } from '../';
import { UseDataConnectQueryResult, useDataConnectQueryOptions, UseDataConnectMutationResult, useDataConnectMutationOptions} from '@tanstack-query-firebase/react/data-connect';
import { UseQueryResult, UseMutationResult} from '@tanstack/react-query';
import { DataConnect } from 'firebase/data-connect';
import { FirebaseError } from 'firebase/app';


export function useCreateNewUser(options?: useDataConnectMutationOptions<CreateNewUserData, FirebaseError, CreateNewUserVariables>): UseDataConnectMutationResult<CreateNewUserData, CreateNewUserVariables>;
export function useCreateNewUser(dc: DataConnect, options?: useDataConnectMutationOptions<CreateNewUserData, FirebaseError, CreateNewUserVariables>): UseDataConnectMutationResult<CreateNewUserData, CreateNewUserVariables>;

export function useGetUserByUsername(vars: GetUserByUsernameVariables, options?: useDataConnectQueryOptions<GetUserByUsernameData>): UseDataConnectQueryResult<GetUserByUsernameData, GetUserByUsernameVariables>;
export function useGetUserByUsername(dc: DataConnect, vars: GetUserByUsernameVariables, options?: useDataConnectQueryOptions<GetUserByUsernameData>): UseDataConnectQueryResult<GetUserByUsernameData, GetUserByUsernameVariables>;

export function useUpdateUserDisplayName(options?: useDataConnectMutationOptions<UpdateUserDisplayNameData, FirebaseError, UpdateUserDisplayNameVariables>): UseDataConnectMutationResult<UpdateUserDisplayNameData, UpdateUserDisplayNameVariables>;
export function useUpdateUserDisplayName(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateUserDisplayNameData, FirebaseError, UpdateUserDisplayNameVariables>): UseDataConnectMutationResult<UpdateUserDisplayNameData, UpdateUserDisplayNameVariables>;

export function useListCoursesForLanguage(vars: ListCoursesForLanguageVariables, options?: useDataConnectQueryOptions<ListCoursesForLanguageData>): UseDataConnectQueryResult<ListCoursesForLanguageData, ListCoursesForLanguageVariables>;
export function useListCoursesForLanguage(dc: DataConnect, vars: ListCoursesForLanguageVariables, options?: useDataConnectQueryOptions<ListCoursesForLanguageData>): UseDataConnectQueryResult<ListCoursesForLanguageData, ListCoursesForLanguageVariables>;
