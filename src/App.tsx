import React, { FC, useCallback, useContext, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import UserContext from './context/UserContext';
import { NewAuthenticationSessionResponse } from './generated';
import useAuthentication from './hooks/useAuthentication';
import useCookies from './hooks/useCookies';
import Error404 from './views/Error404';
import Home from './views/Home';
import Session from './views/Session';

const App: FC<any> = () => {
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
    <Router>
      <div className="h-screen w-screen flex flex-col">
        <Navbar></Navbar>
        <div className="h-screen w-screen px-2 py-1 bg-gray-800">
          <Switch>
            <Route path="/sessions/:sessionId" component={Session}></Route>
            <Route path="/account"></Route>
            <Route exact path="/" component={Home}></Route>
            <Route component={Error404}></Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
