import React, { FC, ReactElement } from 'react';

export interface CardProps {
  title: string;
  children: ReactElement;
}

const Card: FC<CardProps> = (props) => {
  return (
    <div className="max-w-sm rounded bg-gray-900 overflow-hidden shadow-lg text-white">
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{props.title}</div>
        {props.children}
      </div>
    </div>
  );
};

export default Card;
