import React, { FC } from 'react';

export type InputProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

const Input: FC<InputProps> = (props) => {
  return (
    <div className="mb-3 pt-0">
      <input
        type="text"
        className="px-3 py-3 placeholder-blue-grey-300 text-blueGray-600 relative bg-gray-800 rounded text-sm border-0 shadow outline-none focus:outline-none  focus:ring focus:ring-green-600 w-full"
        {...props}
      />
    </div>
  );
};

export default Input;
