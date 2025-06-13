// Selecciona todas las cartas
const cards = document.querySelectorAll(".card");

// Array temporal para guardar las dos cartas que están volteadas
let flippedCards = [];

// Agrega el event listener a cada carta
cards.forEach(card => {
  card.addEventListener("click", () => {
    // Si ya tiene la clase flipped o matched, no hacer nada
    if (
      card.classList.contains("flipped") || 
      card.classList.contains("matched")
    ) return;

    // Voltear la carta agregando la clase 'flipped'
    card.classList.add("flipped");
    flippedCards.push(card);

    // Si ya hay dos cartas volteadas, comparar
    if (flippedCards.length === 2) {
      const card1 = flippedCards[0];
      const card2 = flippedCards[1];

      // Obtener el texto dentro del div.card-back de cada carta
      const value1 = card1.querySelector(".card-back").textContent;
      const value2 = card2.querySelector(".card-back").textContent;

      // Si hacen match
      if (value1 === value2) {
        // Marcar ambas como emparejadas
        card1.classList.add("matched");
        card2.classList.add("matched");
        flippedCards = [];

        // Verifica si ya todas las cartas están emparejadas
        const matched = document.querySelectorAll(".card.matched");
        if (matched.length === cards.length) {
          setTimeout(() => {
            alert("🎉 ¡Juego completado!");
          }, 500);
        }

      } else {
        // Si no hacen match, voltearlas de nuevo después de un momento
        setTimeout(() => {
          card1.classList.remove("flipped");
          card2.classList.remove("flipped");
          flippedCards = [];
        }, 1000);
      }
    }
  });
});




//Check if the 2 cards match
  //If not matched, flip it back
  //If matched, keep it

  //Show a "game clear" message
