import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login({ setIsLoggedIn }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username === 'administrator' && password === 'administrator') {
      setIsLoggedIn(true); // ✅ obvesti App.js da si prijavljen
      localStorage.setItem('loggedIn', 'true');
      navigate('/'); // preusmeri na Main
    } else {
      setError('❌ Napačno uporabniško ime ali geslo!');
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h2>🔐 Prijava</h2>
      <div style={{ marginTop: '20px' }}>
        <input
          type="text"
          placeholder="Uporabniško ime"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ padding: '10px', fontSize: '16px', marginBottom: '10px' }}
        /><br />
        <input
          type="password"
          placeholder="Geslo"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ padding: '10px', fontSize: '16px' }}
        /><br /><br />
        <button onClick={handleLogin}>Prijava</button>
        {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
      </div>
    </div>
  );
}

export default Login;
