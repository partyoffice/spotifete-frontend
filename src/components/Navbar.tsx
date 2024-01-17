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
    <div>
      <nav className="bg-gray-900 h-14 py-3 px-2 flex tracking-tight">
        {/*TODO: add shadow on hover*/}
        <div className="my-auto cursor-pointer" onClick={() => navigate('')}>
          <span className="font-semibold text-2xl tracking-tight text-green-500 ">Spotifete</span>
        </div>
        <div className="hidden md:flex ml-6 my-auto">
          <a href="#responsive-header" className="block text-white hover:text-green-500 mr-3">
            Sessions
          </a>
          <a href="#responsive-header" className="block text-white hover:text-green-500 mr-3">
            Sessions2
          </a>
          <a href="#responsive-header" className="block text-white hover:text-green-500 mr-3">
            Sessions3
          </a>
        </div>
        <div className="ml-auto my-auto">
          {userState.isAuthenticated ? (
            <Button label="Logout" onClick={logout} />
          ) : (
            <Button label="Login" onClick={login} />
          )}
        </div>
      </nav>
      {/* TODO: Bottom Cirle Menu für Mobile View */}
      <div className="hidden absolute bottom-0 right-0 h-14 w-14 mb-3 mr-3 cursor-pointer rounded-full items-center justify-center bg-gray-900">
        <div className="my-auto mx-auto h-full flex items-center justify-center">
          <span className="text-white font-bold text-xl ">...</span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
