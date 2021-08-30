import UserContext from '../context/UserContext';
import React, { FC, ReactElement, useReducer } from 'react';
import { userReducer } from '../reducer/UserReducer';

export const UserProvider: FC<{ children: ReactElement }> = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, { username: null });
  return <UserContext.Provider value={{ state, dispatch }}>{children}</UserContext.Provider>;
};
