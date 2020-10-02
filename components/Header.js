import axios from "axios";
// STEP 1: Create a Header component.
// -----------------------
// Write a function that takes no arguments and returns the markup you see below:
//
//  <div class="header">
//    <span class="date">MARCH 28, 2020</span>
//    <h1>Lambda Times</h1>
//    <span class="temp">98°</span>
//  </div>
//
// Use your function to create a header
// and append it to the DOM inside the div.header-container
const headerSlot = document.querySelector(".header-container");

function makeHeader() {
  // nodes
  const nodes = {
    header: document.createElement("header"),
    heading: document.createElement("h1"),
    date: document.createElement("span"),
    temp: document.createElement("span"),
  };

  const currentDate = () => {
    let dateObj = new Date();
    var months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let month = dateObj.getUTCMonth() + 1; //months from 1-12
    let day = dateObj.getUTCDate();
    let year = dateObj.getUTCFullYear();

    return `${months[month].toUpperCase()} ${day}, ${year}`;
  };

  nodes.header.classList.add("header");
  nodes.date.classList.add("date");
  nodes.date.innerHTML = currentDate();
  nodes.heading.innerHTML = "Lambda Times";
  nodes.temp.classList.add("temp");
  nodes.temp.innerHTML = "98°";

  nodes.header.appendChild(nodes.date);
  nodes.header.appendChild(nodes.heading);
  nodes.header.appendChild(nodes.temp);

  headerSlot.appendChild(nodes.header);
}

makeHeader();
