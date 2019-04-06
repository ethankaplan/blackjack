var deck = [];
class Player {
  constructor() {
    this.money = 100;
    this.hand = [];
    this.split = [];
    this.shown = 0;
    this.name="play";
  }

  updateTot(){
    let str = `${this.name}Total`;
    console.log(str);
    document.getElementById(str).innerHTML=this.shown;
    
    
  }

  showLastCard() {
    let str = `play${this.hand.length}`;
    let cardImg = document.getElementById(str);
    cardImg.classList.remove("outline2");
    cardImg.classList.add(this.hand[this.hand.length - 1].img);
  }

  calcTotal() {
    this.shown = 0;
    for (let i = 0; i < this.hand.length; i++) {
      if (!Number.isNaN(Number(this.hand[i].val))) {
        this.shown += Number(this.hand[i].val);
      } else if (this.hand[i].val != "A") {
        this.shown += 10;
      } else {
        if (this.shown + 11 <= 21) {
          this.shown += 11;
        } else {
          this.shown += 1;
        }
      }
    }
    this.updateTot();
    console.log(this.shown);
  }

  addCard() {
    if (this.hand.length < 5) {
      this.hand.push(deck[0]);
      deck.shift();
      this.showLastCard();
      this.calcTotal();
    }
  }
}

class Comp extends Player {
  constructor() {
    super();
    this.name="dealer";
  }
  //added conditional to addCard so that the second card isn't shown to the player
  addCard() {
    if (this.hand.length < 5) {
      this.hand.push(deck[0]);
      deck.shift();
      if (this.hand.length != 2) {
        this.showLastCard();
      } else {
        this.showBackCard();
      }
      super.calcTotal();
    }
  }
  showLastCard() {
    let str = `dealer${this.hand.length}`;
    let cardImg = document.getElementById(str);
    cardImg.classList.remove("outline");
    cardImg.classList.add(this.hand[this.hand.length - 1].img);
  }

  showBackCard() {
    let cardImg = document.getElementById(`dealer${this.hand.length}`);
    cardImg.classList.remove("outline");
    cardImg.classList.add("back");
  }

  showSecondCard() {
    let str = `dealer2`;
    let cardImg = document.getElementById(str);
    cardImg.classList.remove("back");
    cardImg.classList.add(this.hand[this.hand.length - 1].img);
  }
}

var game = {
  dealAll() {
    setTimeout(function () {
        player.addCard();
        
    }, 200);
    setTimeout(function () {
        computer.addCard();
        
    }, 400);
    setTimeout(function () {
        player.addCard();
        
    }, 600);
    setTimeout(function () {
        computer.addCard();
        
    }, 800);
    
    // computer.addCard();
    // player.addCard();
    // computer.addCard();
    document.getElementById("dealBut").disabled = true;
    document.getElementById("hitBut").disabled = false;
    document.getElementById("passBut").disabled = false;

  }
};

function shuffle() {
  for (let i = 0; i < 500; i++) {
    let location1 = Math.floor(Math.random() * deck.length);
    let location2 = Math.floor(Math.random() * deck.length);
    let tmp = deck[location1];

    deck[location1] = deck[location2];
    deck[location2] = tmp;
  }
}

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
let computer = new Comp();
initDeck();

console.log(player.shown);
console.log(computer.shown);
