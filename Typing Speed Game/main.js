const words = [
  "Programming",
  "Elzero",
  "Khaled",
  "Menna",
  "Coding",
  "React",
  "JavaScript",
  "PHP",
  "Hello",
  "Testing",
  "Country",
  "GITHUB",
  "LeetCode",
  "Python",
  "Town",
  "Twitter",
  "Facebook",
  "Paradigm",
  "Arrays",
  "Statement",
];

// Setting levels
const lvl = {
  Easy: 5,
  Normal: 3,
  Hard: 2,
};

// Default Level
let defaultLvlName = "Easy";
let defaultLvlSeconds = lvl[defaultLvlName];

// Catch Elements
let startBtn = document.querySelector(".start"),
  lvlNameSpan = document.querySelector(".message .lvl"),
  secondsSpan = document.querySelector(".message .seconds"),
  theWord = document.querySelector(".the-word"),
  upcomingWords = document.querySelector(".upcoming-words"),
  input = document.querySelector(".input"),
  timeLeftSpan = document.querySelector(".time span"),
  scoreGot = document.querySelector(".score .got"),
  scoreTotal = document.querySelector(".score .total"),
  finishMsg = document.querySelector(".finish");

lvlNameSpan.innerHTML = defaultLvlName;
secondsSpan.innerHTML = defaultLvlSeconds;
scoreTotal.innerHTML = words.length;
timeLeftSpan.innerHTML = defaultLvlSeconds;

// Disable Paste Event
input.onpaste = function () {
  return false;
};

startBtn.onclick = function () {
  this.remove();
  input.focus();
  getWords();
};

function getWords() {
  let randomWord = words[Math.floor(Math.random() * words.length)];
  let wordIndex = words.indexOf(randomWord);
  words.splice(wordIndex, 1);
  theWord.innerHTML = randomWord;
  upcomingWords.innerHTML = "";
  for (let i = 0; i < words.length; i++) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(words[i]));
    upcomingWords.appendChild(div);
  }
  startPlay();
}

function startPlay() {
  timeLeftSpan.innerHTML = defaultLvlSeconds;
  let start = setInterval(() => {
    timeLeftSpan.innerHTML--;
    if (timeLeftSpan.innerHTML === "0") {
      // Stop Timer
      clearInterval(start);
      // Compare Words
      if (input.value.toLowerCase() === theWord.innerHTML.toLowerCase()) {
        // Add To Score
        scoreGot.innerHTML++;
        // Clear Input
        input.value = "";
        // Generate New Word
        if (words.length > 0) {
          getWords();
        } else {
          let span = document.createElement("span");
          span.className = "good";
          span.appendChild(document.createTextNode("Congratulations!"));
          finishMsg.appendChild(span);
          upcomingWords.remove();
          input.disabled = true;
        }
      } else {
        let span = document.createElement("span");
        span.className = "bad";
        span.appendChild(document.createTextNode("Game Over"));
        finishMsg.appendChild(span);
        input.disabled = true;
      }
    }
  }, 1000);
}