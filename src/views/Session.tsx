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
    <>
      <Card title="Search" className="flex flex-col flex-1 items-stretch self-start md:max-h-full basis-64">
        <InputWithPreview
          onInputChange={handleSearchInput}
          onSelectTrack={handleSearchedTrackClick}
          tracks={searchResult}
        />
      </Card>
      <Card title="Current Title" className="flex-wrap flex-grow self-start max-w-sm basis-64">
        {currentTrack?.trackMetadata ? (
          <section className="flex flex-row flex-grow gap-2 justify-between">
            <img className="" src={currentTrack.trackMetadata.albumImageThumbnailUrl} alt="" width="128" height="128" />
            <hgroup className="flex flex-col gap-1">
              <h2 className="font-bold">{`${currentTrack.trackMetadata.artistName} - ${currentTrack.trackMetadata.trackName}`}</h2>
              <h3>{currentTrack.trackMetadata?.albumName}</h3>
            </hgroup>
          </section>
        ) : (
          <></>
        )}
      </Card>
      <div className="flex flex-col flex-grow gap-2 md:max-h-full basis-64">
        <Card title="Coming Up" className="flex flex-grow">
          {upcomingTrack?.trackMetadata ? <TrackListItem track={upcomingTrack.trackMetadata} /> : <></>}
        </Card>
        <Card title="Queue" className="flex flex-grow self-start md:h-4/5">
          <ul className="flex overflow-scroll flex-col flex-1 flex-grow gap-2">
            {queuedTracks.map(
              ({ spotifyTrackId, trackMetadata = { artistName: 'Unbekannt', albumName: 'Unbekannt' } }) => (
                <TrackListItem track={trackMetadata} key={`queued_track_${spotifyTrackId}`} />
              )
            )}
          </ul>
        </Card>
      </div>
    </>
  );
}
