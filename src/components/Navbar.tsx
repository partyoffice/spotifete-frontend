import React, { FC, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../context/UserContext';
import useAuthentication from '../hooks/useAuthentication';
import { Button } from './Button';

const Navbar: FC<any> = () => {
  const { userState } = useContext(UserContext);
  const { login, logout } = useAuthentication();
  const navigate = useNavigate();

  return (
    <>
      <nav className="flex flex-row justify-center items-center h-full">
        {/*TODO: add shadow on hover*/}
        <div className="cursor-pointer" onClick={() => navigate('')}>
          <span className="text-xl font-semibold tracking-tight text-white text-green-500">Spotifete</span>
        </div>
        <div className="my-auto ml-6 md:flex">
          <a href="#responsive-header" className="block mr-3 text-white hover:text-green-500">
            Sessions
          </a>
          <a href="#responsive-header" className="block mr-3 text-white hover:text-green-500">
            Sessions2
          </a>
          <a href="#responsive-header" className="block mr-3 text-white hover:text-green-500">
            Sessions3
          </a>
        </div>
        <div className="my-auto ml-auto">
          {userState.isAuthenticated ? (
            <Button label="Logout" onClick={logout} />
          ) : (
            <Button label="Login" onClick={login} />
          )}
        </div>
      </nav>
      {/* TODO: Bottom Cirle Menu für Mobile View */}
      <div className="hidden absolute right-0 bottom-0 justify-center items-center mr-3 mb-3 w-14 h-14 bg-gray-900 rounded-full cursor-pointer">
        <div className="flex justify-center items-center my-auto mx-auto h-full">
          <span className="text-xl font-bold text-white">...</span>
        </div>
      </div>
    </>
  );
};

export default Navbar;
