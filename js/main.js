/* Quote Display and Input Section ***********************************************/

const random_quote_API = 'https://api.quotable.io/random';
const quoteDisplayElement = document.getElementById('quoteDisplay');
const quoteInputElement = document.getElementById('quoteInput');
const timerElement = document.getElementById('timer');

let correct = true
quoteInputElement.addEventListener('input', () => {
    const arrayDisplay = quoteDisplayElement.querySelectorAll('span')
    const arrayInput = quoteInputElement.value.split('')
    arrayDisplay.forEach((characterSpan, index) => {
        const character = arrayInput[index]
        if (character == null) {
            characterSpan.classList.remove('correct')
            characterSpan.classList.remove('incorrect')
            correct = false
        } else if (character === characterSpan.innerText) {
            characterSpan.classList.add('correct')
            characterSpan.classList.remove('incorrect')
            correct = true
        } else {
            characterSpan.classList.remove('correct')
            characterSpan.classList.add('incorrect')
            correct = false
        }
    })

    if (correct) renderNewQuote()
})

function getRandomQuote() {
    return fetch(random_quote_API)
        .then(response => response.json())
        .then(data => data.content)
}

async function renderNewQuote() {
    const quote = await getRandomQuote()
    quoteDisplayElement.innerHTML = ''
    quote.split('').forEach(character => {
        const characterSpan = document.createElement('span')
        characterSpan.innerText = character
        quoteDisplayElement.appendChild(characterSpan)
    })
    quoteInputElement.value = null
    startTimer()
} 

/* Timer For Until Quote Ends ******************************************/

let startTime
function startTimer() {
    timerElement.innerText = 0
    startTime = new Date()
    setInterval(() => {
        timerElement.innerText = getTimerTime()
    }, 1000)
}

function getTimerTime() {
    return Math.floor((new Date() - startTime) / 1000)
}

renderNewQuote();

/* Keybinds For Users ********************************************/

window.addEventListener('keydown', (event) => {
    if (event.key === 'Tab') {
        renderNewQuote()
    }
})

/* 30 Seconds Countdown Timer ************************************/

const countdownElement = document.getElementById("countdown");
const startingMinute = 0.5;
let time = startingMinute * 60;
let refreshIntervalid = setInterval(updateCountdown, 1000);//updates every 1 second

refreshIntervalid;

function updateCountdown() {
    const minutes = Math.floor(time/60);//rounds a number down to nearest integer
    let seconds = time % 60;

    seconds = seconds < 10 ? '0' + seconds : seconds;
    
    countdownElement.innerHTML = `${seconds}`;
    time--;

    if (time < 0) {
        clearInterval(refreshIntervalid);//stops the setInterval when time = 0 to avoid negative time
    }
}

/* Counting # of Words ************************************************/

// function countCorrectWords {


/* Counting Correct # of Character Classes ******************************/

const resultsWpmElement = document.getElementById('resultsWpm');

function characterPerMin() {
    if renderNewQuote(() => {
        const countCorrectClasses = document.querySelectorAll('.correct').length;//counts the total number of correct classes 
        const correctClassesOverMin = (countCorrectClasses / time)
        resultsWpmElement.innerHTML = `${correctClassesOverMin}`
    })
}




/* Misc. Testing ****************************************************/

// quote.split('').forEach(character => {
//     const characterSpanInput = document.createElement('span')
//     characterSpanInput.innerText = character
//     quoteInputElement.appendChild(characterSpan)
//  })
// quoteInputElement.value = null
// startTimer()

// quoteDisplayElement.addEventListener('input', () => {

//     arrayInput.forEach((character, index) => {
//         if (character === characterSpan.innerText) {
//             characterSpanInput.classList.add('correct-input')
//             characterSpanInput.classList.remove('incorrect-input')
//             correct = true 
//         } else {
//             characterSpanInput.classList.remove('correct-input')
//             characterSpanInput.classList.add('incorrect-input')
//             correct = false
//         }
//     })

//     if (correct) renderNewQuote()
// })
