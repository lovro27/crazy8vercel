import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Borrow({ isLoggedIn }) {
  const [message, setMessage] = useState('');
  const [orders, setOrders] = useState([]);

  const games = [
    { name: 'Monopoly' },
    { name: 'Človek ne jezi se' },
    { name: 'Šah' }
  ];

  const handleOrder = (gameName) => {
    if (!isLoggedIn) {
      setMessage("⚠ Za naročilo igre se moraš prijaviti.");
    } else {
      setOrders([...orders, gameName]);
      setMessage(`✅ Igro "${gameName}" si uspešno naročil!`);
    }

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
            <span>{game.name}</span>
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
