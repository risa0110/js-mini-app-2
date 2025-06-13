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

//Check if the 2 cards match
  //If not matched, flip it back
  //If matched, keep it

  //Show a "game clear" message
