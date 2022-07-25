import React, { FC } from 'react';

export interface CardProps extends React.HTMLProps<HTMLDivElement> {
  title?: string;
}

const Card: FC<CardProps> = (props) => {
  const { title, children } = props;

  return (
    <div className={`rounded bg-gray-900 overflow-hidden shadow-lg text-white ${props.className}`}>
        {title ? <div className="font-bold text-xl mb-2">{title}</div> : <></>}
      <div className="py-4 px-6 h-full">
        <div className="flex flex-col h-full">{children}</div>
      </div>
    </div>
  );
};

export default Card;
