const board = document.querySelector('.game-board');
let flippedCards = [];
const scoreMap = new Map();
scoreMap.set('score', 0);

// Recipes with image paths
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

let currentMode = null;

function updateScoreBoard() {
  document.getElementById('score').textContent = scoreMap.get('score');
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function assignCardBacks(values) {
  const cards = Array.from(document.querySelectorAll('.card'));
  for (let i = 0; i < cards.length; i++) {
    const back = cards[i].querySelector('.card-back');
    back.innerHTML = `<img src="${values[i]}" alt="ingredient" />`;
    cards[i].classList.remove('flipped', 'matched');
  }
}

function attachCardListeners() {
  const cards = Array.from(document.querySelectorAll('.card'));
  cards.forEach(card => {
    card.onclick = null;
    card.addEventListener('click', () => {
      if (card.classList.contains('flipped') || card.classList.contains('matched')) return;

      card.classList.add('flipped');
      flippedCards.push(card);

      if (flippedCards.length === 2) {
        const [card1, card2] = flippedCards;
        const value1 = card1.querySelector('.card-back img').src;
        const value2 = card2.querySelector('.card-back img').src;

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
        if (matchedCards.length === cards.length) {
          setTimeout(() => {
            alert('Congratulations! You matched all the cards!');
          }, 500);
        }
      }
    });
  });
}

function resetGame() {
  flippedCards = [];
  scoreMap.set('score', 0);
  updateScoreBoard();
}

function startRecipeMode(recipeName) {
  currentMode = recipeName;
  const ingredients = recipes[recipeName];
  if (!ingredients) return;
  const ingredientPairs = shuffle([...ingredients, ...ingredients]);
  assignCardBacks(ingredientPairs);
  resetGame();
  attachCardListeners();
}

document.querySelector(".toggle-button").addEventListener("click", () => {
  document.querySelector(".recipe-section").classList.toggle("open");
});

document.querySelectorAll('.recipe-option').forEach(option => {
  option.addEventListener('click', () => {
    const selectedRecipe = option.dataset.recipe;
    startRecipeMode(selectedRecipe);
  });
});

updateScoreBoard();
