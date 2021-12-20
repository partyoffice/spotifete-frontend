import React, { FC } from 'react';

export interface CardProps extends React.HTMLProps<HTMLDivElement> {
  title?: string;
}

const Card: FC<CardProps> = (props) => {
  const { title, children } = props;
  return (
    <div className="max-w-sm rounded bg-gray-900 overflow-hidden shadow-lg text-white">
      <div className="px-6 py-4">
        {title ? <div className="font-bold text-xl mb-2">{title}</div> : <></>}
        <div className="flex flex-col">{children}</div>
      </div>
    </div>
  );
};

export default Card;
