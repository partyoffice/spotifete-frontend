import React, { FC } from 'react';

export interface CardProps extends React.HTMLProps<HTMLDivElement> {
  title?: string;
}

const Card: FC<CardProps> = (props) => {
  const { title, children } = props;

  return (
    <div className={`rounded bg-gray-900 overflow-hidden shadow-lg text-white ${props.className}`}>
      <div className="py-4 px-6 h-full">
        {title ? <div className="mb-2 text-xl font-bold">{title}</div> : <></>}
        <div className="flex flex-col h-full">{children}</div>
      </div>
    </div>
  );
};

export default Card;
