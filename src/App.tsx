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
      <div className="overflow-hidden overscroll-none space-y-2 h-screen bg-gray-800">
        <UserProvider>
          <Router>
            <header>
              <Navbar></Navbar>
            </header>
            <main className="mx-2 mb-2">
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
