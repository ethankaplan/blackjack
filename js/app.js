var deck = [];
class Player {
  constructor() {
    this.money = 100;
    this.hand = [];
    this.split = [];
    this.shown = 0;
  }

  showLastCard() {
    let str = `play${this.hand.length}`;
    let cardImg = document.getElementById(str);
    cardImg.classList.remove("outline2");
    cardImg.classList.add(this.hand[this.hand.length - 1].img);
  }
  addCard() {
    if (this.hand.length < 5) {
      this.hand.push(deck[0]);
      deck.shift();
      this.showLastCard();
    }
  }
}

class Comp extends Player {
  constructor() {
    super();
  }

  addCard() {
    if (super.hand.length < 5) {
      super.hand.push(deck[0]);
      deck.shift();
      if (super.hand.length != 2) {
        this.showLastCard();
      } else {
        this.showBackCard();
      }
    }
  }
  showLastCard() {
    let str = `dealer${this.hand.length}`;
    let cardImg = document.getElementById(str);
    cardImg.classList.remove("outline2");
    cardImg.classList.add(this.hand[this.hand.length - 1].img);
  }

  showBackCard() {
    let str = `dealer${super.hand.length}`;
    let cardImg = document.getElementById(str);
    cardImg.classList.remove("outline2");
    cardImg.classList.add("back");
  }
}
function shuffle() {
  for (let i = 0; i < 500; i++) {
    let location1 = Math.floor(Math.random() * deck.length);
    let location2 = Math.floor(Math.random() * deck.length);
    let tmp = deck[location1];

    deck[location1] = deck[location2];
    deck[location2] = tmp;
  }
}

var dealer = [];

function initDeck() {
  let suits = ["s", "d", "c", "h"];
  let values = [
    "A",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "J",
    "Q",
    "K"
  ];
  for (let i = 0; i < suits.length; i++) {
    for (let y = 0; y < values.length; y++) {
      let card = { suit: suits[i], val: values[y], img: suits[i] + values[y] };
      deck.push(card);
    }
  }
  shuffle();
}

let player = new Player();
initDeck();
player.addCard();
player.addCard();
console.log(player.hand);
