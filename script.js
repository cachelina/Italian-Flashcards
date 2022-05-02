
let words = {
  doctor: 'dottore',
  thanks: 'grazie',
  year: 'anno',
  stomach: 'stomaco',
  hand: 'mano',
  arm: 'braccio',
  head: 'testa',
  foot: 'piede',
  fish: 'pesce',
}

let answerButton = document.getElementById('answer-button')
let correctButton = document.getElementById('correct-button')
let wrongButton = document.getElementById('wrong-button')
let nextButton = document.getElementById('next-button')
let term = document.getElementById('term')
let flipContainer = document.getElementsByClassName('flip-container')[0]

flipContainer.addEventListener('click', (e) => { 
flipContainer.classList.toggle("flip-card")
})


let englishTranslations = () => Object.keys(words)

const initializeGame = () => generateNewWord();

let data = Object.values(words)
let numberCorrectScore = 0; 
let numberIncorrectScore = 0;
let requiredToWinScore = Object.keys(words).length;
let currentWord = '';
let currentAnswer = ''; 


function getRandomWord() {
  if (Object.keys(words).length === 0) {
    return '';
  }
  const translations = englishTranslations();
  const randomWord = translations[Math.floor(Math.random() * translations.length)]
  return randomWord
}


const setWordContent = (word) => {
  term.innerHTML = `<h3>${word ?? currentWord}</h3>`
}

const generateNewWord = () => {
  let newWord = getRandomWord();
  currentWord = newWord
  setWordContent()
}

const wonGame = () => numberCorrectScore === requiredToWinScore;


answerButton.addEventListener('click', e => {
  for (const word in words) {
    if (currentWord === word) {
      term.innerHTML = `<h3>${words[word]}</h3>`
    }
  }
})

const removeWord = () => {
  let currentTerm = term.textContent
  let showingWord = false; 
  let showingTranslation = false;
  for (const word in words) {
    showingWord = currentTerm === word
    showingTranslation = currentTerm === words[word]
    if (showingWord || showingTranslation) {
      delete words[word]
    }
  }
}

const setWinningMessage = () => {
  const winningMsg = `Congratulations you won with a score of correct: ${numberCorrectScore} and incorrect: ${numberIncorrectScore}`;
  setWordContent(winningMsg)
}

const showWinningMessage = () => alert('you got them all right, refresh and start new Game!');

const reloadGame = () => {
  alert `the game will restart`
  window.location.reload(true)
}

correctButton.addEventListener('click', e => {
  if (wonGame()) {
    showWinningMessage();
    reloadGame();
    return null
  }
  numberCorrectScore += 1
  if (wonGame()) {
    showWinningMessage();
    setWinningMessage();
    reloadGame();
    return null
  }
  removeWord();
})

wrongButton.addEventListener('click', e => {
  if (wonGame()) {
    showWinningMessage()
    reloadGame();
    return null
  }
  numberIncorrectScore += 1
})

nextButton.addEventListener('click', e => {
  if (wonGame()) {
    showWinningMessage();
    reloadGame();
    return null 
  } 
  else {
    generateNewWord();
  }
})

window.addEventListener('DOMContentLoaded', (e) => {
  initializeGame();
})



////restart game without hitting refresh
//keep track of words they got wrong
