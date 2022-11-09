const random_quote_API = 'https://api.quotable.io/random'
const quoteDisplayElement = document.getElementById('quoteDisplay')

function getRandomQuote() {
    return fetch(random_quote_API)
        .then(response => response.json())
        .then(data => data.content)
}

async function renderNewQuote() {
    const quote = await getRandomQuote()
    quoteDisplayElement.innerText = quote
}

renderNewQuote()