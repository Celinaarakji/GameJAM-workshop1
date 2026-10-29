// Shared game plumbing is ready. Your two tasks live in multiplier.js and reset.js.
let score = 0;
const scoreDisplay = document.querySelector('#score');
function renderScore() {
  scoreDisplay.textContent = score;
}
document.querySelector('#click-button').addEventListener('click', () => {
  score += pointsPerClick();
  renderScore();
});
document.querySelector('#reset-button').addEventListener('click', resetScore);
renderScore();
