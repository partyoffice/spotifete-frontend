import { useContext, useMemo } from 'react';
import UserContext from '../context/UserContext';
import { AuthenticationApi, Configuration } from '../generated';

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

  return { authenticationApi };
};

export default useSpotifeteApi;
