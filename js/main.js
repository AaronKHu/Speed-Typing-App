const random_quote_API = 'https://api.quotable.io/random'

function getRandomQuote() {
    return fetch(random_quote_API)
        .then(response => response.json())
        .then(data => data.content)
}

async function renderNewQuote() {
    const quote = await getRandomQuote()
}

renderNewQuote()