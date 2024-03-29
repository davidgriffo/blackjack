//
// Blackjack
// by Mark Zamoyta
//

// Card variables
let suits = ['Hearts', 'Clubs', 'Diamonds', 'Spades'],
    values = ['Ace', 'King', 'Queen', 'Jack', 
    'Ten', 'Nine', 'Eight', 'Seven', 'Six',
    'Five', 'Four', 'Three', 'Two'];

// DOM variables
let textArea = document.getElementById('text-area'),
    newGameButton = document.getElementById('new-game-button'),
    hitButton = document.getElementById('hit-button'),
    stayButton = document.getElementById('stay-button'),
    dealerText = document.getElementById('dealerText'),
    player1Text = document.getElementById('player1Text'),
    player2Text = document.getElementById('player2Text'),
    player3Text = document.getElementById('player3Text'),
    dealerArea = document.getElementById('dealer'),
    player1Area = document.getElementById('player1'),
    player2Area = document.getElementById('player2'),
    player3Area = document.getElementById('player3')


// Game variables
let gameStarted = false,
    gameOver = false,
    playerWon = false,
    dealerCards = [],
    playerCards = [],
    dealerScore = 0,
    playerScore = 0,
    deck = [];

hitButton.hidden = true;
stayButton.hidden = true;
dealerArea.hidden= true;
player1Area.hidden = true;
player2Area.hidden = true;
player3Area.hidden = true;
//player1Text.style.display = 'none';
//player2Text.style.display = 'none';
showStatus();
  
newGameButton.addEventListener('click', function() {
  gameStarted = true;
  gameOver = false;
  playerWon = false;
  
  deck = createDeck();
  shuffleDeck(deck);
  dealerCards = [ getNextCard(), getNextCard() ];
  playerCards = [ getNextCard(), getNextCard() ];
  
  //newGameButton.style.display = 'none';
  newGameButton.hidden = true;
  hitButton.style.display = 'inline';
  stayButton.style.display = 'inline';
  textArea.innerText = '';
  showStatus();
});

hitButton.addEventListener('click', function() {
  playerCards.push(getNextCard());
  checkForEndOfGame();
  showStatus();
});

stayButton.addEventListener('click', function() {
  gameOver = true;
  checkForEndOfGame();
  showStatus();
});


function createDeck() {
    let deck = [];
    for (let suitIdx = 0; suitIdx < suits.length; suitIdx++) {
        for (let valueIdx = 0; valueIdx < values.length; valueIdx++) {
            let card = {
                suit: suits[suitIdx],
                value: values[valueIdx]
                
            };
            deck.push( card );
        }
    }
    return deck;
}

function shuffleDeck(deck) {
  for (let i = 0; i < deck.length; i++) {
    let swapIdx = Math.trunc(Math.random() * deck.length);
    let tmp = deck[swapIdx];
    deck[swapIdx] = deck[i];
    deck[i] = tmp;
  }
}

function getCardString(card) {
    return card.value + ' of ' + card.suit;
}

function getNextCard() {
    return deck.shift();
}

function getCardNumericValue(card) {
  switch(card.value) {
    case 'Ace':
      return 1;
    case 'Two':
      return 2;
    case 'Three':
      return 3;
    case 'Four':
      return 4;
    case 'Five': 
      return 5;
    case 'Six':
      return 6;
    case 'Seven':
      return 7;
    case 'Eight':
      return 8;
    case 'Nine':
      return 9;
    default:
      return 10;
  }
}

function getScore(cardArray) {
  let score = 0;
  let hasAce = false;
  for (let i = 0; i < cardArray.length; i++) {
    let card = cardArray[i];
    score += getCardNumericValue(card);
    if (card.value === 'Ace') {
      hasAce = true;
    }
  }
  if (hasAce && score + 10 <= 21) {
    return score + 10;
  }
  return score;
}

function updateScores() {
  dealerScore = getScore(dealerCards);
  playerScore = getScore(playerCards);
}

function checkForEndOfGame() {
  
  updateScores();
  
  if (gameOver) {
    // let dealer take cards
    while(dealerScore < playerScore 
          && playerScore <= 21 
          && dealerScore <= 21) {
      dealerCards.push(getNextCard());
      updateScores();
    }
  }
  
  if (playerScore > 21) {
    playerWon = false;
    gameOver = true;
  }
  else if (dealerScore > 21) {
    playerWon = true;
    gameOver = true;
  }
  else if (gameOver) {
    
    if (playerScore > dealerScore) {
      playerWon = true;
    }
    else {
      playerWon = false;
    }
  }
}

function showStatus() {
  if (!gameStarted) {
    textArea.innerText = 'Welcome to Blackjack!';
    return;
  }
  hitButton.hidden = false;
  stayButton.hidden = false;
  
  let dealerCardString = '';
  for (let i=0; i < dealerCards.length; i++) {
    dealerCardString += getCardString(dealerCards[i]) + '\n';
  }
  
  let playerCardString = '';
  for (let i=0; i < playerCards.length; i++) {
    playerCardString += getCardString(playerCards[i]) + '\n';
  }
  
  updateScores();
   
  
  dealerArea.hidden= false;
  player1Area.hidden = false;

  //player1Heading.innerText = 'Dealer';
  dealerText.innerText = dealerCardString +   '(score: '+ dealerScore  + ')\n\n';

  //player2Heading.innerText = 'Player 1';
  player1Text.innerText =  playerCardString +   '(score: '+ playerScore  + ')\n\n';

  
  if (gameOver) {
    if (playerWon) {
      textArea.innerText = "YOU WIN!";
    }
    else {
      textArea.innerText = "DEALER WINS";
    }
    newGameButton.style.display = 'inline';
    newGameButton.hidden = false;
    hitButton.style.display = 'none';
    stayButton.style.display = 'none';
  }

}
