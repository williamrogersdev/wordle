// query the dom for all the things i know i will need

//all of the letters
const letters = document.querySelectorAll(".scoreboard-letter");

//loading div
const loadingDiv = document.querySelector(".info-bar");

const ANSWER_LENGTH = 5;
const ROUND = 6;

//can now use await whenever we need to
//keep event listener simple
async function init() {
  //used to keep track of current input
  let currentGuess = "";
  let currentRow = 0;
  let isLoading = true;

  //get word of the day
  //respone from api
  const res = await fetch("https://words.dev-apis.com/word-of-the-day");
  const resObj = await res.json();
  const word = resObj.word.toUpperCase();
  const wordParts = word.split("");
  let done = false;

  setLoading(false);
  isLoading = false;

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
      done = true;
      return;
    }

    //if they get every letter correct you win

    // TODO validate the word

    isLoading = true;
    setLoading(true);
    const res = await fetch("https://words.dev-apis.com/validate-word", {
      method: "POST",
      body: JSON.stringify({ word: currentGuess }),
    });

    const resObj = await res.json();
    const validWord = resObj.validWord;

    isLoading = false;
    setLoading(false);

    if (!validWord) {
      markInvalidWord();
    }

    // TODO do all marking as correct, close or wrong

    const guessParts = currentGuess.split("");
    const map = makeMap(wordParts);
    console.log(map);

    for (let i = 0; i < ANSWER_LENGTH; i++) {
      //mark as correct
      if (guessParts[i] === wordParts[i]) {
        letters[currentRow * ANSWER_LENGTH + i].classList.add("correct");
        map[guessParts[i]]--;
      }

      for (let i = 0; i < ANSWER_LENGTH; i++) {
        if (guessParts[i] === wordParts[i]) {
          //do nothing alreay done
          //make this more acrure
        } else if (
          wordParts.includes(guessParts[i]) &&
          map[guessParts[i] > 0]
        ) {
          //mark as close to being right
          letters[currentRow * ANSWER_LENGTH + i].classList.add("close");
          map[guessParts[i]]--;
        } else {
          letters[currentRow * ANSWER_LENGTH + i].classList.add("wrong");
        }
      }
    }

    // TODO did they win or lose

    //they win if they get every letter correct

    currentRow++;

    if (currentGuess === word) {
      //win
      alert("you win");
      document.querySelector(".brand").classList.add("winner");
      done = true;
      return;
    } else if (currentRow === ROUND) {
      alert(`you lose!, the word was ${word}`);
      done = true;
    }
    currentGuess = "";
  }

  //backspace key functionality
  function backspace() {
    currentGuess = currentGuess.substring(0, currentGuess.length - 1);
    letters[ANSWER_LENGTH * currentRow + currentGuess.length].innerText = "";
  }

  function markInvalidWord() {
    for (let i = 0; i < ANSWER_LENGTH; i++) {
      letters[currentRow * ANSWER_LENGTH + i].classList.remove("invalid");

      // long enough for the browser to repaint without the "invalid class" so we can then add it again
      setTimeout(
        () => letters[currentRow * ANSWER_LENGTH + i].classList.add("invalid"),
        10
      );
    }
  }

  document.addEventListener("keydown", function handleKeyPress(event) {
    if (done || isLoading) {
      //do nothing
      return;
    }

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
  loadingDiv.classList.toggle("show", isLoading);
}

//create a map obj to store amount of letters in a word
function makeMap(array) {
  const obj = {};
  for (let i = 0; i < array.length; i++) {
    const letter = array[i];
    if (obj[letter]) {
      obj[letter]++;
    } else {
      obj[letter] = 1;
    }
  }

  return obj;
}

init();

// const ANSWER_LENGTH = 5;
// const ROUNDS = 6;
// const letters = document.querySelectorAll(".scoreboard-letter");
// const loadingDiv = document.querySelector(".info-bar");

// // I like to do an init function so I can use "await"
// async function init() {
//   // the state for the app
//   let currentRow = 0;
//   let currentGuess = "";
//   let done = false;
//   let isLoading = true;

//   // nab the word of the day
//   const res = await fetch("https://words.dev-apis.com/word-of-the-day");
//   const { word: wordRes } = await res.json();
//   const word = wordRes.toUpperCase();
//   const wordParts = word.split("");
//   isLoading = false;
//   setLoading(isLoading);

//   // user adds a letter to the current guess
//   function addLetter(letter) {
//     if (currentGuess.length < ANSWER_LENGTH) {
//       currentGuess += letter;
//     } else {
//       current = currentGuess.substring(0, currentGuess.length - 1) + letter;
//     }

//     letters[currentRow * ANSWER_LENGTH + currentGuess.length - 1].innerText =
//       letter;
//   }

//   // use tries to enter a guess
//   async function commit() {
//     if (currentGuess.length !== ANSWER_LENGTH) {
//       // do nothing
//       return;
//     }

//     // check the API to see if it's a valid word
//     // skip this step if you're not checking for valid words
//     isLoading = true;
//     setLoading(isLoading);
//     const res = await fetch("https://words.dev-apis.com/validate-word", {
//       method: "POST",
//       body: JSON.stringify({ word: currentGuess }),
//     });
//     const { validWord } = await res.json();
//     isLoading = false;
//     setLoading(isLoading);

//     // not valid, mark the word as invalid and return
//     if (!validWord) {
//       markInvalidWord();
//       return;
//     }

//     const guessParts = currentGuess.split("");
//     const map = makeMap(wordParts);
//     let allRight = true;

//     // first pass just finds correct letters so we can mark those as
//     // correct first
//     for (let i = 0; i < ANSWER_LENGTH; i++) {
//       if (guessParts[i] === wordParts[i]) {
//         // mark as correct
//         letters[currentRow * ANSWER_LENGTH + i].classList.add("correct");
//         map[guessParts[i]]--;
//       }
//     }

//     // second pass finds close and wrong letters
//     // we use the map to make sure we mark the correct amount of
//     // close letters
//     for (let i = 0; i < ANSWER_LENGTH; i++) {
//       if (guessParts[i] === wordParts[i]) {
//         // do nothing
//       } else if (map[guessParts[i]] && map[guessParts[i]] > 0) {
//         // mark as close
//         allRight = false;
//         letters[currentRow * ANSWER_LENGTH + i].classList.add("close");
//         map[guessParts[i]]--;
//       } else {
//         // wrong
//         allRight = false;
//         letters[currentRow * ANSWER_LENGTH + i].classList.add("wrong");
//       }
//     }

//     currentRow++;
//     if (allRight) {
//       // win
//       alert("you win");
//       document.querySelector(".brand").classList.add("winner");
//       done = true;
//     } else if (currentRow === ROUNDS) {
//       // lose
//       alert(`you lose, the word was ${word}`);
//       done = true;
//     }
//     currentGuess = "";
//   }

//   // user hits backspace, if the the length of the string is 0 then do
//   // nothing
//   function backspace() {
//     currentGuess = currentGuess.substring(0, currentGuess.length - 1);
//     letters[currentRow * ANSWER_LENGTH + currentGuess.length].innerText = "";
//   }

//   // let the user know that their guess wasn't a real word
//   // skip this if you're not doing guess validation
//   function markInvalidWord() {
//     for (let i = 0; i < ANSWER_LENGTH; i++) {
//       letters[currentRow * ANSWER_LENGTH + i].classList.remove("invalid");

//       // long enough for the browser to repaint without the "invalid class" so we can then add it again
//       setTimeout(
//         () => letters[currentRow * ANSWER_LENGTH + i].classList.add("invalid"),
//         10
//       );
//     }
//   }

//   // listening for event keys and routing to the right function
//   // we listen on keydown so we can catch Enter and Backspace
//   document.addEventListener("keydown", function handleKeyPress(event) {
//     if (done || isLoading) {
//       // do nothing;
//       return;
//     }

//     const action = event.key;

//     if (action === "Enter") {
//       commit();
//     } else if (action === "Backspace") {
//       backspace();
//     } else if (isLetter(action)) {
//       addLetter(action.toUpperCase());
//     } else {
//       // do nothing
//     }
//   });
// }

// // a little function to check to see if a character is alphabet letter
// // this uses regex (the /[a-zA-Z]/ part) but don't worry about it
// // you can learn that later and don't need it too frequently
// function isLetter(letter) {
//   return /^[a-zA-Z]$/.test(letter);
// }

// // show the loading spinner when needed
// function setLoading(isLoading) {
//   loadingDiv.classList.toggle("hidden", !isLoading);
// }

// // takes an array of letters (like ['E', 'L', 'I', 'T', 'E']) and creates
// // an object out of it (like {E: 2, L: 1, T: 1}) so we can use that to
// // make sure we get the correct amount of letters marked close instead
// // of just wrong or correct
// function makeMap(array) {
//   const obj = {};
//   for (let i = 0; i < array.length; i++) {
//     if (obj[array[i]]) {
//       obj[array[i]]++;
//     } else {
//       obj[array[i]] = 1;
//     }
//   }
//   return obj;
// }

// init();

