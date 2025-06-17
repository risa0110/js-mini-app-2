const board = document.querySelector('.game-board');
const cardsArray = Array.from(document.querySelectorAll('.card'));

// shuffle tha cards
for (let i = cardsArray.length - 1; i > 0; i--) {
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
      const value1 = card1.querySelector('.card-back').innerHTML.trim();
      const value2 = card2.querySelector('.card-back').innerHTML.trim();

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

//animation of side-menu-bar
document.querySelector(".toggle-button").addEventListener("click", function(){
  document.querySelector(".recipe-section").classList.toggle("open");
});

// recipes image sets
const recipes = {
  "pizza": [
    "./assets/dough.png",
    "./assets/tomato.png",
    "./assets/cheese.png",
    "./assets/sausage.png",
    "./assets/olive.png",
    "./assets/basil.png"
  ],
  "hamburger": [
    "./assets/beef.png",
    "./assets/lettuce.png",
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
    "./assets/syrup.png"
  ],
  "ice-cream": [
    "./assets/milk.png",
    "./assets/cream.png",
    "./assets/sugar.png",
    "./assets/vanilla.png",
    "./assets/strawberry.png",
    "./assets/chocolate.png"
  ]
};

// To select the recipe
document.querySelectorAll('.recipe-option').forEach(option => {
  option.addEventListener('click', () => {
    const selectedRecipe = option.dataset.recipe;
    loadRecipe(selectedRecipe);
    resetGame();
  });
});

// load recipe and assign images to back faces
function loadRecipe(recipeName) {
  const ingredients = recipes[recipeName];
  const cards = document.querySelectorAll('.card');

  if (!ingredients) {
    console.error("Receta no encontrada:", recipeName);
    return;
  }

  for (let i = 0; i < cards.length; i++) {
    const ingredientIndex = Math.floor(i / 2);
    const imgSrc = ingredients[ingredientIndex];

    const cardBack = cards[i].querySelector('.card-back');
    cardBack.innerHTML = `<img src="${imgSrc}" alt="ingredient" />`;
  }
}

// reset game state when recipe changes
function resetGame() {
  const allCards = document.querySelectorAll('.card');
  allCards.forEach(card => {
    card.classList.remove('flipped', 'matched');
  });
  flippedCards = [];
}
