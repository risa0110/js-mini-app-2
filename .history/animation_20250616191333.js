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


//animation of side-menu-bar
document.querySelector(".toggle-button").addEventListener("click", function(){
  document.querySelector(".recipe-section").classList.toggle("open");
})

// ======== RECETAS E INGREDIENTES ========
const recipes = {
  "pizza": [
    "./assets/dough.png",
    "./assets/tomato-sauce.png",
    "./assets/cheese.png",
    "./assets/pepperoni.png",
    "./assets/olive.png",
    "./assets/basil.png"
  ],
  "hamburger": [
    "./assets/burger.png",
    "./assets/lettuce.png",
    "./assets/tomato.png",
    "./assets/cheese.png",
    "./assets/bacon.png",
    "./assets/bun.png"
  ],
  "french-toast": [
    "./assets/bread.png",
    "./assets/egg.png",
    "./assets/milk.png",
    "./assets/cinnamon.png",
    "./assets/maple-syrup.png",
    "./assets/vanilla.png"
  ],
  "ice-cream": [
    "./assets/cream.png",
    "./assets/sugar.png",
    "./assets/milk.png",
    "./assets/vanilla.png",
    "./assets/cone.png",
    "./assets/strawberry.png"
  ]
};

// ======== CARGAR INGREDIENTES EN LAS CARTAS ========
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
    if (cardBack) {
      cardBack.innerHTML = `<img src="${imgSrc}" alt="ingredient" />`;
    }
  }
}

// ======== RESETEAR JUEGO ========
function resetGame() {
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    card.classList.remove('flipped', 'matched');
  });
  shuffleCards();
}

// ======== BARAJAR CARTAS Y VOLVERLAS A PONER ========
function shuffleCards() {
  const board = document.querySelector('.game-board');
  const cardsArray = Array.from(document.querySelectorAll('.card'));

  for (let i = cardsArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cardsArray[i], cardsArray[j]] = [cardsArray[j], cardsArray[i]];
  }

  cardsArray.forEach(card => board.appendChild(card));
}

// ======== JUEGO DE MEMORIA ========
function setupGameLogic() {
  const cards = document.querySelectorAll('.card');
  let flippedCards = [];

  cards.forEach(card => {
    card.addEventListener('click', () => {
      if (card.classList.contains('flipped') || card.classList.contains('matched')) return;

      card.classList.add('flipped');
      flippedCards.push(card);

      if (flippedCards.length === 2) {
        const [card1, card2] = flippedCards;
        const img1 = card1.querySelector('.card-back img')?.src;
        const img2 = card2.querySelector('.card-back img')?.src;

        if (img1 === img2) {
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
            alert('🎉 Congratulations! You matched all the cards!');
          }, 500);
        }
      }
    });
  });
}

// ======== MENÚ LATERAL ANIMADO ========
document.querySelector(".toggle-button").addEventListener("click", function () {
  document.querySelector(".recipe-section").classList.toggle("open");
});

// ======== OPCIONES DEL MENÚ DE RECETAS ========
document.querySelectorAll('.recipe-option').forEach(option => {
  option.addEventListener('click', () => {
    const selectedRecipe = option.dataset.recipe;
    loadRecipe(selectedRecipe);
    resetGame();
  });
});

// ======== INICIAR TODO AL CARGAR ========
window.onload = () => {
  loadRecipe("pizza"); // Receta inicial por defecto
  shuffleCards();
  setupGameLogic();
};
