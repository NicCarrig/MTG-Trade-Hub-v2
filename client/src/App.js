import React from 'react';

import Header from './components/Header'
import Footer from './components/Footer'

import Home from './pages/Home'

import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <div>
        <Home />
      </div>
      <Footer />
    </div >
  );
}

export default App;
