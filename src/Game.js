import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const fullDeck = [
  '♣️ 2', '♣️ 3', '♣️ 4', '♣️ 5', '♣️ 6', '♣️ 7', '♣️ 8', '♣️ 9', '♣️ 10', '♣️ J', '♣️ Q', '♣️ K', '♣️ A',
  '♦️ 2', '♦️ 3', '♦️ 4', '♦️ 5', '♦️ 6', '♦️ 7', '♦️ 8', '♦️ 9', '♦️ 10', '♦️ J', '♦️ Q', '♦️ K', '♦️ A',
  '♥️ 2', '♥️ 3', '♥️ 4', '♥️ 5', '♥️ 6', '♥️ 7', '♥️ 8', '♥️ 9', '♥️ 10', '♥️ J', '♥️ Q', '♥️ K', '♥️ A',
  '♠️ 2', '♠️ 3', '♠️ 4', '♠️ 5', '♠️ 6', '♠️ 7', '♠️ 8', '♠️ 9', '♠️ 10', '♠️ J', '♠️ Q', '♠️ K', '♠️ A'
];

function shuffle(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function Game() {
  const [deck, setDeck] = useState([]);
  const [playerHand, setPlayerHand] = useState([]);
  const [computerHand, setComputerHand] = useState([]);
  const [playedCard, setPlayedCard] = useState(null);
  const [gameOverMessage, setGameOverMessage] = useState('');
  const [tokenEarned, setTokenEarned] = useState(false);
  const [gameStarted, setGameStarted] = useState(false); // 🆕 novo stanje

  useEffect(() => {
    startNewGame();
  }, []);

  const startNewGame = () => {
    const shuffled = shuffle(fullDeck);
    const player = shuffled.slice(0, 7);
    const computer = shuffled.slice(7, 14);
    const remaining = shuffled.slice(14);

    setPlayerHand(player);
    setComputerHand(computer);
    setPlayedCard(remaining[0]);
    setDeck(remaining.slice(1));
    setGameOverMessage('');
    setTokenEarned(false);
    setGameStarted(true); // 🆕 označi začetek igre
  };

  useEffect(() => {
    if (!gameStarted) return;

    if (playerHand.length === 0) {
      setGameOverMessage('🎉 Zmagal si! Porabil si vse karte.');
      setTokenEarned(true);
    } else if (computerHand.length === 0) {
      setGameOverMessage('😔 Računalnik je zmagal!');
    } else if (deck.length === 0 && !hasPlayableCard(playerHand) && !hasPlayableCard(computerHand)) {
      setGameOverMessage('😐 Neodločeno! Nihče ne more več igrati in ni več kart.');
    }
  }, [playerHand, computerHand, deck, gameStarted]);

  const hasPlayableCard = (hand) => {
    return hand.some(card => isPlayable(card));
  };

  const drawCard = () => {
    if (deck.length === 0 || gameOverMessage) return;
    const newCard = deck[0];
    setPlayerHand([...playerHand, newCard]);
    setDeck(deck.slice(1));
  };

  const isPlayable = (card) => {
    if (!playedCard) return true;
    const playedValue = playedCard.slice(2);
    const playedSuit = playedCard[0];
    const currentValue = card.slice(2);
    const currentSuit = card[0];
    return playedValue === currentValue || playedSuit === currentSuit || currentValue === '8';
  };

  const playCard = (index) => {
    if (gameOverMessage) return;
    const card = playerHand[index];
    if (!isPlayable(card)) {
      alert('Neveljavna poteza!');
      return;
    }
    const newHand = [...playerHand];
    newHand.splice(index, 1);
    setPlayerHand(newHand);
    setPlayedCard(card);
    setTimeout(() => {
      computerTurn();
    }, 800);
  };

  const computerTurn = () => {
    if (gameOverMessage) return;
    let newHand = [...computerHand];
    let newDeck = [...deck];
    let played = null;

    for (let i = 0; i < newHand.length; i++) {
      if (isPlayable(newHand[i])) {
        played = newHand[i];
        newHand.splice(i, 1);
        break;
      }
    }

    while (!played && newDeck.length > 0) {
      const drawnCard = newDeck[0];
      newDeck = newDeck.slice(1);
      newHand.push(drawnCard);
      if (isPlayable(drawnCard)) {
        played = drawnCard;
        newHand = newHand.filter(card => card !== drawnCard);
        break;
      }
    }

    setComputerHand(newHand);
    setDeck(newDeck);

    if (played) {
      setPlayedCard(played);
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '30px' }}>
      <h2>Igra Crazy 8</h2>

      {gameOverMessage && (
        <div style={{ color: '#fbbf24', fontWeight: 'bold', fontSize: '18px', marginBottom: '20px' }}>
          {gameOverMessage}<br />
          {tokenEarned && '🎁 Prejeli ste žeton za popust pri izposoji igre!'}
        </div>
      )}

      <div>
        <h3>Računalnikove karte:</h3>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
          {computerHand.map((_, index) => (
            <div key={index} style={{ backgroundColor: '#666', width: '60px', height: '80px', borderRadius: '10px' }}></div>
          ))}
        </div>
      </div>

      {playedCard && (
        <div style={{ margin: '40px auto' }}>
          <h3>Karta na mizi:</h3>
          <div style={{
            display: 'inline-block',
            backgroundColor: '#fff',
            color: '#000',
            border: '2px solid #444',
            padding: '25px',
            borderRadius: '12px',
            fontSize: '24px',
            fontWeight: 'bold'
          }}>
            {playedCard}
          </div>
        </div>
      )}

      <hr style={{ width: '60%', margin: '40px auto', borderColor: '#555' }} />

      <div>
        <h3>Tvoje karte:</h3>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', flexWrap: 'wrap' }}>
          {playerHand.map((card, index) => (
            <div
              key={index}
              onClick={() => playCard(index)}
              style={{
                backgroundColor: '#fff',
                color: '#000',
                border: '1px solid #999',
                padding: '20px',
                borderRadius: '10px',
                width: '60px',
                fontSize: '20px',
                cursor: 'pointer'
              }} >
              {card}
            </div>
          ))}
        </div>
        <br />
        <button onClick={drawCard}>Izvleci karto</button>
        <div style={{ marginTop: '30px' }}>
          <button onClick={startNewGame} style={{ marginRight: '10px' }}>Nova igra</button>
          <Link to="/">
            <button>⬅ Nazaj v meni</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Game;
