// Our Elements

const minNum = document.querySelector(".min-num"),
  maxNum = document.querySelector(".max-num"),
  input = document.querySelector("#guess-input"),
  submit = document.querySelector("#guess-btn"),
  msg = document.querySelector(".message");

// Game Values

let max = 10,
  min = 1,
  winningNum = Math.floor(Math.random() * (max - min + 1) + min),
  guessesLeft = 3;

minNum.textContent = min;
maxNum.textContent = max;

submit.addEventListener("click", () => {
  const guess = parseInt(input.value);
  // Validate
  if (isNaN(guess) || guess > max || guess < min) {
    setMsg(`Enter A Number Between ${min} And ${max}`, "red");
  } else {
    // Check If Won
    if (guess === winningNum) {
      gameOver(`${guess} Is Correct YOU WON!`, "green");
    } else {
      guessesLeft -= 1;
      if (guessesLeft === 0) {
        gameOver(`Game Over The Correct Number Was ${winningNum}`, "red");
      } else {
        input.value = "";
        setMsg(`${guess} Is Wrong! You Have ${guessesLeft} Guesses Left`, "red");
      }
    }
  }
});

// Play Again
submit.addEventListener("mousedown", e => {
  if (e.target.className === "play-again") {
    window.location.reload();
  }
});

// Set Message
function setMsg(message, color) {
  msg.textContent = message;
  msg.style.color = color;
}

// Game Over
function gameOver(text, color) {
  input.disabled = true;
  input.style.borderColor = color;
  msg.style.color = color;
  setMsg(text);
  submit.value = "Play Again";
  submit.className += "play-again";
}