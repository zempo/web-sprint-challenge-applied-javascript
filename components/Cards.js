import axios from "axios";
// STEP 3: Create article cards.
// -----------------------
// Send an HTTP GET request to the following address: https://lambda-times-api.herokuapp.com/articles
// Study the response data you get back, closely.
// You will be creating a card for each article in the response.
// This won't be as easy as just iterating over an array though.
//
// Write a function that takes a single article object and returns the following markup:
//
// <div class="card">
//   <div class="headline">{Headline of article}</div>
//   <div class="author">
//     <div class="img-container">
//       <img src={url of authors image} />
//     </div>
//     <span>By {author's name}</span>
//   </div>
// </div>
//
// Add a listener for click events so that when a user clicks on a card, the headline of the article is logged to the console.
//
// Use your function to create a card for each of the articles, and append each card to the DOM.

const cardsURL = `https://lambda-times-api.herokuapp.com/articles`;
const cardsSlot = document.querySelector(".cards-container");
const errSlot = document.querySelector(".errors-container");

axios
  .get(cardsURL)
  .then((res) => {
    let articles = res.data.articles;
    let categories = Object.keys(articles);

    categories.forEach((category) => {
      //   console.log(articles[category]);
      addArticles(articles[category], category);
    });
  })
  .catch((err) => {
    let status = err.response.status;
    let statusHeader = document.createElement("h1");
    statusHeader.innerHTML = status;
    let statusTxt = err.response.statusText;
    let statusBody = document.createElement("p");
    statusBody.innerHTML = statusTxt;

    errSlot.appendChild(statusHeader);
    errSlot.appendChild(statusBody);
    console.log(err.response);
  });

class ArticleMaker {
  constructor(data, category) {
    this.data = {
      category,
      headline: data.headline,
      author: data.authorName,
      authorImg: data.authorPhoto,
    };
    this.nodes = {
      cardWrap: document.createElement("div"),
      cardHeadline: document.createElement("div"),
      cardAuthorWrap: document.createElement("div"),
      cardAuthor: document.createElement("span"),
      cardImgWrap: document.createElement("div"),
      cardImg: document.createElement("img"),
    };

    return this.onMount();
  }

  onMount() {
    // add classes
    this.nodes.cardWrap.classList.add("card");
    this.nodes.cardWrap.classList.add(this.data.category);
    this.nodes.cardHeadline.classList.add("headline");
    this.nodes.cardAuthorWrap.classList.add("author");
    this.nodes.cardImgWrap.classList.add("img-container");
    // set content
    this.nodes.cardHeadline.innerHTML = this.data.headline;
    this.nodes.cardAuthor.innerHTML = `By ${this.data.author}`;
    this.nodes.cardImg.setAttribute("src", this.data.authorImg);
    // append nested nodes to author wrapper
    //  this.nodes.cardImgWrap.appendChild(this.nodes.cardImg)
    this.nodes.cardAuthorWrap
      .appendChild(this.nodes.cardImgWrap)
      .appendChild(this.nodes.cardImg);
    this.nodes.cardAuthorWrap.appendChild(this.nodes.cardAuthor);
    // append to card wrapper
    this.nodes.cardWrap.appendChild(this.nodes.cardHeadline);
    this.nodes.cardWrap.appendChild(this.nodes.cardAuthorWrap);

    return this.nodes.cardWrap;
  }
}

function addArticles(articleArr, articleType) {
  let category = articleType;

  articleArr.forEach((article) => {
    let newArticle = new ArticleMaker(article, category);

    cardsSlot.appendChild(newArticle);
  });
}
