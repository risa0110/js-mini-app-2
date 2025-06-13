const board = document.querySelector('.game-board');

const cardsArray = Array.from(document.querySelectorAll('.card'));

// Shuffle the cards using Fisher-Yates
for (let i = cardsArray.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [cardsArray[i], cardsArray[j]] = [cardsArray[j], cardsArray[i]];
}

cardsArray.forEach(card => board.appendChild(card));

const cards = document.querySelectorAll('.card');

let flippedCards = [];

cards.forEach(card => {
  card.addEventListener('click', () => {
    if (card.classList.contains('flipped') || card.classList.contains('matched')) return;

    card.classList.add('flipped');

    flippedCards.push(card);

    if (flippedCards.length === 2) {
      const card1 = flippedCards[0];
      const card2 = flippedCards[1];

      const value1 = card1.querySelector('.card-back').textContent;
      const value2 = card2.querySelector('.card-back').textContent;

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
          alert('Congratulations! You found all the matching pairs.');
        }, 500);
      }
    }
  });
});






//Check if the 2 cards match
  //If not matched, flip it back
  //If matched, keep it

  //Show a "game clear" message
