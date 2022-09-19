// query the dom for all the things i know i will need

//all of the letters
const letters = document.querySelectorAll(".scoreboard-letter");

//loading div
const loadingDiv = document.querySelector(".info-bar");

const ANSWER_LENGTH = 5;

//can now use await whenever we need to
//keep event listener simple
async function init() {
  //used to keep track of current input
  let currentGuess = "";
  let currentRow = 0;

  //get word of the day
  //respone from api
  const res = await fetch("https://words.dev-apis.com/word-of-the-day");
  const resObj = await res.json();
  const word = resObj.word.toUpperCase();
  const wordParts = word.split("");

  isLoading = false;
  setLoading(isLoading);

  console.log(word);

  //we already know input will be a single letter
  // need to determire what happens when more than 5 chars are typed
  function addLetter(letter) {
    //add letter to the end
    if (currentGuess.length < ANSWER_LENGTH) {
      currentGuess += letter;
    } else {
      //replace the last letter
      currentGuess =
        currentGuess.substring(0, currentGuess.length - 1) + letter;
    }

    //need to asign the current guess to DOM
    letters[ANSWER_LENGTH * currentRow + currentGuess.length - 1].innerText =
      letter;
  }

  //what happens when enter is hit
  async function commit() {
    if (currentGuess.length !== ANSWER_LENGTH) {
      //do nothing
      return;
    }

    // TODO validate the word

    // TODO do all marking as correct, close or wrong

    const guessParts = currentGuess.split("");

    for (let i = 0; i < ANSWER_LENGTH; i++) {
      //mark as correct
      if (guessParts[i] === wordParts[i]) {
        letters[currentRow * ANSWER_LENGTH + i].classList.add("correct");
      }

      for (let i = 0; i < ANSWER_LENGTH; i++) {
        if (guessParts[i] === wordParts[i]) {
          //do nothing alreay done
          //make this more acrure
        } else if (wordParts.includes(guessParts[i])) {
          letters[currentRow * ANSWER_LENGTH + i].classList.add("close");
        } else {
          letters[currentRow * ANSWER_LENGTH + i].classList.add("wrong");
        }
      }
    }

    // TODO did they win or lose

    currentRow++;
    currentGuess = "";
  }

  //backspace key functionality
  function backspace() {
    currentGuess = currentGuess.substring(0, currentGuess.length - 1);
    letters[ANSWER_LENGTH * currentRow + currentGuess.length].innerText = "";
  }

  document.addEventListener("keydown", function handleKeyPress(event) {
    const action = event.key;

    //delegate to other functions to keep event listener simmple

    //this is for when a user is trying to guess something and enter is pressed
    if (action === "Enter") {
      commit();
    } else if (action === "Backspace") {
      backspace();
    } else if (isLetter(action)) {
      addLetter(action.toUpperCase());
    } else {
      //do nothing
    }
  });
}

//regex to determine if it is a letter
function isLetter(letter) {
  return /^[a-zA-Z]$/.test(letter);
}

function setLoading(isLoading) {
  loadingDiv.classList.toggle("hidden", !isLoading);
}

init();

