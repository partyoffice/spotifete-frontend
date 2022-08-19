import { TrackMetaData } from 'spotifete-client-sdk';
import { TrackListItem } from './TrackListItem';
export interface InputWithPreviewProps {
  onInputChange: (input: string) => void;
  onSelectTrack: (track: TrackMetaData) => void;
  tracks: TrackMetaData[];
}
export function InputWithPreview({ tracks, onSelectTrack, onInputChange }: InputWithPreviewProps) {
  return (
    <div className="flex overflow-hidden relative flex-col w-full min-h-0 max-h-[75vh] grow">
      <input
        onChange={(event) => onInputChange(event.target.value)}
        className="static p-3 m-1 text-sm text-white bg-gray-800 rounded shadow outline-none focus:border-current focus:ring focus:ring-green-600 focus:outline-none placeholder-slate-300"
        placeholder="Title, Artist, Album..."
      />
      <ul className="flex overflow-scroll overflow-x-hidden static bottom-0 left-0 flex-col p-1 mt-2 space-y-2 w-full h-full min-h-0 grow">
        {tracks.map((track) => (
          <TrackListItem
            onSelectTrack={onSelectTrack}
            track={track}
            key={`search_result_${track.spotifyTrackId}`}
            className="hover:text-green-500"
          />
        ))}
      </ul>
    </div>
  );
}
