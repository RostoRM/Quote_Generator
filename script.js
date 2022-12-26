const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

//Show Loading
const laoding = () => {
  loader.hidden = false;
  quoteContainer.hidden = true;
};

// Hide Loading
const complete = () => {
  quoteContainer.hidden = false;
  loader.hidden = true;
};

//Show New Quote
const newQuote = () => {
  laoding();
  //pick a random quote from apiQuotes array
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  //Check if Author field is blank and replace ot with 'Unknown'
  if (quote.author === 'Anonymous') {
    authorText.textContent = 'Author: Unknown';
  } else {
    authorText.textContent = quote.author;
  }
  //Check Quote lengh to determine styling
  if (quote.text.length > 120) {
    quoteText.classList.add('long-quote');
  } else {
    quoteText.classList.remove('long-quote');
  }
  //set Quote, Hide Loader
  quoteText.textContent = quote.text;
  complete();
};

// Get Quotes From API
const getQuotes = async () => {
  // also can use this api to fetch quotes https://type.fit/api/quotes
  laoding();
  const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {
    //Catch Error Here
    console.log('Sorry, no quote was generated:', error);
  }
};

//Tweet Quote
const tweetQuote = () => {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, '_blank');
};

// Evenet Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

//On Load
getQuotes();
