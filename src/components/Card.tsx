import React, { FC } from 'react';

export interface CardProps extends React.HTMLProps<HTMLDivElement> {
  title: string;
}

const Card: FC<CardProps> = (props) => {
  const { title, children } = props;

  return (
    <section
      className={`flex flex-col flex-wrap h-full rounded p-2 bg-gray-900  shadow-lg text-white ${props.className}`}
    >
      <h3 className="mb-2 font-bold text-green-500 text-l">{title}</h3>
      <div className="flex flex-col h-full grow">{children}</div>
    </section>
  );
};

export default Card;
