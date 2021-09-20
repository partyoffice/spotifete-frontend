import React, { Dispatch } from 'react';
import { UserState, UserAction } from '../reducer/UserReducer';

export interface UserContextState {
  userState: UserState;
  dispatchUserState: Dispatch<UserAction>;
}
const UserContext = React.createContext<UserContextState>({
  userState: { userSession: null, isAuthenticated: false, user: null },
  dispatchUserState: () => ({}),
});
export default UserContext;
