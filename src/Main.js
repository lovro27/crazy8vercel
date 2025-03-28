import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Main() {
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const isLogged = localStorage.getItem('loggedIn');
    setLoggedIn(isLogged === 'true');
  }, []);

  const handleLogout = () => {
    localStorage.setItem('loggedIn', 'false');
    setLoggedIn(false);
    navigate('/');
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h1>Dobrodošel v naši aplikaciji!</h1>
      {loggedIn && <p style={{ color: 'lightgreen' }}>✅ Uspešno ste prijavljeni.</p>}
      <p>Izberi možnost:</p>

      <Link to="/izposoja">
        <button style={{ backgroundColor: 'orange', margin: '10px' }}>📦 Izposoja iger</button>
      </Link>

      <Link to="/igra">
        <button style={{ backgroundColor: 'teal', margin: '10px' }}>🎮 Crazy 8</button>
      </Link>

      {!loggedIn ? (
        <Link to="/login">
          <button style={{ backgroundColor: 'green', margin: '10px' }}>🔐 Prijava</button>
        </Link>
      ) : (
        <button onClick={handleLogout} style={{ backgroundColor: 'crimson', color: 'white', margin: '10px' }}>
          🚪 Odjavi
        </button>
      )}

      {/* Kontaktna vizitka */}
      <div style={{
        marginTop: '80px',
        padding: '20px',
        borderRadius: '12px',
        backgroundColor: '#2e2e2e',
        width: '300px',
        marginLeft: 'auto',
        marginRight: 'auto',
        boxShadow: '0 0 10px rgba(0,0,0,0.5)',
        color: 'white'
      }}>
        <h3>📇 Kontakt</h3>
        <p><strong>📧 Email:</strong> <a href="mailto:group5@games.si" style={{ color: '#90cdf4' }}>group5@games.si</a></p>
        <p><strong>📞 Telefon:</strong> <a href="tel:+38691919919" style={{ color: '#90cdf4' }}>+386 91 919 919</a></p>
      </div>
    </div>
  );
}

export default Main;
