import { useContext, useMemo } from 'react';
import { AuthenticationApi, Configuration, ListeningSessionApi } from 'spotifete-client-sdk';
import UserContext from '../context/UserContext';

const useSpotifeteApi = () => {
  const { userState } = useContext(UserContext);

  const apiConfig = useMemo(() => {
    return new Configuration({
      basePath: 'https://spotifete.nikos410.de',
      accessToken: userState.userSession?.spotifeteSessionId,
    });
  }, [userState.userSession]);

  const authenticationApi = useMemo(() => {
    return new AuthenticationApi(apiConfig);
  }, [apiConfig]);

  const sessionsApi = useMemo(() => {
    return new ListeningSessionApi(apiConfig);
  }, [apiConfig]);

  return { authenticationApi, sessionsApi };
};

export default useSpotifeteApi;
