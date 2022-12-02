import React, { FC } from 'react';

export interface CardProps extends React.HTMLProps<HTMLDivElement> {
  title: string;
}

const Card: FC<CardProps> = (props) => {
  const { title, children } = props;

  return (
    <section className={`flex gap-2 flex-col bg-gray-900  shadow-lg text-white ${props.className}`}>
      <h3 className="mb-2 font-bold text-green-500 text-l">{title}</h3>
      <>{children}</>
    </section>
  );
};

export default Card;
