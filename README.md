# wordle game!
- Still in progress currenly workong on js part
wordle type game using html, css, js 




Recreating the word game Wordle. If you're not familiar with Wordle, here's how you play


There is a secret five letter word chosen

1. Players have six guesses to figure out the secret word. After six guesses, they lose
2. If the player guesses a letter that is in the right place, it is shown as green
3. If the player guesses a letter that is in the word but not in the right place, it is shown as yellow
4. It does account for however many of the letter exist in the word. For example, if the player guesses "SPOOL" and the word is "OVERT", one "O" is shown as yellow and the second one is not.
5. If the player guesses the right word, the player wins and the game is over.




APIs Used


GET https://words.dev-apis.com/word-of-the-day

This will give you the word of the day. It changes every night at midnight
The response will look like this: {"word":"humph","puzzleNumber":3} where the word is the current word of the day and the puzzleNumber is which puzzle of the day it is
If you add random=1 to the end of your URL (words.dev-apis.com/wordof-the-day/get-word-of-the-day?random=1) then it will give you a random word of the day, not just the same daily one.
If you add puzzle=<number> to the end of your URL (words.dev-apis.com/wordof-the-day/get-word-of-the-day?puzzle=1337) then it will give you the same word every time.



  POST https://words.dev-apis.com/validate-word

You must POST to this endpoint, not GET.
The endpoint expects JSON with a property called "word". A valid post body would be { "word": "crane" }.
The API will return back to you the word you sent and validWord which will be true or false. e.g. { "word": "crane", "validWord": true } or { "word": "asdfg", "validWord": false }.
This endpoint only validates five letter words.
This endpoint only validates English words and will not validate any accents or non-letter characters
Do this part last. It's the hardest part to get right.
  
  
  
  
  
 High Level Overview of Steps to Take:


1. Write all HTML. Get all the divs and everything that you'll need. Make sure to link a stylesheet and a script to run your CSS and JS
  
2. CSS . Write the CSS to get to the state where everything looks right.
  
3. Starting on the JS, get the core mechanic of typing down. You'll have to handle
-Handle a keystroke with a letter.
-Handle a wrong keystroke (like a number or spacebar). Ignore it.
-Handle "Enter" when the word is complete (go to the next line)
-Handle "Enter" when the word is incomplete (ignore it)
-Handle "Backspace" when there's a letter to delete
-Handle "Backspace" when there's no letter to delete

  
  4. APIs. Handle the API request to get the word of the day

  5. Handle checking just if the word submitted after a user hits enter is the word is the correct word

  6. Handle the "win" condition 

  7. Handle the "lose" condition 

  8. Handle the guess's correct letter in the correct space (the green squares)

  9. Handle the guess's wrong letters outright (the gray squares)

  
10. Handle the yellow squares
  -Handle the correct letters, wrong space (the yellow squares) naïvely. If a word contains the letter at all but it's in the wrong square, just mark it yellow.
  -Handle the yellow squares correctly. For example, if the player guesses "SPOOL" and the word is "OVERT", one "O" is shown as yellow and the second one is not. Green squares count too.

  11. Add some indication that a user needs to wait for you waiting on the API, some sort of loading spinner.

  12. Add the second API call to make sure a user is requesting an actual word.

  13. Add some visual indication that the user guessed something isn't an actual word (I have the border flash red on the current line)
  
  14. Add some cool  animation for a user winning (
  
  
  
  
  
  
  

