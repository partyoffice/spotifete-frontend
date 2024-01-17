import React, { FC, useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Card from '../components/Card';
import Input from '../components/Input';
import { FullListeningSession, SongRequest, TrackMetaData } from 'spotifete-client-sdk';
import useSpotifeteApi from '../hooks/useSpotifeteApi';

export interface SessionState {
  session?: FullListeningSession;
  queue: Array<SongRequest>;
}
function isResponse(response: any): response is Response {
  return response.status !== undefined && response.body !== undefined;
}
const Session: FC<any> = () => {
  const [state, setState] = useState<SessionState>({ session: undefined, queue: [] });
  const [searchTerm, setSearchTerm] = useState<string | undefined>();
  const [searchResult, setSearchResult] = useState<TrackMetaData[]>([]);
  const { sessionsApi } = useSpotifeteApi();
  const navigate = useNavigate();
  const { sessionId } = useParams();
  const username = Date.now().toString(36) + Math.random().toString(36);

  const getListeningSession = useCallback(
    async (sessionId: string) => {
      try {
        const session = await sessionsApi.getListeningSession({ joinId: sessionId });
        setState((prevState) => ({ ...prevState, session: session }));
      } catch (e) {
        if (isResponse(e) && e.status === 404) {
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
        const { queue = [] } = await sessionsApi.getSessionQueue({ joinId: sessionId });
        setState((prevState) => ({ ...prevState, queue: queue }));
      } catch (e) {
        console.log(e);
      }
    },
    [sessionsApi]
  );

  useEffect(() => {
    if (!sessionId) {
      navigate('/404');
      return;
    }

    getListeningSession(sessionId);
    getQueue(sessionId);
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

  const searchTrack = useCallback(
    async (searchTerm: string) => {
      if (!sessionId) {
        return;
      }

      try {
        const { tracks = [] } = (await sessionsApi.searchTrack({ joinId: sessionId, query: searchTerm })) ?? {};
        setSearchResult(tracks);
      } catch (e) {
        console.log(e);
      }
    },
    [sessionsApi, sessionId]
  );

  useEffect(() => {
    if (!searchTerm) {
      setSearchResult([]);
      return;
    }

    const timeoutId = setTimeout(() => {
      searchTrack(searchTerm);
      // make a request after 1 second since there's no typing
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [searchTrack, searchTerm]);

  const handleSearchInput = useCallback((event) => {
    setSearchTerm(event.target.value);
  }, []);

  const handleSearchedTrackClick = useCallback(
    async (track: TrackMetaData) => {
      if (!sessionId || !track.spotifyTrackId) {
        return;
      }

      try {
        await sessionsApi.requestTrack({
          joinId: sessionId,
          requestTrackRequest: { username: username, trackId: track.spotifyTrackId },
        });
        getQueue(sessionId);
      } catch (e) {
        console.log(e);
      }
      setSearchResult([]);
    },
    [sessionsApi, sessionId, username, getQueue]
  );

  const { queue } = state;
  const currentTrack = queue[0];
  const upcomingTrack = queue[1];
  const queuedTracks = queue.filter(
    (track) =>
      track.spotifyTrackId !== currentTrack.spotifyTrackId && track.spotifyTrackId !== upcomingTrack.spotifyTrackId
  );

  return (
    <div className="flex  h-full overflow-hidden py-3 px-2 w-auto flex-row items-start">
      <div className="flex flex-1 row items-start h-full overflow-hidden">
        <Card className="flex flex-col w-full h-full">
          <div className="font-bold text-l text-green-500 pb-2">Search</div>
          <Input onChange={handleSearchInput} />
          <ul className="overflow-y-auto">
            {searchResult.map((track) => (
              <li key={`search_result_${track.spotifyTrackId}`} onClick={() => handleSearchedTrackClick(track)}>
                <div className="flex flex-row items-start mb-1 px-2 cursor-pointer hover:text-green-500">
                  <img className="md:w-14 mt-1 mr-1" src={track.albumImageThumbnailUrl} alt="" />
                  <div className="flex flex-col pl-2 grow-0 mt-auto">
                    <div className="flex flex-row ">
                      <div className="font-bold">{`${track.artistName} - ${track.trackName}`}</div>
                    </div>
                    <div>{track.albumName}</div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </div>
      <div className="flex h-full overflow-hidden pl-2 flex-1 flex-row items-start ">
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
        <div className="flex flex-col h-full w-full items-start overflow-hidden">
          <Card className="flex flex-col ml-3 overflow-visible w-full pb-1">
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
          <Card className="flex flex-col ml-3 grow-0 h-full w-full mt-2">
            <div className="font-bold text-l text-green-500 pb-2">Queue</div>
            <ul className="overflow-y-auto">
              {queuedTracks.map((track) => (
                <li key={`track_details_${track.spotifyTrackId}`}>
                  <div className="flex flex-row items-start mb-1">
                    <img className="md:w-14 mt-1 mr-1" src={track.trackMetadata?.albumImageThumbnailUrl} alt="" />
                    <div className="flex flex-col pl-2 grow-0 mt-auto">
                      <div className="flex flex-row">
                        <div className="font-bold">{`${track.trackMetadata?.artistName} - ${track.trackMetadata?.trackName}`}</div>
                      </div>
                      <div>{track.trackMetadata?.albumName}</div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Session;
