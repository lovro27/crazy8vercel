import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Game from './Game';
import Borrow from './Borrow';
import Main from './Main';
import Login from './Login';


function Home() {
  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h1>Crazy 8 - Moja Prva Aplikacija</h1>
      <p>Dobrodošel!</p>

      <Link to="/igra">
        <button>Nova igra</button>
      </Link>

      <button onClick={() => alert('Odprl se bo meni z nastavitvami.')}>Nastavitve</button>
      <button onClick={() => alert('Aplikacija se zapira...')}>Izhod</button>

      <br /><br />

      <Link to="/navodila">
        <button>Navodila</button>
      </Link>

      <br /><br />

      <Link to="/izposoja">
        <button style={{ backgroundColor: 'orange' }}>📦 Izposoja iger</button>
      </Link>
    </div>
  );
}

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
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/navodila" element={<Navodila />} />
        <Route path="/igra" element={<Game />} />
        <Route path="/izposoja" element={<Borrow />} /> {/* 🧡 to dodajamo */}
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
