import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Simplex from './Components/Simplex/Simplex';
import Home from './Components/Home';
import MainLayout from './Components/MainLayout';
import SpermanRank from './Components/Hypothesis/SpermanRank';
import TestRandomness from './Components/Hypothesis/TestRandomness';
import Wilcoxon from './Components/Hypothesis/Wilcoxon';
import MannWitney from './Components/Hypothesis/MannWitney';
import ChiSqIndep from './Components/Hypothesis/ChiSqIndep';

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
          <Route exact path="/spearman-rank"
            render={(props) => <SpermanRank
            />} />
          <Route exact path="/test-randomness"
            render={(props) => <TestRandomness
            />} />
          <Route exact path="/wilcoxon"
            render={(props) => <Wilcoxon
            />} />
          <Route exact path="/mannwitney"
            render={(props) => <MannWitney
            />} />
          <Route exact path="/chisq-indep"
            render={(props) => <ChiSqIndep
            />} />
        </Switch>
    </MainLayout>
    </Router>
  );
}

export default App;
