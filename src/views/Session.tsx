import React, { FC, useCallback, useEffect } from 'react';
import { useParams } from 'react-router';
import { FullListeningSession } from '../generated/models';
import useSpotifeteApi from '../hooks/useSpotifeteApi';

const Session: FC<any> = () => {
  const { sessionsApi } = useSpotifeteApi();
  const { sessionId } = useParams();

  const getListeningSession = useCallback(async (sessionId: string) => {
    try {
      const listeningSession: FullListeningSession = await sessionsApi.getListeningSession({ joinId: sessionId });
      console.log(listeningSession);
    } catch (e) {}
  }, []);

  useEffect(() => {
    getListeningSession(sessionId);
  }, []);

  return <></>;
};

export default Session;
