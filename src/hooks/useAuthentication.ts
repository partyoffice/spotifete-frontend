import { useCallback, useContext } from 'react';
import UserContext from '../context/UserContext';
import useCookies from './useCookies';
import useSpotifeteApi from './useSpotifeteApi';

const useAuthentication = () => {
  const { userState, dispatchUserState } = useContext(UserContext);
  const { authenticationApi } = useSpotifeteApi();
  const { setCookie, removeCookie } = useCookies();

  const login = useCallback(async () => {
    try {
      const userSession = await authenticationApi.newAuthenticationSession({
        redirectTo: '/',
      });
      dispatchUserState({ type: 'LOGIN_ACTION', payload: { userSession: userSession } });
      setCookie('spotifete-user-session', userSession);
      window.open(userSession.spotifyAuthenticationUrl, '_self');
    } catch (e) {
      dispatchUserState({ type: 'LOGOUT_ACTION' });
    }
  }, [authenticationApi, dispatchUserState, setCookie]);

  const authenticate = useCallback(async () => {
    try {
      const spotifeteSessionId = userState.userSession?.spotifeteSessionId;
      if (!spotifeteSessionId) {
        return;
      }

      const isAuthenticated = (
        await authenticationApi.isSessionAuthenticated({
          sessionId: spotifeteSessionId,
        })
      ).authenticated;

      if (isAuthenticated) {
        dispatchUserState({ type: 'AUTH_ACTION' });
      }
    } catch (e) {
      console.error(`error getting auth status: `, e);
    }
  }, [authenticationApi, dispatchUserState, userState.userSession]);

  const logout = useCallback(async () => {
    const spotifeteSessionId = userState.userSession?.spotifeteSessionId;
    if (!spotifeteSessionId) {
      return;
    }

    try {
      await authenticationApi.invalidateAuthenticationSession({ sessionId: spotifeteSessionId });
      dispatchUserState({ type: 'LOGOUT_ACTION' });
      removeCookie('spotifete-user-session');
    } catch (e) {
      console.error(`error logging out/invaliding suer session: ${e}`);
    }
  }, [authenticationApi, dispatchUserState, userState.userSession, removeCookie]);

  return { login, authenticate, logout };
};

export default useAuthentication;
