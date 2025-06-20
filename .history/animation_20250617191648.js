const board = document.querySelector('.game-board');
let flippedCards = [];
const scoreMap = new Map();
scoreMap.set('score', 0);

// The emoji pairs (default mode)
const emojiPairs = ['🦀','🦀','🍞','🍞','🍗','🍗','🥩','🥩','🧀','🧀','🥑','🥑'];

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

let currentMode = 'emoji'; // or recipe name

function updateScoreBoard() {
  document.getElementById('score').textContent = scoreMap.get('score');
}

// Fisher-Yates shuffle
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Assign values (emoji or images) to card backs
function assignCardBacks(values, isImage = false) {
  const cards = Array.from(document.querySelectorAll('.card'));
  for (let i = 0; i < cards.length; i++) {
    const back = cards[i].querySelector('.card-back');
    if (isImage) {
      back.innerHTML = `<img src="${values[i]}" alt="ingredient" />`;
    } else {
      back.textContent = values[i];
    }
    cards[i].classList.remove('flipped', 'matched');
  }
}

// Attach event listeners to cards
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
        let value1, value2;
        if (currentMode === 'emoji') {
          value1 = card1.querySelector('.card-back').textContent.trim();
          value2 = card2.querySelector('.card-back').textContent.trim();
        } else {
          value1 = card1.querySelector('.card-back img').src;
          value2 = card2.querySelector('.card-back img').src;
        }

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

// Reset game state and score
function resetGame() {
  flippedCards = [];
  scoreMap.set('score', 0);
  updateScoreBoard();
}

// Start emoji mode
function startEmojiMode() {
  currentMode = 'emoji';
  const shuffled = shuffle([...emojiPairs]);
  assignCardBacks(shuffled, false);
  resetGame();
  attachCardListeners();
}

// Start recipe mode
function startRecipeMode(recipeName) {
  currentMode = recipeName;
  const ingredients = recipes[recipeName];
  if (!ingredients) return;
  // Each ingredient appears twice
  const ingredientPairs = shuffle([...ingredients, ...ingredients]);
  assignCardBacks(ingredientPairs, true);
  resetGame();
  attachCardListeners();
}

// Side menu toggle
document.querySelector(".toggle-button").addEventListener("click", () => {
  document.querySelector(".recipe-section").classList.toggle("open");
});

// Recipe selection
document.querySelectorAll('.recipe-option').forEach(option => {
  option.addEventListener('click', () => {
    const selectedRecipe = option.dataset.recipe;
    startRecipeMode(selectedRecipe);
  });
});


const emojiModeBtn = document.getElementById('emoji-mode-btn');
if (emojiModeBtn) {
  emojiModeBtn.addEventListener('click', () => {
    startEmojiMode();
  });
}

// Initialize scoreboard and game
updateScoreBoard();
startEmojiMode();
