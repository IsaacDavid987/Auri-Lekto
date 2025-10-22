# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `example`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

**If you're looking for the `React README`, you can find it at [`dataconnect-generated/react/README.md`](./react/README.md)**

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*GetUserByUsername*](#getuserbyusername)
  - [*ListCoursesForLanguage*](#listcoursesforlanguage)
- [**Mutations**](#mutations)
  - [*CreateNewUser*](#createnewuser)
  - [*UpdateUserDisplayName*](#updateuserdisplayname)

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `example`. You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

You can use this generated SDK by importing from the package `@dataconnect/generated` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```typescript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) from your generated SDK.

# Queries

There are two ways to execute a Data Connect Query using the generated Web SDK:
- Using a Query Reference function, which returns a `QueryRef`
  - The `QueryRef` can be used as an argument to `executeQuery()`, which will execute the Query and return a `QueryPromise`
- Using an action shortcut function, which returns a `QueryPromise`
  - Calling the action shortcut function will execute the Query and return a `QueryPromise`

The following is true for both the action shortcut function and the `QueryRef` function:
- The `QueryPromise` returned will resolve to the result of the Query once it has finished executing
- If the Query accepts arguments, both the action shortcut function and the `QueryRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Query
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## GetUserByUsername
You can execute the `GetUserByUsername` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getUserByUsername(vars: GetUserByUsernameVariables): QueryPromise<GetUserByUsernameData, GetUserByUsernameVariables>;

interface GetUserByUsernameRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetUserByUsernameVariables): QueryRef<GetUserByUsernameData, GetUserByUsernameVariables>;
}
export const getUserByUsernameRef: GetUserByUsernameRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getUserByUsername(dc: DataConnect, vars: GetUserByUsernameVariables): QueryPromise<GetUserByUsernameData, GetUserByUsernameVariables>;

interface GetUserByUsernameRef {
  ...
  (dc: DataConnect, vars: GetUserByUsernameVariables): QueryRef<GetUserByUsernameData, GetUserByUsernameVariables>;
}
export const getUserByUsernameRef: GetUserByUsernameRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getUserByUsernameRef:
```typescript
const name = getUserByUsernameRef.operationName;
console.log(name);
```

### Variables
The `GetUserByUsername` query requires an argument of type `GetUserByUsernameVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetUserByUsernameVariables {
  username: string;
}
```
### Return Type
Recall that executing the `GetUserByUsername` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetUserByUsernameData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetUserByUsernameData {
  users: ({
    id: UUIDString;
    email: string;
    username: string;
    displayName?: string | null;
    profilePictureUrl?: string | null;
  } & User_Key)[];
}
```
### Using `GetUserByUsername`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getUserByUsername, GetUserByUsernameVariables } from '@dataconnect/generated';

// The `GetUserByUsername` query requires an argument of type `GetUserByUsernameVariables`:
const getUserByUsernameVars: GetUserByUsernameVariables = {
  username: ..., 
};

// Call the `getUserByUsername()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getUserByUsername(getUserByUsernameVars);
// Variables can be defined inline as well.
const { data } = await getUserByUsername({ username: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getUserByUsername(dataConnect, getUserByUsernameVars);

console.log(data.users);

// Or, you can use the `Promise` API.
getUserByUsername(getUserByUsernameVars).then((response) => {
  const data = response.data;
  console.log(data.users);
});
```

### Using `GetUserByUsername`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getUserByUsernameRef, GetUserByUsernameVariables } from '@dataconnect/generated';

// The `GetUserByUsername` query requires an argument of type `GetUserByUsernameVariables`:
const getUserByUsernameVars: GetUserByUsernameVariables = {
  username: ..., 
};

// Call the `getUserByUsernameRef()` function to get a reference to the query.
const ref = getUserByUsernameRef(getUserByUsernameVars);
// Variables can be defined inline as well.
const ref = getUserByUsernameRef({ username: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getUserByUsernameRef(dataConnect, getUserByUsernameVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.users);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.users);
});
```

## ListCoursesForLanguage
You can execute the `ListCoursesForLanguage` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listCoursesForLanguage(vars: ListCoursesForLanguageVariables): QueryPromise<ListCoursesForLanguageData, ListCoursesForLanguageVariables>;

interface ListCoursesForLanguageRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListCoursesForLanguageVariables): QueryRef<ListCoursesForLanguageData, ListCoursesForLanguageVariables>;
}
export const listCoursesForLanguageRef: ListCoursesForLanguageRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listCoursesForLanguage(dc: DataConnect, vars: ListCoursesForLanguageVariables): QueryPromise<ListCoursesForLanguageData, ListCoursesForLanguageVariables>;

interface ListCoursesForLanguageRef {
  ...
  (dc: DataConnect, vars: ListCoursesForLanguageVariables): QueryRef<ListCoursesForLanguageData, ListCoursesForLanguageVariables>;
}
export const listCoursesForLanguageRef: ListCoursesForLanguageRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listCoursesForLanguageRef:
```typescript
const name = listCoursesForLanguageRef.operationName;
console.log(name);
```

### Variables
The `ListCoursesForLanguage` query requires an argument of type `ListCoursesForLanguageVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListCoursesForLanguageVariables {
  languageId: UUIDString;
}
```
### Return Type
Recall that executing the `ListCoursesForLanguage` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListCoursesForLanguageData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListCoursesForLanguageData {
  courses: ({
    id: UUIDString;
    title: string;
    description: string;
    imageUrl?: string | null;
    level: string;
  } & Course_Key)[];
}
```
### Using `ListCoursesForLanguage`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listCoursesForLanguage, ListCoursesForLanguageVariables } from '@dataconnect/generated';

// The `ListCoursesForLanguage` query requires an argument of type `ListCoursesForLanguageVariables`:
const listCoursesForLanguageVars: ListCoursesForLanguageVariables = {
  languageId: ..., 
};

// Call the `listCoursesForLanguage()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listCoursesForLanguage(listCoursesForLanguageVars);
// Variables can be defined inline as well.
const { data } = await listCoursesForLanguage({ languageId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listCoursesForLanguage(dataConnect, listCoursesForLanguageVars);

console.log(data.courses);

// Or, you can use the `Promise` API.
listCoursesForLanguage(listCoursesForLanguageVars).then((response) => {
  const data = response.data;
  console.log(data.courses);
});
```

### Using `ListCoursesForLanguage`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listCoursesForLanguageRef, ListCoursesForLanguageVariables } from '@dataconnect/generated';

// The `ListCoursesForLanguage` query requires an argument of type `ListCoursesForLanguageVariables`:
const listCoursesForLanguageVars: ListCoursesForLanguageVariables = {
  languageId: ..., 
};

// Call the `listCoursesForLanguageRef()` function to get a reference to the query.
const ref = listCoursesForLanguageRef(listCoursesForLanguageVars);
// Variables can be defined inline as well.
const ref = listCoursesForLanguageRef({ languageId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listCoursesForLanguageRef(dataConnect, listCoursesForLanguageVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.courses);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.courses);
});
```

# Mutations

There are two ways to execute a Data Connect Mutation using the generated Web SDK:
- Using a Mutation Reference function, which returns a `MutationRef`
  - The `MutationRef` can be used as an argument to `executeMutation()`, which will execute the Mutation and return a `MutationPromise`
- Using an action shortcut function, which returns a `MutationPromise`
  - Calling the action shortcut function will execute the Mutation and return a `MutationPromise`

The following is true for both the action shortcut function and the `MutationRef` function:
- The `MutationPromise` returned will resolve to the result of the Mutation once it has finished executing
- If the Mutation accepts arguments, both the action shortcut function and the `MutationRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Mutation
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

## CreateNewUser
You can execute the `CreateNewUser` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createNewUser(vars: CreateNewUserVariables): MutationPromise<CreateNewUserData, CreateNewUserVariables>;

interface CreateNewUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateNewUserVariables): MutationRef<CreateNewUserData, CreateNewUserVariables>;
}
export const createNewUserRef: CreateNewUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createNewUser(dc: DataConnect, vars: CreateNewUserVariables): MutationPromise<CreateNewUserData, CreateNewUserVariables>;

interface CreateNewUserRef {
  ...
  (dc: DataConnect, vars: CreateNewUserVariables): MutationRef<CreateNewUserData, CreateNewUserVariables>;
}
export const createNewUserRef: CreateNewUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createNewUserRef:
```typescript
const name = createNewUserRef.operationName;
console.log(name);
```

### Variables
The `CreateNewUser` mutation requires an argument of type `CreateNewUserVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateNewUserVariables {
  email: string;
  passwordHash: string;
  username: string;
  createdAt: TimestampString;
}
```
### Return Type
Recall that executing the `CreateNewUser` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateNewUserData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateNewUserData {
  user_insert: User_Key;
}
```
### Using `CreateNewUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createNewUser, CreateNewUserVariables } from '@dataconnect/generated';

// The `CreateNewUser` mutation requires an argument of type `CreateNewUserVariables`:
const createNewUserVars: CreateNewUserVariables = {
  email: ..., 
  passwordHash: ..., 
  username: ..., 
  createdAt: ..., 
};

// Call the `createNewUser()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createNewUser(createNewUserVars);
// Variables can be defined inline as well.
const { data } = await createNewUser({ email: ..., passwordHash: ..., username: ..., createdAt: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createNewUser(dataConnect, createNewUserVars);

console.log(data.user_insert);

// Or, you can use the `Promise` API.
createNewUser(createNewUserVars).then((response) => {
  const data = response.data;
  console.log(data.user_insert);
});
```

### Using `CreateNewUser`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createNewUserRef, CreateNewUserVariables } from '@dataconnect/generated';

// The `CreateNewUser` mutation requires an argument of type `CreateNewUserVariables`:
const createNewUserVars: CreateNewUserVariables = {
  email: ..., 
  passwordHash: ..., 
  username: ..., 
  createdAt: ..., 
};

// Call the `createNewUserRef()` function to get a reference to the mutation.
const ref = createNewUserRef(createNewUserVars);
// Variables can be defined inline as well.
const ref = createNewUserRef({ email: ..., passwordHash: ..., username: ..., createdAt: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createNewUserRef(dataConnect, createNewUserVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.user_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.user_insert);
});
```

## UpdateUserDisplayName
You can execute the `UpdateUserDisplayName` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateUserDisplayName(vars: UpdateUserDisplayNameVariables): MutationPromise<UpdateUserDisplayNameData, UpdateUserDisplayNameVariables>;

interface UpdateUserDisplayNameRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateUserDisplayNameVariables): MutationRef<UpdateUserDisplayNameData, UpdateUserDisplayNameVariables>;
}
export const updateUserDisplayNameRef: UpdateUserDisplayNameRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateUserDisplayName(dc: DataConnect, vars: UpdateUserDisplayNameVariables): MutationPromise<UpdateUserDisplayNameData, UpdateUserDisplayNameVariables>;

interface UpdateUserDisplayNameRef {
  ...
  (dc: DataConnect, vars: UpdateUserDisplayNameVariables): MutationRef<UpdateUserDisplayNameData, UpdateUserDisplayNameVariables>;
}
export const updateUserDisplayNameRef: UpdateUserDisplayNameRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateUserDisplayNameRef:
```typescript
const name = updateUserDisplayNameRef.operationName;
console.log(name);
```

### Variables
The `UpdateUserDisplayName` mutation requires an argument of type `UpdateUserDisplayNameVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateUserDisplayNameVariables {
  id: UUIDString;
  displayName: string;
}
```
### Return Type
Recall that executing the `UpdateUserDisplayName` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateUserDisplayNameData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateUserDisplayNameData {
  user_update?: User_Key | null;
}
```
### Using `UpdateUserDisplayName`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateUserDisplayName, UpdateUserDisplayNameVariables } from '@dataconnect/generated';

// The `UpdateUserDisplayName` mutation requires an argument of type `UpdateUserDisplayNameVariables`:
const updateUserDisplayNameVars: UpdateUserDisplayNameVariables = {
  id: ..., 
  displayName: ..., 
};

// Call the `updateUserDisplayName()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateUserDisplayName(updateUserDisplayNameVars);
// Variables can be defined inline as well.
const { data } = await updateUserDisplayName({ id: ..., displayName: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateUserDisplayName(dataConnect, updateUserDisplayNameVars);

console.log(data.user_update);

// Or, you can use the `Promise` API.
updateUserDisplayName(updateUserDisplayNameVars).then((response) => {
  const data = response.data;
  console.log(data.user_update);
});
```

### Using `UpdateUserDisplayName`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateUserDisplayNameRef, UpdateUserDisplayNameVariables } from '@dataconnect/generated';

// The `UpdateUserDisplayName` mutation requires an argument of type `UpdateUserDisplayNameVariables`:
const updateUserDisplayNameVars: UpdateUserDisplayNameVariables = {
  id: ..., 
  displayName: ..., 
};

// Call the `updateUserDisplayNameRef()` function to get a reference to the mutation.
const ref = updateUserDisplayNameRef(updateUserDisplayNameVars);
// Variables can be defined inline as well.
const ref = updateUserDisplayNameRef({ id: ..., displayName: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateUserDisplayNameRef(dataConnect, updateUserDisplayNameVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.user_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.user_update);
});
```

