import React, { useCallback, useContext, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import UserContext from './context/UserContext';
import { NewAuthenticationSessionResponse } from 'spotifete-client-sdk';
import useAuthentication from './hooks/useAuthentication';
import useCookies from './hooks/useCookies';
import Error404 from './views/Error404';
import Home from './views/Home';
import { Session } from './views/Session';
import { UserProvider } from './components/UserProvider';

export function App() {
  const { dispatchUserState } = useContext(UserContext);
  const { authenticate } = useAuthentication();
  const { getCookie } = useCookies();
  const setUserSessionFromCookie = useCallback(() => {
    const userSession = getCookie<NewAuthenticationSessionResponse>('spotifete-user-session');
    dispatchUserState({ type: 'LOGIN_ACTION', payload: { userSession: userSession } });
  }, [getCookie, dispatchUserState]);

  useEffect(() => {
    setUserSessionFromCookie();
  }, [setUserSessionFromCookie]);

  useEffect(() => {
    authenticate();
  }, [authenticate]);
  return (
    <React.StrictMode>
      <div className="flex overflow-hidden flex-col flex-1 gap-3 items-stretch max-h-full bg-gray-800">
        <UserProvider>
          <Router>
            <header className="flex-1 px-5 bg-gray-900 shrink-0 grow-0 basis-16">
              <Navbar></Navbar>
            </header>
            <main className="flex overflow-scroll flex-wrap flex-grow gap-2 p-5 md:overflow-hidden md:h-4/5">
              <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/sessions/:sessionId" element={<Session />}></Route>
                <Route path="/account"></Route>
                <Route path="*" element={<Error404 />}></Route>
              </Routes>
            </main>
          </Router>
        </UserProvider>
      </div>
    </React.StrictMode>
  );
}
