import React, { Dispatch } from 'react';
import { UserState, UserAction } from '../reducer/UserReducer';
export interface UserContextState {
  state: UserState;
  dispatch: Dispatch<UserAction>;
}
const UserContext = React.createContext<UserContextState>({
  state: { username: null },
  dispatch: () => ({}),
});
export default UserContext;
