// Generate Letters

const letters = "abcdefghijklmnopqrstuvwxyz";
const lettersArr = [...letters];
const LettersContainer = document.querySelector(".letters");

lettersArr.forEach(letter => {
  const span = document.createElement("span");
  span.appendChild(document.createTextNode(letter));
  span.className = "letter-box";
  LettersContainer.appendChild(span);
});

const words = {
  programming: [
    "php",
    "javascript",
    "go",
    "scala",
    "fortran",
    "r",
    "mysql",
    "python",
  ],
  movies: [
    "Prestige",
    "Inception",
    "Parasite",
    "Interstellar",
    "Whiplash",
    "Memento",
    "Coco",
    "Up",
  ],
  people: [
    "Albert Einstein",
    "Hitchcock",
    "Alexander",
    "Cleopatra",
    "Mahatma Ghandi",
  ],
  countries: ["Syria", "Palestine", "Yemen", "Egypt", "Bahrain", "Qatar"],
};

// Generate Random Words

const allKeys = Object.keys(words);
const randomPropNumber = Math.floor(Math.random() * allKeys.length);
const randomPropName = allKeys[randomPropNumber];
const randomPropValue = words[randomPropName];
const randomValueNumber = Math.floor(Math.random() * randomPropValue.length);
const randomValueValue = randomPropValue[randomValueNumber];

document.querySelector(".game-info span").innerHTML = randomPropName;

// Create Letter Guess Box
const letterGuessContainer = document.querySelector(".letters-guess");
const lettersAndSpace = Array.from(randomValueValue);

lettersAndSpace.forEach(letter => {
  const emptySpan = document.createElement("span");
  if (letter === " ") {
    emptySpan.className = "with-space";
  }
  letterGuessContainer.appendChild(emptySpan);
});

const guessSpans = document.querySelectorAll(".letters-guess span");
let wrongAttempts = 0;
const draw = document.querySelector(".hangman-draw");

// Handle Clicking On Letters
document.addEventListener("click", e => {
  let theStatus = false;
  if (e.target.className === "letter-box") {
    e.target.classList.add("clicked");
    const clickedLetter = e.target.innerHTML.toLowerCase();
    const chosenWord = Array.from(randomValueValue.toLowerCase());
    // Looping On WordLetters
    chosenWord.forEach((word, wordIndex) => {
      if (clickedLetter === word) {
        theStatus = true;
        // Looping On Guess Spans
        guessSpans.forEach((span, spanIndex) => {
          if (wordIndex === spanIndex) {
            span.innerHTML = word;
          }
        });
      }
    });
    if (theStatus !== true) {
      wrongAttempts++;
      draw.classList.add(`wrong-${wrongAttempts}`);
      if (wrongAttempts === 8) {
        endGame();
        LettersContainer.classList.add("finished");
      }
    }
  }
});

function endGame() {
  const div = document.createElement("div");
  div.appendChild(
    document.createTextNode(`Game Over The Word Is ${randomValueValue}`)
  );
  div.className = "popup";
  document.body.appendChild(div);
}

function cong() {
  const div = document.createElement("div");
  div.appendChild(document.createTextNode(`Congratulations`));
  div.className = "popup";
  document.body.appendChild(div);
}
