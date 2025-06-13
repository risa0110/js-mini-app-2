const board = document.querySelector('.game-board');
const cardsArray = Array.from(document.querySelectorAll('.card'));

// Shuffle cards
for (let i = cardsArray.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [cardsArray[i], cardsArray[j]] = [cardsArray[j], cardsArray[i]];
}
cardsArray.forEach(card => board.appendChild(card));

let flippedCards = [];

document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('click', () => {
    if (
      card.classList.contains('flipped') ||
      card.classList.contains('matched') ||
      flippedCards.length >= 2
    ) return;

    card.classList.add('flipped');
    flippedCards.push(card);

    if (flippedCards.length === 2) {
      const [card1, card2] = flippedCards;
      const img1 = card1.querySelector('.card-back img').src;
      const img2 = card2.querySelector('.card-back img').src;

      if (img1 === img2) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        flippedCards = [];
      } else {
        setTimeout(() => {
          card1.classList.remove('flipped');
          card2.classList.remove('flipped');
          flippedCards = [];
        }, 1000);
      }

      const matchedCards = document.querySelectorAll('.matched');
      if (matchedCards.length === cardsArray.length) {
        setTimeout(() => {
          alert('Congratulations! You matched all pairs!');
        }, 500);
      }
    }
  });
});
