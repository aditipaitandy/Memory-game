// Array for card values (pairs of cards)
const cardValues = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

let cards = [];
let flippedCards = [];
let matchedCards = [];
let moveCount = 0;
let timer = 0;
let timerInterval;

// Create the shuffled deck
function createDeck() {
  let deck = [...cardValues, ...cardValues];
  deck = deck.sort(() => Math.random() - 0.5); // Shuffle

  return deck;
}

// Update moves
function updateMoves() {
  moveCount++;
  document.getElementById('moves').textContent = `Moves: ${moveCount}`;
}

// Start timer
function startTimer() {
  timerInterval = setInterval(() => {
    timer++;
    document.getElementById('timer').textContent = `Time: ${timer}s`;
  }, 1000);
}

// Initialize the game
function initializeGame() {
  cards = createDeck();
  matchedCards = [];
  flippedCards = [];
  moveCount = 0;
  timer = 0;
  clearInterval(timerInterval); // Stop any previous timer
  document.getElementById('timer').textContent = 'Time: 0s';
  document.getElementById('moves').textContent = 'Moves: 0';

  const cardGrid = document.querySelector('.card-grid');
  cardGrid.innerHTML = '';

  // Create the cards and add them to the grid
  cards.forEach((value, index) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.value = value;
    card.dataset.index = index;

    card.addEventListener('click', flipCard);
    cardGrid.appendChild(card);
  });

  startTimer(); // Start the timer when the game starts
}

// Flip the card
function flipCard(event) {
  const card = event.target;

  if (flippedCards.length === 2 || card.classList.contains('flipped') || card.classList.contains('matched')) {
    return;
  }

  card.classList.add('flipped');
  card.textContent = card.dataset.value;

  flippedCards.push(card);

  updateMoves(); // Update the move count

  // Check if two cards are flipped
  if (flippedCards.length === 2) {
    setTimeout(checkMatch, 1000);
  }
}

// Check if the flipped cards match
function checkMatch() {
  const [firstCard, secondCard] = flippedCards;

  if (firstCard.dataset.value === secondCard.dataset.value) {
    firstCard.classList.add('matched');
    secondCard.classList.add('matched');
    matchedCards.push(firstCard, secondCard);
  } else {
    firstCard.classList.remove('flipped');
    secondCard.classList.remove('flipped');
    firstCard.textContent = '';
    secondCard.textContent = '';
  }

  flippedCards = [];

  // Check if the game is over
  if (matchedCards.length === cards.length) {
    clearInterval(timerInterval); // Stop the timer
    setTimeout(() => alert(`Congratulations, you won in ${moveCount} moves and ${timer} seconds!`), 500);
  }
}

// Reset the game
document.getElementById('resetButton').addEventListener('click', initializeGame);

// Initialize the game on page load
initializeGame();
