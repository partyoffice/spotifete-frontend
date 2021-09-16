import React, { FC } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Error404 from './views/Error404';

const App: FC<any> = () => {
  return (
    <Router>
      <div className="h-full w-full flex flex-col">
        <Navbar></Navbar>
        <div className="h-full w-full px-2 py-1 bg-gray-800">
          <Switch>
            <Route path="/sessions"></Route>
            <Route path="/account"></Route>
            <Route exact path="/"></Route>
            <Route component={Error404}></Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
