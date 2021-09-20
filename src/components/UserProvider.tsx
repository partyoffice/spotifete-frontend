import UserContext from '../context/UserContext';
import React, { FC, ReactElement, useReducer } from 'react';
import { userReducer } from '../reducer/UserReducer';

export const UserProvider: FC<{ children: ReactElement }> = ({ children }) => {
  const [userState, dispatchUserState] = useReducer(userReducer, {
    userSession: null,
    isAuthenticated: false,
    user: null,
  });
  return <UserContext.Provider value={{ userState, dispatchUserState }}>{children}</UserContext.Provider>;
};
