import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Borrow({ isLoggedIn }) {
  const [message, setMessage] = useState('');
  const [orders, setOrders] = useState([]);

  // Dodano stanje za razpoložljivost iger
  const [games, setGames] = useState([
    { name: 'Monopoly', available: 5 },
    { name: 'Človek ne jezi se', available: 5 },
    { name: 'Šah', available: 5 }
  ]);

  // Funkcija za naročanje igre
  const handleOrder = (gameName) => {
    const game = games.find(g => g.name === gameName); // Poiščemo izbrano igro

    if (!isLoggedIn) {
      setMessage("⚠ Za naročilo igre se moraš prijaviti.");
    } else if (game.available > 0) {
      // Če je igra na voljo, jo naročimo
      setOrders([...orders, gameName]);
      setMessage(`✅ Igro "${gameName}" si uspešno naročil!`);

      // Zmanjšamo razpoložljivost igre
      const updatedGames = games.map(g => 
        g.name === gameName ? { ...g, available: g.available - 1 } : g
      );
      setGames(updatedGames);
    } else {
      setMessage(`❌ Opravičujemo se, igra "${gameName}" ni več na voljo.`);
    }

    // Samodejno skrijemo sporočilo po nekaj sekundah
    setTimeout(() => setMessage(''), 4000);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '40px' }}>
      <h2>📦 Izposoja družabnih iger</h2>
      <p>Spodaj si lahko ogledaš igre, ki so na voljo za izposojo.</p>

      {message && (
        <div style={{
          backgroundColor: '#222',
          color: message.includes('⚠') ? 'orange' : 'lightgreen',
          fontSize: '20px',
          fontWeight: 'bold',
          padding: '15px',
          margin: '20px auto',
          borderRadius: '10px',
          width: 'fit-content',
          boxShadow: '0 0 10px #000'
        }}>
          {message}
        </div>
      )}

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '20px',
        marginTop: '30px'
      }}>
        {games.map((game, index) => (
          <div
            key={index}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '300px',
              border: '1px solid #ccc',
              borderRadius: '10px',
              padding: '15px',
              backgroundColor: '#fef3c7'
            }}
          >
            <span>{game.name} - {game.available} na voljo</span>
            <button
              onClick={() => handleOrder(game.name)}
              style={{
                backgroundColor: '#f97316',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                padding: '6px 12px',
                cursor: 'pointer'
              }}
            >
              Naroči
            </button>
          </div>
        ))}
      </div>

      {/* ✅ Prikaz naročil */}
      {orders.length > 0 && (
        <div style={{ marginTop: '40px' }}>
          <h3 style={{ color: 'lightgreen' }}>✅ Naročene igre:</h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {orders.map((order, idx) => (
              <li key={idx} style={{ color: 'white', fontWeight: 'bold' }}>
                🎲 {order}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* ✅ Gumb za nazaj */}
      <div style={{ marginTop: '40px' }}>
        <Link to="/">
          <button>⬅ Nazaj v meni</button>
        </Link>
      </div>
    </div>
  );
}

export default Borrow;
