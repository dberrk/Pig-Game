'use strict';
const player1 = document.querySelector('.player--0');
const player2 = document.querySelector('.player--1');
const score1 = document.querySelector('#score--0');
const score2 = document.getElementById('score--1');
const current1 = document.getElementById('current--0');
const current2 = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  current1.textContent = 0;
  current2.textContent = 0;
  score1.textContent = 0;
  score2.textContent = 0;

  diceEl.classList.add('hidden');
  player1.classList.remove('player--winner');
  player2.classList.remove('player--winner');
  player1.classList.add('player--active');
  player2.classList.remove('player--active');
};
init();
const switchPlayer = function () {
  document.querySelector(`#current--${activePlayer}`).textContent = 0;

  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player1.classList.toggle('player--active');
  player2.classList.toggle('player--active');
};
//Starting conditions

// rolling dice function
btnRoll.addEventListener('click', function () {
  if (playing) {
    // generate random number
    const dice = Math.trunc(Math.random() * 6) + 1;

    // display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `assets/dice-${dice}.png`;

    // check
    if (dice !== 1) {
      // Add dice to current score
      currentScore += dice;
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // add current score to active player's total score
    scores[activePlayer] += currentScore;

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // Check if player's score is greater than 100
    if (scores[activePlayer] >= 100) {
      playing = false;
      diceEl.classList.add('hidden');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document.querySelector(`.player--${activePlayer}`).classList.remove =
        'player--active';
    } else {
      switchPlayer();
    }
    // Finish the game

    // switch player
  }
});

btnNew.addEventListener('click', init); // reset the game
