import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Simplex from './Components/Simplex/Simplex';
import Home from './Components/Home';
import MainLayout from './Components/MainLayout';

function App() {
  return (
    <Router>
    <MainLayout>
        <Switch>
          <Route exact path="/"
            render={(props) => <Home
            />} />
          <Route exact path="/simplex"
            render={(props) => <Simplex
            />} />
        </Switch>
    </MainLayout>
    </Router>
  );
}

export default App;
