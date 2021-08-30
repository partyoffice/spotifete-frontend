export interface UserState {
  username: string | null;
}
type LoginAction = { type: 'LOGIN_ACTION'; payload: { username: string } };
type LogoutAction = { type: 'LOGOUT_ACTION' };
export type UserAction = LoginAction | LogoutAction;

export function userReducer(state: UserState, action: UserAction): UserState {
  switch (action.type) {
    case 'LOGIN_ACTION':
      const { username } = action.payload;
      return { ...state, username };
    case 'LOGOUT_ACTION':
      return { ...state, username: null };
    default:
      throw new Error('Illegale state action');
  }
}
