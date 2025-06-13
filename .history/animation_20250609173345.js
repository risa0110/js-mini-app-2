//Flip a card when it clicked
var cards = document.getElementsByClassName("card");
for(var i=0; i<cards.length; i++){
    cards[i].addEventListener("click", function(){
    var flippedCards = document.querySelectorAll(".card.flipped")
    
    //Allow only 2 cards to be flipped
    if (flippedCards.length == 2 && !this.classList.contains("flipped")){
        return;
    }
    this.classList.toggle("flipped");
})};
// Selecciona todos los elementos con la clase "card"
var cards = document.getElementsByClassName("card");

// Recorre cada carta y le agrega un event listener para detectar clics
for (var i = 0; i < cards.length; i++) {
  cards[i].addEventListener("click", function () {
    // Selecciona las cartas que actualmente tienen la clase "flipped"
    var flippedCards = document.querySelectorAll(".card.flipped");

    // Si ya hay 2 cartas volteadas y la carta actual no está volteada, no se puede voltear otra
    if (flippedCards.length == 2 && !this.classList.contains("flipped")) {
      return;
    }

    // Alterna (agrega o quita) la clase "flipped" en la carta actual
    this.classList.toggle("flipped");

    // Vuelve a obtener las cartas volteadas después de agregar la nueva
    flippedCards = document.querySelectorAll(".card.flipped");

    // Si hay exactamente 2 cartas volteadas, se compara si hacen match
    if (flippedCards.length === 2) {
      // Se espera medio segundo antes de hacer la comparación
      setTimeout(() => {
        // Asigna las dos cartas volteadas a variables
        var card1 = flippedCards[0];
        var card2 = flippedCards[1];

        // Obtiene el valor del atributo "data-card" para compararlas
        var type1 = card1.getAttribute("data-card");
        var type2 = card2.getAttribute("data-card");

        // Si las dos cartas son iguales (match)
        if (type1 === type2) {
          // Se les agrega la clase "matched" para indicar que están emparejadas
          card1.classList.add("matched");
          card2.classList.add("matched");
        } else {
          // Si no hacen match, se quita la clase "flipped" para voltearlas de nuevo
          card1.classList.remove("flipped");
          card2.classList.remove("flipped");
        }

        // Verifica si todas las cartas ya están emparejadas
        var matchedCards = document.querySelectorAll(".card.matched");

        // Si la cantidad de cartas emparejadas es igual al total, se muestra mensaje de victoria
        if (matchedCards.length === cards.length) {
          setTimeout(() => {
            alert("🎉 ¡Juego completado!");
          }, 300); // Pequeña pausa antes de mostrar el mensaje
        }
      }, 500); // Tiempo de espera antes de comprobar las cartas
    }
  });
}


//Check if the 2 cards match
  //If not matched, flip it back
  //If matched, keep it

  //Show a "game clear" message
