import React, { FC } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import { UserProvider } from './components/UserProvider';
import Auth from './views/Auth';
import Error404 from './views/Error404';
import Home from './views/Home';

const App: FC<any> = () => {
  return (
    <UserProvider>
      <Router>
        <div className="h-full w-full flex flex-col">
          <Navbar></Navbar>
          <div className="h-full w-full px-2 py-1 bg-gray-800">
            <Switch>
              <Route path="/sessions"></Route>
              <Route path="/account"></Route>
              <Route path="/auth" component={Auth}></Route>
              <Route exact path="/" component={Home}></Route>
              <Route component={Error404}></Route>
            </Switch>
          </div>
        </div>
      </Router>
    </UserProvider>
  );
};

export default App;
