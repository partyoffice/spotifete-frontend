import { useCallback, useContext } from 'react';
import UserContext from '../context/UserContext';
import useSpotifeteApi from './useSpotifeteApi';

type AuthenticationCallback = (isAuthenticated: boolean) => void;

const useAuthentication = () => {
  const { userState, dispatchUserState } = useContext(UserContext);
  const { authenticationApi } = useSpotifeteApi();

  const login = useCallback(async () => {
    try {
      const userSession = await authenticationApi.newAuthenticationSession({ redirectTo: '/auth' });
      dispatchUserState({ type: 'LOGIN_ACTION', payload: { userSession: userSession } });
      window.open(userSession.spotifyAuthenticationUrl);
    } catch (e) {
      dispatchUserState({ type: 'LOGOUT_ACTION' });
    }
  }, [authenticationApi, dispatchUserState]);

  const authenticate = useCallback(
    async (callback: AuthenticationCallback) => {
      const spotifeteSessionId = userState.userSession?.spotifeteSessionId;
      if (!spotifeteSessionId) {
        return;
      }

      try {
        const isAuthenticated = (
          await authenticationApi.isSessionAuthenticated({
            sessionId: spotifeteSessionId,
          })
        ).authenticated;

        if (isAuthenticated) {
          dispatchUserState({ type: 'AUTH_ACTION' });
        }
        callback(isAuthenticated);
      } catch (e) {
        console.error(`error getting auth status: ${e}`);
      }
    },
    [authenticationApi, dispatchUserState, userState.userSession]
  );

  const logout = useCallback(async () => {
    const spotifeteSessionId = userState.userSession?.spotifeteSessionId;
    if (!spotifeteSessionId) {
      return;
    }

    try {
      await authenticationApi.invalidateAuthenticationSession({ sessionId: spotifeteSessionId });
      dispatchUserState({ type: 'LOGOUT_ACTION' });
    } catch (e) {
      console.error(`error logging out/invaliding suer session: ${e}`);
    }
  }, [authenticationApi, dispatchUserState, userState.userSession]);

  return { login, authenticate, logout };
};

export default useAuthentication;
