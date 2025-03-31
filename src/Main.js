import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

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
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
      textAlign: 'center',
      height: '100vh',
      backgroundColor: '#1e1e1e',
      padding: '0px',
      margin: '0',
    }}>
      <img src="/logo444.png" alt="Logo" style={{
        width: '600px',
        height: 'auto',
        marginBottom: '20px',
        objectFit: 'contain',
      }} />

      {loggedIn && <p style={{ color: 'lightgreen' }}>✅ Uspešno ste prijavljeni.</p>}
      <p style={{ marginTop: '-160px' }}>Izberi možnost:</p>

      {/* Gumbi */}
      <div style={{
        display: 'flex',
        gap: '10px',
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: '10px',
      }}>
        <Link to="/izposoja">
          <button style={{ backgroundColor: 'orange', padding: '10px 20px', borderRadius: '8px' }}>📦 Izposoja iger</button>
        </Link>

        <Link to="/navodila">
          <button style={{ backgroundColor: 'teal', padding: '10px 20px', borderRadius: '8px' }}>🎮 Crazy 8</button>
        </Link>

        {!loggedIn ? (
          <Link to="/login">
            <button style={{ backgroundColor: 'green', padding: '10px 20px', borderRadius: '8px' }}>🔐 Prijava</button>
          </Link>
        ) : (
          <button onClick={handleLogout} style={{ backgroundColor: 'crimson', color: 'white', padding: '10px 20px', borderRadius: '8px' }}>
            🚪 Odjavi
          </button>
        )}
      </div>

      {/* Kontaktna vizitka */}
      <div style={{
        marginTop: '80px',
        padding: '20px',
        borderRadius: '12px',
        backgroundColor: '#2e2e2e',
        width: '300px',
        boxShadow: '0 0 10px rgba(0,0,0,0.5)',
        color: 'white',
        textAlign: 'left',
      }}>
        <h3>📇 Kontakt</h3>
        <p><strong>📧 Email:</strong> <a href="mailto:group5@games.si" style={{ color: '#90cdf4' }}>group5@games.si</a></p>
        <p><strong>📞 Telefon:</strong> <a href="tel:+38691919919" style={{ color: '#90cdf4' }}>+386 91 919 919</a></p>
      </div>
    </div>
  );
}

export default Main;
