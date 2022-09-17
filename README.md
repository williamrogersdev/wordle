# wordle
wordle type game using html, css, js 




Recreating the word game Wordle. If you're not familiar with Wordle, here's how you play


There is a secret five letter word chosen

1. Players have six guesses to figure out the secret word. After six guesses, they lose
2. If the player guesses a letter that is in the right place, it is shown as green
3. If the player guesses a letter that is in the word but not in the right place, it is shown as yellow
4. It does account for however many of the letter exist in the word. For example, if the player guesses "SPOOL" and the word is "OVERT", one "O" is shown as yellow and the second one is not.
5. If the player guesses the right word, the player wins and the game is over.




API Used


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

