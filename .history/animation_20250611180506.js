const board = document.querySelector('.game-board');
const cardsArray = Array.from(document.querySelectorAll('.card'));

// shuffle tha cards
for (const i = cardsArray.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [cardsArray[i], cardsArray[j]] = [cardsArray[j], cardsArray[i]];
}

// put them back in the game
cardsArray.forEach(card => board.appendChild(card));

const cards = document.querySelectorAll('.card');
let flippedCards = [];

cards.forEach(card => {
  card.addEventListener('click', () => {
    if (card.classList.contains('flipped') || card.classList.contains('matched')) return;

    card.classList.add('flipped');
    flippedCards.push(card);

    if (flippedCards.length === 2) {
      const [card1, card2] = flippedCards;
      const value1 = card1.querySelector('.card-back').textContent.trim();
      const value2 = card2.querySelector('.card-back').textContent.trim();

      if (value1 === value2) {
        card1.classList.add('matched');
        card2.classList.add('matched');
      } else {
        setTimeout(() => {
          card1.classList.remove('flipped');
          card2.classList.remove('flipped');
        }, 1000);
      }

      flippedCards = [];

      const matchedCards = document.querySelectorAll('.matched');
      if (matchedCards.length === cards.length) {
        setTimeout(() => {
          alert('Congratulations! You matched all the cards!');
        }, 500);
      }
    }
  });
});
