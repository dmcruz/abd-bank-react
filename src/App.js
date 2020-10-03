import React from 'react';
import { Route } from 'react-router';
import './App.css';
import { ABDLayout } from './components/ABDLayout';
import Home from './pages/Home';

import './App.less';

function App() {
  return (
    <ABDLayout>
        <Route exact path='/' component={Home} />
    </ABDLayout>
  );
}

export default App;
