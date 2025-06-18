const board = document.querySelector('.game-board');
let cardsArray = Array.from(document.querySelectorAll('.card'));
let flippedCards = [];
const scoreMap = new Map();
scoreMap.set('score', 0);

function updateScoreBoard() {
  document.getElementById('score').textContent = scoreMap.get('score');
}

function shuffleCards() {
  for (let i = cardsArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    board.insertBefore(cardsArray[j], cardsArray[i]);
  }
  cardsArray = Array.from(document.querySelectorAll('.card'));
  attachCardListeners();
}

function attachCardListeners() {
  cardsArray.forEach(card => {
    card.onclick = null;
    card.addEventListener('click', () => {
      if (card.classList.contains('flipped') || card.classList.contains('matched')) return;

      card.classList.add('flipped');
      flippedCards.push(card);

      if (flippedCards.length === 2) {
        const [card1, card2] = flippedCards;
        const value1 = card1.querySelector('.card-back').innerHTML.trim();
        const value2 = card2.querySelector('.card-back').innerHTML.trim();

        if (value1 === value2) {
          card1.classList.add('matched');
          card2.classList.add('matched');
          scoreMap.set('score', scoreMap.get('score') + 10);
          updateScoreBoard();
        } else {
          setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
          }, 1000);
        }

        flippedCards = [];

        const matchedCards = document.querySelectorAll('.matched');
        if (matchedCards.length === cardsArray.length) {
          setTimeout(() => {
            alert('Congratulations! You matched all the cards!');
          }, 500);
        }
      }
    });
  });
}

function resetGame() {
  cardsArray.forEach(card => {
    card.classList.remove('flipped', 'matched');
  });
  flippedCards = [];
  scoreMap.set('score', 0);
  updateScoreBoard();
  shuffleCards();
}

// animation of side-menu-bar toggle
document.querySelector(".toggle-button").addEventListener("click", () => {
  document.querySelector(".recipe-section").classList.toggle("open");
});

// images sets
const recipes = {
  "pizza": [
    "./assets/pineapple.png",
    "./assets/tomato.png",
    "./assets/cheese.png",
    "./assets/sausage.png",
    "./assets/parmesancheese.png",
    "./assets/bellpepper.png",
  ],
  "hamburger": [
    "./assets/beef.png",
    "./assets/pickles.png",
    "./assets/tomato.png",
    "./assets/cheese.png",
    "./assets/bacon.png",
    "./assets/bun.png"
  ],
  "french-toast": [
    "./assets/bread.png",
    "./assets/egg.png",
    "./assets/milk.jpeg",
    "./assets/sugar.png",
    "./assets/canela.jpeg",
    "./assets/mapel.png",
  ],
  "ice-cream": [
    "./assets/milk.jpeg",
    "./assets/cream.png",
    "./assets/sugar.png",
    "./assets/cone.jpeg",
    "./assets/berry.jpeg",
    "./assets/choco.jpeg",
  ]
};

document.querySelectorAll('.recipe-option').forEach(option => {
  option.addEventListener('click', () => {
    const selectedRecipe = option.dataset.recipe;
    loadRecipe(selectedRecipe);
    resetGame();
  });
});

function loadRecipe(recipeName) {
  const ingredients = recipes[recipeName];
  const cards = document.querySelectorAll('.card');

  if (!ingredients) {
    console.error("Receta no encontrada:", recipeName);
    return;
  }

  for (let i = 0; i < cards.length; i++) {
    const ingredientIndex = Math.floor(i / 2);
    cards[i].querySelector('.card-back').innerHTML = `<img src="${ingredients[ingredientIndex]}" alt="ingredient" />`;
  }
}

updateScoreBoard();
