import React, { FC, useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '../components/Button';
import Card from '../components/Card';
import Input from '../components/Input';
import { FullListeningSession, SongRequest } from '../generated/models';
import useSpotifeteApi from '../hooks/useSpotifeteApi';

export interface SessionState {
  session?: FullListeningSession;
  queue: Array<SongRequest>;
}

const Session: FC<any> = () => {
  const [state, setState] = useState<SessionState>({ session: undefined, queue: [] });
  const { sessionsApi } = useSpotifeteApi();
  const navigate = useNavigate();
  const { sessionId } = useParams();

  const getListeningSession = useCallback(
    async (sessionId: string) => {
      try {
        const session = await sessionsApi.getListeningSession({ joinId: sessionId });
        setState((prevState) => ({ ...prevState, session: session }));
      } catch (e) {
        //TODO: typing for error
        if (e.status === 404) {
          navigate('/404');
        }

        //TODO: handle error
      }
    },
    [navigate, sessionsApi]
  );

  const getQueue = useCallback(
    async (sessionId: string) => {
      try {
        const queue = await (await sessionsApi.getSessionQueue({ joinId: sessionId })).queue;
        if (queue) {
          setState((prevState) => ({ ...prevState, queue: queue }));
        }
      } catch (e) {
        console.log(e);
      }
    },
    [sessionsApi]
  );

  useEffect(() => {
    if (!sessionId) {
      navigate.push('/404');
      return;
    }

    getListeningSession(sessionId);
    const intervallId = setInterval(() => getQueue(sessionId), 5000);
    return () => clearInterval(intervallId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const sessionName = state.session?.title;
    if (sessionName) {
      document.title = `Spotifete - ${sessionName}`;
    }
  }, [state.session]);

  const { queue } = state;
  const currentTrack = queue[0];
  const upcomingTrack = queue[1];
  const queuedTracks = queue.filter(
    (track) =>
      track.spotifyTrackId !== currentTrack.spotifyTrackId && track.spotifyTrackId !== upcomingTrack.spotifyTrackId
  );
  console.log(queuedTracks);

  return (
    <div className="flex pt-2 pl-2 w-auto flex-row items-start">
      <div className="flex pt-2 pl-2 flex-1 row items-start">
        <Card className="flex flex-row w-full">
          <div className="flex flex-row w-full">
            <Input></Input>
            <Button label="Suche" onClick={() => console.log('yeah gesucht')}></Button>
          </div>
        </Card>
      </div>
      <div className="flex pt-2 pl-2 flex-1 flex-row items-start overflow-hidden">
        <Card className="flex flex-col">
          <div className="font-bold text-l text-green-500 pb-2">Current Title</div>
          {currentTrack?.trackMetadata ? (
            <>
              <img
                className="md:w-32 mb-auto"
                src={currentTrack.trackMetadata.albumImageThumbnailUrl}
                alt=""
                width="384"
                height="512"
              />
              <div className="flex flex-col pt-2 pl-2 grow-0 shrink-1">
                <div className="flex flex-row pt-2">
                  <div className="font-bold">{`${currentTrack.trackMetadata.artistName} - ${currentTrack.trackMetadata.trackName}`}</div>
                </div>
                <div>{currentTrack.trackMetadata?.albumName}</div>
              </div>
            </>
          ) : (
            <></>
          )}
        </Card>
        <div className="flex flex-col w-full items-start">
          <Card className="flex flex-col ml-3 grow-0 w-full pb-1">
            <div className="font-bold text-l text-green-500 pb-2">Coming up</div>
            {upcomingTrack?.trackMetadata ? (
              <div className="flex flex-row items-start">
                <img className="md:w-14 mt-1 mr-1" src={upcomingTrack.trackMetadata.albumImageThumbnailUrl} alt="" />
                <div className="flex flex-col pl-2 grow-0 mt-auto">
                  <div className="flex flex-row ">
                    <div className="font-bold">{`${upcomingTrack.trackMetadata.artistName} - ${upcomingTrack.trackMetadata.trackName}`}</div>
                  </div>
                  <div>{upcomingTrack.trackMetadata?.albumName}</div>
                </div>
              </div>
            ) : (
              <></>
            )}
          </Card>
          <Card className="flex flex-col ml-3 grow-0 w-full pb-1 mt-1">
            <div className="font-bold text-l text-green-500 pb-2">Queue</div>
            {queuedTracks.map((track) => (
              <div className="flex flex-row items-start mb-1" key={`track_details_${track.spotifyTrackId}`}>
                <img className="md:w-14 mt-1 mr-1" src={track.trackMetadata?.albumImageThumbnailUrl} alt="" />
                <div className="flex flex-col pl-2 grow-0 mt-auto">
                  <div className="flex flex-row ">
                    <div className="font-bold">{`${track.trackMetadata?.artistName} - ${track.trackMetadata?.trackName}`}</div>
                  </div>
                  <div>{track.trackMetadata?.albumName}</div>
                </div>
              </div>
            ))}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Session;
