import { FullListeningSession, SongRequest } from 'spotifete-client-sdk';

export interface SessionSate {
  session?: FullListeningSession;
  currentTrack?: SongRequest;
  upcomingTrack?: SongRequest;
  queuedTracks: SongRequest[];
}
type LoadQueueAction = { type: 'LOAD_QUEUE_ACTION'; payload: { queue: SongRequest[] } };
type LoadSessionAction = { type: 'LOAD_SESSION_ACTION'; payload: { session: FullListeningSession } };
export type SessionAction = LoadQueueAction | LoadSessionAction;

export function sessionReducer(state: SessionSate, action: SessionAction): SessionSate {
  switch (action.type) {
    case 'LOAD_QUEUE_ACTION':
      const {
        queue: [currentTrack, upcomingTrack, ...queuedTracks],
      } = action.payload;
      return { ...state, currentTrack, upcomingTrack, queuedTracks };
    case 'LOAD_SESSION_ACTION':
      const { session } = action.payload;
      return { ...state, session };
    default:
      return state;
  }
}
