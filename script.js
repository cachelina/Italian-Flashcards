
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
let italianTranslation = document.getElementById("translation")

let numberCorrectScore = 0; 
let numberIncorrectScore = 0;
let requiredToWinScore = Object.keys(words).length;
let currentWord = '';
let currentAnswer = ''; 
let incorrectWords = [];
let userPercentageScores = [];

let englishTranslations = () => Object.keys(words)

const initializeGame = () => generateNewWord();

let data = Object.values(words)

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


const showItalianTranslation = () => {
  for (const word in words) {
    if (currentWord === word) {
      italianTranslation.innerHTML = `<h3>${words[word]}</h3>`

    }
  }
}

let percentage = () => {
  return (parseInt(requiredToWinScore - numberIncorrectScore) * 10) && (parseInt(requiredToWinScore - numberIncorrectScore) * 10)
}

const currentWrongWord = () => {
  let currentWrongWord = term.textContent
  incorrectWords.push(currentWrongWord)
}

flipContainer.addEventListener('click', (e) => {
  if (flipContainer.classList.toggle("flip-card")) {
    showItalianTranslation()
  }
})

const setWinningMessage = () => {
 let scores = percentage();
 let cachedScores = localStorage.getItem("scores")
  if (cachedScores === null) {
    let arr = JSON.stringify([scores])
    localStorage.setItem("scores", arr)
  } else {
    cachedScores = JSON.parse(cachedScores)
    cachedScores.push(scores)
    let arr = JSON.stringify(cachedScores)
    localStorage.setItem('scores', arr)
    // let allCachedScores = localStorage.getItem('scores')
  }
  const winningMsg = `Congratulations you got the top score of: ${numberCorrectScore} and incorrect: ${numberIncorrectScore}. The words you got wrong were: ${incorrectWords}. Your score is ${scores}`;
  setWordContent(winningMsg)
}

let answer = '';

const reloadGame = () => window.location.reload(true);

const promptUserToReloadGame = () => {
  answer = prompt('Would you like to play again? Enter Yes or No')
  answer = answer ? answer.toLowerCase() : answer;
  if (answer && answer.toLowerCase() === 'yes') {
    reloadGame();
    return null; 
  }
  return null; 
}

const sleep = (ms) => new Promise((resolve, reject) => setTimeout(resolve, ms));
let shouldShowPrompt = true; 

correctButton.addEventListener('click', e => {
  if (wonGame()) {
    setWinningMessage();
    if (shouldShowPrompt === true) {
      sleep(4000).then(() => promptUserToReloadGame());
      shouldShowPrompt = false;
    }
    return null
  }
  numberCorrectScore += 1
  if (wonGame()) {
    setWinningMessage();
    if (shouldShowPrompt === true) {
      sleep(4000).then(() => promptUserToReloadGame());
      shouldShowPrompt = false;
    }
    return null
  }
  removeWord();
  generateNewWord();
})

wrongButton.addEventListener('click', e => {
  if (wonGame()) {
    showWinningMessage()
    reloadGame();
    return null
  } else {
    numberIncorrectScore += 1;
    currentWrongWord();
    generateNewWord();
  }
})



window.addEventListener('DOMContentLoaded', (e) => {
  initializeGame();
})


