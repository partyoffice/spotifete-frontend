import React, { FC } from 'react';

export type InputProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

const Input: FC<InputProps> = (props) => {
  return (
    <div className="pt-0 mb-3">
      <input
        type="text"
        className="relative py-3 px-3 w-full text-sm bg-gray-800 rounded border-0 shadow outline-none focus:ring focus:ring-green-600 focus:outline-none placeholder-blue-grey-300 text-blueGray-600"
        {...props}
      />
    </div>
  );
};

export default Input;
