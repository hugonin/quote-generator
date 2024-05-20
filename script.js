const quoteContainerEl = document.getElementById("quote-container");
const quoteTextEl = document.getElementById("quote");
const quoteAuthorEl = document.getElementById("author");
const twitterBtnEl = document.getElementById("twitter");
const newQuoteBtnEl = document.getElementById("new-quote");
const loaderEl = document.getElementById("loader");
const yearEl = document.getElementById("year");

let apiQuotes = [];

function showLoadingSpinner() {
  loaderEl.hidden = false;
  quoteContainerEl.hidden = true;
}

function removeLoadingSpinner() {
  quoteContainerEl.hidden = false;
  loaderEl.hidden = true;
}

function updateYearOnFooter() {
  year.innerHTML = new Date().getFullYear();
}

// Show New Quote
function newQuote() {
  showLoadingSpinner();
  // Pick a random quote from apiQuotes array
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  // Check if Author field is blank and replace it with Unknown
  if (!quote.author) {
    quoteAuthorEl.textContent = "Unknown";
  } else {
    quoteAuthorEl.textContent = quote.author;
  }
  // Check quote length to determine styling
  if (quote.text.length > 120) {
    quoteTextEl.classList.add("long-quote");
  } else {
    quoteTextEl.classList.remove("long-quote");
  }
  // Set quote, Hide Loader
  quoteTextEl.textContent = quote.text;
  removeLoadingSpinner();
}
// Get Quote From API
async function getQuote() {
  showLoadingSpinner();
  const apiUrl = "https://jacintodesign.github.io/quotes-api/data/quotes.json";

  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    console.log(apiQuotes);
    newQuote();
  } catch (error) {
    console.log("whoops, no quote", error);
    getQuote()
  }
}

// Tweet Quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteTextEl.textContent} - ${quoteAuthorEl.textContent} `;
  window.open(twitterUrl, "_blank");
}

// Event Listeners
newQuoteBtnEl.addEventListener("click", newQuote);
twitterBtnEl.addEventListener("click", tweetQuote);

// On Load
getQuote();
updateYearOnFooter();
