import { User } from 'src/types';
import { createAction, createAsyncAction } from 'typesafe-actions';

export const fetchUserAsync = createAsyncAction(
  ['USER_FETCH', (userID: string) => userID],
  ['USER_FETCH_SUCCESS', (res: User) => res],
  ['USER_FETCH_FAILURE', (err: Error) => err],
  'USER_FETCH_CANCEL',
)();

export const setUser = createAction('USER_SET', (user?: any) => user)();
