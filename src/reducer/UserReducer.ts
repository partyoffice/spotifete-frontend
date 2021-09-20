import { FullUser, NewAuthenticationSessionResponse } from '../generated';

export interface UserState {
  userSession: NewAuthenticationSessionResponse | null;
  isAuthenticated: boolean;
  user: FullUser | null;
}
type LoginAction = { type: 'LOGIN_ACTION'; payload: { userSession: NewAuthenticationSessionResponse } };
type AuthAction = { type: 'AUTH_ACTION' };
type UserDetailsAction = { type: 'USER_DETAILS_ACTION'; payload: { user: FullUser } };
type LogoutAction = { type: 'LOGOUT_ACTION' };
export type UserAction = LoginAction | LogoutAction | UserDetailsAction | AuthAction;

export function userReducer(state: UserState, action: UserAction): UserState {
  switch (action.type) {
    case 'LOGIN_ACTION':
      const { userSession } = action.payload;
      return { ...state, userSession: userSession };
    case 'AUTH_ACTION':
      return { ...state, isAuthenticated: true };
    case 'USER_DETAILS_ACTION':
      const { user } = action.payload;
      return { ...state, user: user };
    case 'LOGOUT_ACTION':
      return { ...state, userSession: null, user: null, isAuthenticated: false };
    default:
      throw new Error('Illegale state action');
  }
}
