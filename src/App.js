import React from 'react';
import { Route } from 'react-router';
import './App.css';
import { ABDLayout } from './components/ABDLayout';
import Home from './pages/Home';
import Bank from './pages/Bank';
import Cranny from './pages/Cranny';
import Fishes from './pages/critters/Fishes';
import Bugs from './pages/critters/Bugs';
import { makeServer } from './server';

import './App.less';

// data taken from acnhapi.com
makeServer();

function App() {
  return (
    <ABDLayout>
        <Route exact path='/' component={Home} />
        <Route path='/bank' component={Bank} />
        <Route path='/store' component={Cranny} />
        <Route path='/explore/fishes' component={Fishes} />
        <Route path='/explore/bugs' component={Bugs} />
    </ABDLayout>
  );
}

export default App;
