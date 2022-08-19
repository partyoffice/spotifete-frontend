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
      className={`flex flex-row items-start space-x-2 bg-gray-900 cursor-pointer text-slate-300 ${className}`}
      onClick={onSelect}
    >
      <img className="w-14 h-14" src={track.albumImageThumbnailUrl} alt="" />
      <hgroup className="flex flex-col">
        <h2 className="font-bold truncate">{`${track.artistName} - ${track.trackName}`}</h2>
        <h3>{track.albumName}</h3>
      </hgroup>
    </li>
  );
}
