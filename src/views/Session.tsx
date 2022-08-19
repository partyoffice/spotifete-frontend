import { FC, useCallback, useEffect, useReducer, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Card from '../components/Card';
import Input from '../components/Input';
import { ListeningSessionApi, TrackMetaData } from 'spotifete-client-sdk';
import useSpotifeteApi from '../hooks/useSpotifeteApi';
import { sessionReducer } from '../reducer/SessionReducer';
import { InputWithPreview } from '../components/InputWithPreview';
import { TrackListItem } from '../components/TrackListItem';

function isResponse(response: any): response is Response {
  return response.status !== undefined && response.body !== undefined;
}
function useSongSearch(sessionsApi: ListeningSessionApi, refresh: (sessionId: string) => void, sessionId?: string) {
  const [searchTerm, setSearchTerm] = useState<string | undefined>();
  const [searchResult, setSearchResult] = useState<TrackMetaData[]>([]);
  const username = Date.now().toString(36) + Math.random().toString(36);

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
  const handleSearchInput = useCallback((query: string) => {
    setSearchTerm(query);
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
        refresh(sessionId);
      } catch (e) {
        console.log(e);
      }
      setSearchResult([]);
    },
    [sessionsApi, sessionId, username, refresh]
  );
  return { handleSearchInput, handleSearchedTrackClick, searchResult };
}
export function Session() {
  const [{ session, queuedTracks, upcomingTrack, currentTrack }, dispatch] = useReducer(sessionReducer, {
    queuedTracks: [],
  });
  const { sessionsApi } = useSpotifeteApi();
  const navigate = useNavigate();
  const { sessionId } = useParams();

  const getListeningSession = useCallback(
    async (sessionId: string) => {
      try {
        const session = await sessionsApi.getListeningSession({ joinId: sessionId });
        dispatch({ type: 'LOAD_SESSION_ACTION', payload: { session } });
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
        dispatch({ type: 'LOAD_QUEUE_ACTION', payload: { queue } });
      } catch (e) {
        console.log(e);
      }
    },
    [sessionsApi]
  );
  const { searchResult, handleSearchInput, handleSearchedTrackClick } = useSongSearch(
    sessionsApi,
    (sessionId) => {
      getQueue(sessionId);
    },
    sessionId
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
    const sessionName = session?.title;
    if (sessionName) {
      document.title = `Spotifete - ${sessionName}`;
    }
  }, [session]);

  return (
    <div className="flex relative flex-col items-start space-y-2 w-auto h-full md:flex-row md:space-y-0 md:space-x-2">
      <Card title="Search" className="flex w-1/2 min-h-0 grow">
        <InputWithPreview
          onInputChange={handleSearchInput}
          onSelectTrack={handleSearchedTrackClick}
          tracks={searchResult}
        />
      </Card>
      <Card title="Current Title">
        {currentTrack?.trackMetadata ? (
          <>
            <img
              className="mb-auto md:w-32"
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
      <div>
        <Card title="Coming Up">
          {upcomingTrack?.trackMetadata ? <TrackListItem track={upcomingTrack.trackMetadata} /> : <></>}
        </Card>
        <Card title="Queue" className="flex w-full min-h-0 grow">
          <section className="flex overflow-hidden relative flex-col w-full min-h-0 max-h-[65vh] grow">
            <ul className="flex overflow-scroll static bottom-0 left-0 flex-col p-1 mt-2 space-y-2 w-full min-h-0 grow">
              {queuedTracks.map(
                ({ spotifyTrackId, trackMetadata = { artistName: 'Unbekannt', albumName: 'Unbekannt' } }) => (
                  <TrackListItem track={trackMetadata} key={`queued_track_${spotifyTrackId}`} />
                )
              )}
            </ul>
          </section>
        </Card>
      </div>
    </div>
  );
}
