import React from 'react';
import { Link } from 'react-router-dom';

function Borrow() {
  const games = [
    { name: 'Monopoly' },
    { name: 'Človek ne jezi se' },
    { name: 'Šah' }
  ];

  return (
    <div style={{ textAlign: 'center', marginTop: '40px' }}>
      <h2>📦 Izposoja družabnih iger</h2>
      <p>Spodaj si lahko ogledaš igre, ki so na voljo za izposojo.</p>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', marginTop: '30px' }}>
        {games.map((game, index) => (
          <div key={index} style={{ display: 'flex', justifyContent: 'space-between', width: '300px', border: '1px solid #ccc', borderRadius: '10px', padding: '15px', backgroundColor: '#fef3c7' }}>
            <span>{game.name}</span>
            <button
  onClick={() => alert(`Uspešno si naročil igro: ${game.name}`)}
  style={{
    backgroundColor: '#f97316',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    padding: '6px 12px'
  }}
>
  Naroči
</button>

          </div>
        ))}
      </div>
      <div style={{ marginTop: '40px' }}>
  <Link to="/">
    <button>⬅ Nazaj v meni</button>
  </Link>
</div>
    </div>
  );
}

export default Borrow;
