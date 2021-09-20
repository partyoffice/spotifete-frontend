import { useContext, useMemo } from 'react';
import UserContext from '../context/UserContext';
import useSpotifeteApi from './useSpotifeteApi';

const useAuthentication = () => {
  const { userState, dispatchUserState } = useContext(UserContext);
  const { authenticationApi } = useSpotifeteApi();

  const login = useMemo(async () => {
    try {
      const userSession = await authenticationApi.newAuthenticationSession({ redirectTo: '/auth' });
      dispatchUserState({ type: 'LOGIN_ACTION', payload: { userSession: userSession } });
      window.open(userSession.spotifyAuthenticationUrl);
    } catch (e) {
      dispatchUserState({ type: 'LOGOUT_ACTION' });
    }
  }, [authenticationApi, dispatchUserState]);

  const authenticate = useMemo(async () => {
    const spotifeteSessionId = userState.userSession?.spotifeteSessionId;
    if (!spotifeteSessionId) {
      return;
    }

    try {
      const isAuthenticated = await authenticationApi.isSessionAuthenticated({
        sessionId: spotifeteSessionId,
      });

      if (isAuthenticated) {
        dispatchUserState({ type: 'AUTH_ACTION' });
      }
    } catch (e) {
      console.error(`error getting auth status: ${e}`);
    }
  }, [authenticationApi, dispatchUserState, userState.userSession]);

  const logout = useMemo(async () => {
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
