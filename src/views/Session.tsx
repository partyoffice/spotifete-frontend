import React, { FC, useCallback, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { FullListeningSession } from '../generated/models';
import useSpotifeteApi from '../hooks/useSpotifeteApi';

export interface SessionState {
  session?: FullListeningSession;
}

const Session: FC<any> = () => {
  const [state, setState] = useState<SessionState>({ session: undefined });
  const { sessionsApi } = useSpotifeteApi();
  const history = useHistory();
  const { sessionId } = useParams();

  const getListeningSession = useCallback(
    async (sessionId: string) => {
      try {
        const session = await sessionsApi.getListeningSession({ joinId: sessionId });
        setState((prevState) => ({ ...prevState, session: session }));
      } catch (e) {
        //TODO: typing for error
        if (e.status === 404) {
          history.push('/404');
        }

        //TODO: handle error
      }
    },
    [setState]
  );

  useEffect(() => {
    getListeningSession(sessionId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const sessionName = state.session?.title;
    if (sessionName) {
      document.title = `Spotifete - ${sessionName}`;
    }
  }, [state]);

  return <></>;
};

export default Session;
