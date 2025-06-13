// 1. Seleccionamos el contenedor del tablero
const board = document.querySelector('.game-board');

// 2. Convertimos NodeList de cartas a array para poder barajarlo
const cardsArray = Array.from(document.querySelectorAll('.card'));

// 3. Mezclamos las cartas con algoritmo de Fisher-Yates
for (let i = cardsArray.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [cardsArray[i], cardsArray[j]] = [cardsArray[j], cardsArray[i]];
}

// 4. Limpiamos el tablero y volvemos a agregar las cartas en el nuevo orden
cardsArray.forEach(card => board.appendChild(card));

// Seleccionamos todas las cartas que tengan la clase "card"
const cards = document.querySelectorAll('.card');

// Creamos un arreglo vacío para guardar las cartas volteadas
let flippedCards = [];

// Recorremos todas las cartas para agregarles un evento de click
cards.forEach(card => {
  card.addEventListener('click', () => {
    // Si esta carta ya está volteada o emparejada, salimos
    if (card.classList.contains('flipped') || card.classList.contains('matched')) return;

    // Volteamos la carta agregando la clase "flipped"
    card.classList.add('flipped');

    // Agregamos esta carta al arreglo de cartas volteadas
    flippedCards.push(card);

    // Si hay dos cartas volteadas, comprobamos si coinciden
    if (flippedCards.length === 2) {
      // Obtenemos las dos cartas
      const card1 = flippedCards[0];
      const card2 = flippedCards[1];

      // Buscamos el contenido de la parte trasera de cada carta
      const value1 = card1.querySelector('.card-back').textContent;
      const value2 = card2.querySelector('.card-back').textContent;

      // Si el texto de ambas cartas es igual, es un match
      if (value1 === value2) {
        // Les agregamos la clase "matched" para que se queden volteadas
        card1.classList.add('matched');
        card2.classList.add('matched');
      } else {
        // Si no coinciden, esperamos 1 segundo y las volteamos de nuevo
        setTimeout(() => {
          card1.classList.remove('flipped');
          card2.classList.remove('flipped');
        }, 1000);
      }

      // Limpiamos el arreglo para permitir más clicks
      flippedCards = [];

      // Verificamos si el jugador ya encontró todas las parejas
      const matchedCards = document.querySelectorAll('.matched');
      if (matchedCards.length === cards.length) {
        setTimeout(() => {
          alert('¡Felicidades! Has encontrado todas las parejas.');
        }, 500);
      }
    }
  });
});





//Check if the 2 cards match
  //If not matched, flip it back
  //If matched, keep it

  //Show a "game clear" message
