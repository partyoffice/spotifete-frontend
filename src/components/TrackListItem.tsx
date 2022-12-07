import { useCallback } from 'react';
import { TrackMetaData } from 'spotifete-client-sdk';

export interface TrackListItemProps {
  track: TrackMetaData;
  onSelectTrack?: (track: TrackMetaData) => void;
  className?: string;
}
export function TrackListItem({ track, onSelectTrack = () => undefined, className = '' }: TrackListItemProps) {
  const onSelect = useCallback(() => onSelectTrack(track), [onSelectTrack, track]);
  return (
    <li
      className={`basis-20 grow-0 p-2 shrink-0 flex flex-row even:bg-gray-800 gap-3 items-center bg-gray-900 cursor-pointer text-slate-300 ${className}`}
      onClick={onSelect}
    >
      <img className="w-14 h-14" src={track.albumImageThumbnailUrl} alt="" />
      <hgroup className="flex flex-col gap-1">
        <h2 className="font-bold break-normal">{`${track.artistName} - ${track.trackName}`}</h2>
        <h3>{track.albumName}</h3>
      </hgroup>
    </li>
  );
}
