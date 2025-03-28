import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import React, { useState } from 'react';

import Game from './Game';
import Borrow from './Borrow';
import Main from './Main';
import Login from './Login';

function Navodila() {
  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h2>Navodila za igro Crazy 8</h2>
      <p>Cilj igre je čim prej porabiti vse karte.</p>
      <Link to="/">
        <button>⬅ Nazaj</button>
      </Link>
    </div>
  );
}

function App() {
  // ✅ Dodamo prijavo
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/navodila" element={<Navodila />} />
        <Route path="/igra" element={<Game />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        {/* ✅ Posredujemo status prijave v Borrow komponento */}
        <Route path="/izposoja" element={<Borrow isLoggedIn={isLoggedIn} />} />
      </Routes>
    </Router>
  );
}

export default App;
