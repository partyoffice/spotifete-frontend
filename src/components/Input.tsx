import React, { FC } from 'react';

export interface InputProps {
  placeholder: string;
}

const Input: FC<InputProps> = (props) => {
  return (
    <div className="mb-3 pt-0">
      <input
        type="text"
        placeholder={props.placeholder}
        className="px-3 py-3 placeholder-blue-grey-300 text-blueGray-600 relative bg-white bg-gray-800 rounded text-sm border-0 shadow outline-none focus:outline-none  focus:ring focus:ring-green-600 w-full"
      />
    </div>
  );
};

export default Input;
