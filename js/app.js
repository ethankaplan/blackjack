var deck = [];
class Player {
  constructor() {
    this.money = 100;
    this.hand = [];
    this.split = [];
    this.shown = 0;
    this.name = "play";
    this.bet = 5;
  }

  updateTot() {
    let str = `${this.name}Total`;

    document.getElementById(str).innerHTML = this.shown;
  }

  showLastCard() {
    let str = `play${this.hand.length}`;
    let cardImg = document.getElementById(str);
    cardImg.classList.remove("outline2");
    cardImg.classList.add(this.hand[this.hand.length - 1].img);
  }

  calcTotal() {
    this.shown = 0;
    let aces = 0;
    for (let i = 0; i < this.hand.length; i++) {
      if (!Number.isNaN(Number(this.hand[i].val))) {
        this.shown += Number(this.hand[i].val);
      } else if (this.hand[i].val != "A") {
        this.shown += 10;
      } else {
        this.shown += 11;
        aces++;
      }
    }
    while (aces > 0 && this.shown > 21) {
      this.shown -= 10;
      aces--;
    }
    this.updateTot();
  }

  addCard() {
    if (this.hand.length < 5) {
      this.hand.push(deck[0]);
      deck.shift();
      this.showLastCard();
      this.calcTotal();
      if (this.shown > 21) {
        standing();
      } else if (this.hand.length == 5) {
        standing();
      }
    }
  }
}

class Comp extends Player {
  constructor() {
    super();
    this.name = "dealer";
    this.secondLive = false;
  }
  //added logic to ignore 2nd card if it's not revealed
  calcTotal() {
    this.shown = 0;
    for (let i = 0; i < this.hand.length; i++) {
      if (i != 1 || this.secondLive) {
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
    }
    this.updateTot();
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
      this.calcTotal();
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
    this.secondLive = true;
    this.calcTotal();
  }
}

var game = {
  resetToDefault() {
    //resets board to neutral state
    //clear hands
    document.getElementById("down5").disabled = false;
    document.getElementById("up5").disabled = false;
    let playhand = player.hand.length;
    let comphand = computer.hand.length;
    for (let i = 0; i < playhand; i++) {
      let str = `play${i + 1}`;
      let cardImg = document.getElementById(str);

      cardImg.classList.add("outline2");

      cardImg.classList.remove(player.hand[0].img);
      player.hand.shift();
    }
    for (let i = 0; i < comphand; i++) {
      let str = `dealer${i + 1}`;
      let cardImg = document.getElementById(str);

      cardImg.classList.add("outline");
      cardImg.classList.remove(computer.hand[0].img);
      computer.hand.shift();
    }
    //reset text on screen
    document.getElementById("result").innerHTML =
      " is currently at <span id=playTotal>0</span>";
    computer.calcTotal();
    //resets computer's second card visibility
    computer.secondLive = false;
  },
  dealAll() {
    this.resetToDefault();

    initDeck();
    setTimeout(function() {
      player.addCard();
    }, 200);
    setTimeout(function() {
      computer.addCard();
    }, 400);
    setTimeout(function() {
      player.addCard();
    }, 600);
    setTimeout(function() {
      computer.addCard();

      if (player.shown == 21) {
        standing();
      }
    }, 800);

    document.getElementById("down5").disabled = true;
    document.getElementById("up5").disabled = true;

    // computer.addCard();
    // player.addCard();
    // computer.addCard();
    document.getElementById("dealBut").disabled = true;
    document.getElementById("hitBut").disabled = false;
    document.getElementById("passBut").disabled = false;
    document.getElementById("dubBut").disabled=false;
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

let doubledown =()=>{
  betChange(player.bet);
  player.addCard();
  standing();
}

var standing = () => {
  // document.getElementById("dealBut").disabled = false;
  // document.getElementById("hitBut").disabled = true;
  // document.getElementById("passBut").disabled = true;

  document.getElementById("down5").disabled = true;
  document.getElementById("up5").disabled = true;
  setTimeout(function() {
    computer.showSecondCard();
  }, 200);

  setTimeout(function() {
    while (
      player.shown <= 21 &&
      computer.shown < 17 &&
      computer.hand.length < 5 &&
      computer.shown <= player.shown
    ) {
      computer.addCard();
    }
  }, 400);

  setTimeout(function() {
    findWinner();
  }, 600);

  document.getElementById("dealBut").value = "New Hand";
  document.getElementById("dealBut").disabled = false;
  document.getElementById("hitBut").disabled = true;
  document.getElementById("passBut").disabled = true;
  document.getElementById("dubBut").disabled=true;
};

var findWinner = () => {
  console.log(`Player total ${player.shown}, hand ${player.hand.length}`);
  console.log(`Computer total ${computer.shown}, hand ${computer.hand.length}`);
  console.log("--------------");
  if (player.shown <= 21 || computer.shown <= 21) {
    if (player.shown == 21 && player.hand.length == 2) {
      if (computer.shown != 21 || computer.hand.length > 2) {
        document.getElementById("result").innerHTML = "YOU GOT A BLACKJACK!";
        player.money += player.bet * 1.5;
      } else if (computer.shown == 21 && computer.hand.length == 2) {
        document.getElementById("result").innerHTML =
          "Both got blackjack, it's a tie!";
      }
    } else if (computer.shown == 21 && computer.hand.length == 21) {
      document.getElementById("result").innerHTML =
        "Dealer blackjack, you lost.";
      player.money -= player.bet;
    } else if (computer.shown > player.shown && computer.shown <= 21) {
      document.getElementById("result").innerHTML = "The dealer's hand won";
      player.money -= player.bet;
    } else if (player.shown > computer.shown && player.shown <= 21) {
      document.getElementById("result").innerHTML = "Your hand won!";
      player.money += player.bet;
    } else if (player.shown > 21 && computer.shown <= 21) {
      document.getElementById("result").innerHTML = "You bust! Dealer won";
      player.money -= player.bet;
    } else if (player.shown <= 21 && computer.shown > 21) {
      document.getElementById("result").innerHTML =
        "The dealer bust! You've won";
      player.money += player.bet;
    } else if (player.shown > 21 && computer.shown > 21) {
      document.getElementById("result").innerHTML = "Double bust! Tie";
    }
  } else {
    alert("EDGE CASE PLEASE ADDRESS");
  }

  document.getElementById("nowMoney").innerText = player.money;
  if (player.money > 0) {
    document.getElementById("down5").disabled = false;
    document.getElementById("up5").disabled = false;
    document.getElementById("betAmount").innerText = 5;
  } else {
    document.getElementById("result").innerHTML = "You're out of money!";
    document.getElementById("result").setAttribute("style", "color:white");
    document.getElementById("down5").disabled = true;
    document.getElementById("up5").disabled = true;
    document.getElementById("dealBut").disabled = true;
  }
  player.bet = 5;
};

var betChange = num => {
  console.log(`money: ${player.money}, bet before: ${player.bet}`);
  if (player.bet + num > 0 && player.bet + num <= player.money) {
    player.bet += num;
    player.bet += player.bet % 5;
    document.getElementById("betAmount").innerText = player.bet;
  } else if (player.bet + num > player.money) {
    player.bet = player.money;
    document.getElementById("betAmount").innerText = player.bet;
  }
  console.log(`bet after ${player.bet}`);
};

//working area

let player = new Player();
document.getElementById("nowMoney").innerText = player.money;
let computer = new Comp();
