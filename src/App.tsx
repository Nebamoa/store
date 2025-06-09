import React from 'react';

import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import { Provider } from 'react-redux';
import { store } from './redux/store';
function App() {
  return (
    <Provider store={store}>
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
    </Provider>


  );
}

export default App;
