import axios from "axios";
// STEP 2: Create tabs
// -----------------------
// Using axios send a GET request to the address: https://lambda-times-api.herokuapp.com/topics
// Once the data is resolved use console logs or breakpoints to review the structure.
// Iterate over the topics creating a new tab for each topic, and appending it to the DOM
// under the div.topics element.
//
//  Each tab should look like this:
//    <div class="tab">topic here</div>
//
// NOTE: you do _not_ need to install axios as it's included in the HTML via script element
const topicsURL = `https://lambda-times-api.herokuapp.com/topics`;
const topicsSlot = document.querySelector(".topics");
const errSlot = document.querySelector(".errors-container");

axios
  .get(topicsURL)
  .then((res) => {
    console.log(res.data);
    let topics = res.data.topics;

    topics.forEach((topic) => makeTab(topic));
  })
  .catch((err) => {
    let status = err.response.status || "Uh Oh!";
    let statusHeader = document.createElement("h1");
    statusHeader.innerHTML = status;
    let statusTxt = err.response.statusText || "Something went wrong";
    let statusBody = document.createElement("p");
    statusBody.innerHTML = statusTxt;

    errSlot.appendChild(statusHeader);
    errSlot.appendChild(statusBody);
    console.log(err.response);
  });

function makeTab(topic) {
  console.log(topic);
  let newTab = document.createElement("div");
  newTab.classList.add("tab");
  newTab.innerHTML = topic;

  topicsSlot.appendChild(newTab);
}
