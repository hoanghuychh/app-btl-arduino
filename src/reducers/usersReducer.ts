'use strict';
import { UsersAction } from 'src/actions/actionTypes';
import { setUser } from 'src/actions/usersActions';
import { User } from 'src/types';
import { createReducer } from 'typesafe-actions';

export interface UsersState {
  user?: User;
}

const initialState: UsersState = {
  user: {},
};

const usersReducer = createReducer<UsersState, UsersAction>(initialState)
  // .handleAction(fetchUserAsync.success, (state, action) => ({...state, user: action.payload}))
  .handleAction(setUser, (state, action) => ({...state, user: action.payload}));

export default usersReducer;
