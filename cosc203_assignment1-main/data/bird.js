// const dataURL = "nzbird.json";
// const container = document.getElementById("bird-container");
// const searchResultsAmount = document.getElementById("search-results-amount");
// const statusArray = new Array(
//   "Not Threatened",
//   "Naturally Uncommon",
//   "Relict",
//   "Recovering",
//   "Declining",
//   "Nationally Increasing",
//   "Nationally Vulnerable",
//   "Nationally Endangered",
//   "Nationally Critical",
//   "Extinct",
//   "Data Deficient"
// );
// let data = [];
// let id = null;

// async function fetchData() {
//   //fetch data from the json file
//   const response = await fetch(dataURL);

//   //error handling
//   if (!response.ok) {
//     console.log("Error fetching data");
//     console.error(response.status);
//   }

//   const data = await response.json();
//   //print the name
//   console.log(data[0].primary_name);

//   //to ensure that the card being created is not a duplicate of an existing card
//   data.sort(compare("primary_name"));

//   //for loop to create the cards
//   for (let i = 0; i < data.length; i++) {
//     createBirdCard(data[i]);
//   }
// }

// //adapted from a method in COSC201 for this class, this is the basis for the filters
// // function compare(key) {
// //   //recursive call in javascript to sort the data
// //   return function (a, b) {
// //     if (a[key] > b[key]) {
// //       return 1;
// //     } else if (a[key] < b[key]) {
// //       return -1;
// //     }
// //     return 0;
// //   };
// // }

// //function to create the bird cards
// function createBirdCard(bird) {
//   //   let inputRef = document.querySelector("input-row");
//   //   let colCard = document.createElement("div");

//   //create the card outside
//   //   colCard.setAttribute("class", "col-md-4");
//   //   colCard.setAttribute("id", "card" + j);

//   //   inputRef.appendChild(colCard);

//   //   //creating the card body
//   //   const cardStatus = data[j].status;

//   //   let card = document.createElement("div");

//   //   const imgSrc = data[i].photo.source;
//   //   const birdName = data[i].english_name;

//   //   let img = document.createElement("img");
//   //   img.setAttribute("src", imgSrc);
//   //   img.setAttribute("class", "card-img-top");
//   //   img.setAttribute("alt", birdName);

//   //   card.appendChild(img);

//   const birdID = bird.scientific_name.replaceAll(" ", "");

//   const panelHTML = `<div class="bird-panel" id = "${birdID}">
//         <img src=${bird.photo.source} alt="Photo of ${
//     bird.english_name
//   }" class="bird-image">
//         <div class="shading">
//             <div class="circle" style="background-color:var(--${bird.status.replaceAll(
//               " ",
//               "-"
//             )})";></div>
//         </div>

//         <h2 class="maori-name">${bird.primary_name}</h2>
//         <p class="photographer">Photo by ${bird.photo.credit}</p>

//         <h2>${bird.english_name}</h2>
//         <div class="bird-content">
//             <p class="bold">Scientific Name</p> <p>${bird.scientific_name}</p>
//             <p class="bold">Family</p>          <p>${bird.family}</p>
//             <p class="bold">Order</p>           <p>${bird.order}</p>
//             <p class="bold">Status</p>          <p>${bird.status}</p>
//             <p class="bold">Length</p>          <p>${
//               bird.size.length.value + " " + bird.size.length.units
//             }</p>
//             <p class="bold">Weight</p>          <p>${
//               bird.size.weight.value + " " + bird.size.weight.units
//             }</p>
//         </div>
//     </div>`;

//   container.insertAdjacentHTML("beforeend", panelHTML);
//   bird.element = document.getElementById(birdID);
//   birdArray.push(bird);
// }

// /**
//  * Name matching function for search
//  */
// function matchesName(searchTerm, bird) {
//   const maoriName = bird.primary_name
//     .normalize("NFD")
//     .replace(/[\u0300-\u036f]/g, "")
//     .toLowerCase();
//   const englishName = bird.english_name.toLowerCase();
//   const scientificName = bird.scientific_name.toLowerCase();
//   if (
//     maoriName.includes(searchTerm) ||
//     englishName.includes(searchTerm) ||
//     scientificName.includes(searchTerm)
//   ) {
//     return true;
//   } else {
//     return false;
//   }
// }

// /**
//  * Function to add birds to container that match search terms
//  */
// function addBirds(currentBirds) {
//   container.innerHTML = "";
//   currentBirds.forEach((bird) => {
//     container.append(bird.element);
//   });
//   searchResultsAmount.textContent = currentBirds.length + " results found";
//   if (currentBirds.length === 0) {
//     const errorMessage = document.createElement("p");
//     errorMessage.setAttribute("class", "error");
//     errorMessage.textContent = "No birds matched your search terms.";
//     container.append(errorMessage);
//   }
// }
// /**
//  * Sorting functions for sort-by options
//  */
// function lightestToHeaviest(a, b) {
//   if (a.size.weight.value < b.size.weight.value) {
//     return -1;
//   }
//   if (a.size.weight.value > b.size.weight.value) {
//     return 1;
//   }
//   return 0;
// }
// function heaviestToLightest(a, b) {
//   if (a.size.weight.value > b.size.weight.value) {
//     return -1;
//   }
//   if (a.size.weight.value < b.size.weight.value) {
//     return 1;
//   }
//   return 0;
// }
// function alphabeticalByEnglish(a, b) {
//   if (a.english_name < b.english_name) {
//     return -1;
//   }
//   if (a.english_name > b.english_name) {
//     return 1;
//   }
//   return 0;
// }
// function alphabeticalByMaori(a, b) {
//   if (a.primary_name < b.primary_name) {
//     return -1;
//   }
//   if (a.primary_name > b.primary_name) {
//     return 1;
//   }
//   return 0;
// }
// function shortestToLongest(a, b) {
//   if (a.size.length.value < b.size.length.value) {
//     return -1;
//   }
//   if (a.size.length.value > b.size.length.value) {
//     return 1;
//   }
//   return 0;
// }
// function longestToShortest(a, b) {
//   if (a.size.length.value > b.size.length.value) {
//     return -1;
//   }
//   if (a.size.length.value < b.size.length.value) {
//     return 1;
//   }
//   return 0;
// }

// /**
//  * Main function calls
//  */
// fetchData();

// // When the filter-results button is clicked, search through the birds:
// document.getElementById("filter-button").addEventListener("click", function () {
//   const searchTerm = document.querySelector("#search-bar").value;
//   let currentBirds = data.slice();

//   // if search filter is none
//   if (searchTerm === "") {
//     currentBirds = data.slice();
//   } else {
//     // if search filter contains something
//     currentBirds = [];
//     let processedSearch = searchTerm
//       .normalize("NFD")
//       .replace(/[\u0300-\u036f]/g, "")
//       .toLowerCase();
//     birdArray.forEach((bird) => {
//       if (matchesName(processedSearch, bird)) {
//         currentBirds.push(bird);
//       }
//     });
//   }

//   // Conservation status selector
//   const conservationStatus =
//     document.querySelector("#conserv-option").selectedIndex;
//   if (conservationStatus > 0) {
//     for (let i = currentBirds.length - 1; i > -1; i--) {
//       if (currentBirds[i].status != statusArray[conservationStatus - 1]) {
//         currentBirds.splice(i, 1);
//       }
//     }
//   }

//   // Sort by selector
//   const searchOption = document.querySelector("#sort-option").selectedIndex;
//   switch (searchOption) {
//     case 0:
//       currentBirds.sort(lightestToHeaviest);
//       break;
//     case 1:
//       currentBirds.sort(heaviestToLightest);
//       break;
//     case 2:
//       currentBirds.sort(alphabeticalByEnglish);
//       break;
//     case 3:
//       currentBirds.sort(lightestToHeaviest);
//       break;
//     case 4:
//       currentBirds.sort(shortestToLongest);
//       break;
//     case 5:
//       currentBirds.sort(longestToShortest);
//       break;
//   }
//   // Adding birds that match search conditions
//   addBirds(currentBirds);
// });

// const arrayMaori = [];
// const arrayEnglish = [];
// const arrayConservation = [];
// const arrayScientific = [];

// async function main() {
//   const response = await fetch("nzbird.json");
//   const d = await response.text();
//   const data = JSON.parse(d);

//   for (i = 0; i < data.length; i++) {
//     const bird = data[i];
//     const e = document.createElement("div");
//     // const html = `
//     //     <div class="bird-panel" id ="${birdSpecies.english_name}">
//     //       <div class="photo-box">
//     //           <div class="gradient" id = "${birdSpecies.scientific_name}"></div>
//     //           <img src=" ${birdSpecies.photo.source}" alt="Description of the image" />
//     //           <div class="maori-name">
//     //             ${birdSpecies.primary_name};
//     //           </div>
//     //           <div class="photo-credit">
//     //             ${birdSpecies.photo.credit};
//     //           </div>
//     //       </div>

//     //       <div class="text-box">
//     //           <div class="english-name">
//     //             ${birdSpecies.english_name};
//     //           </div>
//     //           <div class="scientific-name">
//     //             ${birdSpecies.scientific_name};
//     //           </div>
//     //           <div class ="conservation-status">
//     //             ${birdSpecies.status};
//     //           </div>
//     //     </div>
//     //   `;
//     const birdID = bird.scientific_name.replaceAll(" ", "");

//     const panelHTML = `<div class="bird-panel" id = "${birdID}">
//         <img src=${bird.photo.source} alt="Photo of ${
//       bird.english_name
//     }" class="bird-image">
//         <div class="shading">
//             <div class="circle" style="background-color:var(--${bird.status.replaceAll(
//               " ",
//               "-"
//             )})";></div>
//         </div>

//         <h2 class="maori-name">${bird.primary_name}</h2>
//         <p class="photographer">Photo by ${bird.photo.credit}</p>

//         <h2>${bird.english_name}</h2>
//         <div class="bird-content">
//             <p class="bold">Scientific Name</p> <p>${bird.scientific_name}</p>
//             <p class="bold">Family</p>          <p>${bird.family}</p>
//             <p class="bold">Order</p>           <p>${bird.order}</p>
//             <p class="bold">Status</p>          <p>${bird.status}</p>
//             <p class="bold">Length</p>          <p>${
//               bird.size.length.value + " " + bird.size.length.units
//             }</p>
//             <p class="bold">Weight</p>          <p>${
//               bird.size.weight.value + " " + bird.size.weight.units
//             }</p>
//         </div>
//     </div>`;

//     arrayMaori[i] = bird.primary_name;
//     arrayEnglish[i] = bird.english_name;
//     arrayConservation[i] = bird.status;
//     arrayScientific[i] = bird.scientific_name;
//     console.log(html);
//     //console.log(arrayMaori[i]);
//     //console.log(arrayEnglish[i]);
//     e.innerHTML = html;
//     document.querySelector(".bird-container").append(e);
//   }
//   setColour();
// }

// function searchFilter() {
//   var input, filter, maoriName, txtValue;
//   input = document.getElementById("searchFilter");
//   filter = input.value.toUpperCase();

//   for (i = 0; i < arrayMaori.length; i++) {
//     maoriName = arrayMaori[i];
//     englishName = arrayEnglish[i];

//     txtValueMaori = maoriName.toUpperCase();
//     txtValueEnglish = englishName.toUpperCase();

//     if (
//       txtValueMaori
//         .normalize("NFD")
//         .replace(/[\u0300-\u036f]/g, "")
//         .indexOf(filter) > -1 ||
//       txtValueEnglish.indexOf(filter) > -1
//     ) {
//       document.getElementById(englishName).style.display = "";
//     } else {
//       document.getElementById(englishName).style.display = "none";
//     }
//   }
// }

// function searchConservationFilter() {
//   var input, filter, conservationStatus, txtValue;
//   input = document.getElementById("searchConservationFilter");
//   filter = input.value.toUpperCase();

//   for (i = 0; i < arrayConservation.length; i++) {
//     conservationStatus = arrayConservation[i];
//     englishName = arrayEnglish[i];

//     txtValueConservation = conservationStatus.toUpperCase();

//     if (txtValueConservation.indexOf(filter) > -1) {
//       document.getElementById(englishName).style.display = "";
//     } else {
//       document.getElementById(englishName).style.display = "none";
//     }
//   }
// }

// function setColour(status) {
//   for (i = 0; i < arrayEnglish.length; i++) {
//     scientificName = arrayScientific[i];
//     status = arrayConservation[i];
//     console.log(status);

//     if (status == "Not Threatened") {
//       document
//         .getElementById(scientificName)
//         .setAttribute(
//           "style",
//           "background: linear-gradient(0deg, rgb(2, 160, 40) 0, rgba(0, 0, 0, 0) 25%)"
//         );
//     } else if (status == "Naturally Uncommon") {
//       document
//         .getElementById(scientificName)
//         .setAttribute(
//           "style",
//           "background: linear-gradient(0deg, rgb(100, 154, 49) 0, rgba(0, 0, 0, 0) 25%)"
//         );
//     } else if (status == "Relict") {
//       document
//         .getElementById(scientificName)
//         .setAttribute(
//           "style",
//           "background: linear-gradient(0deg, rgb(153, 203, 104) 0, rgba(0, 0, 0, 0) 25%)"
//         );
//     } else if (status == "Recovering") {
//       document
//         .getElementById(scientificName)
//         .setAttribute(
//           "style",
//           "background: linear-gradient(0deg, rgb(254, 204, 51) 0, rgba(0, 0, 0, 0) 25%)"
//         );
//     } else if (status == "Declining") {
//       document
//         .getElementById(scientificName)
//         .setAttribute(
//           "style",
//           "background: linear-gradient(0deg, rgb(254, 154, 1) 0, rgba(0, 0, 0, 0) 25%)"
//         );
//     } else if (status == "Nationally Increasing") {
//       document
//         .getElementById(scientificName)
//         .setAttribute(
//           "style",
//           "background: linear-gradient(0deg, rgb(194, 105, 103) 0, rgba(0, 0, 0, 0) 25%)"
//         );
//     } else if (status == "Nationally Vulnerable") {
//       document
//         .getElementById(scientificName)
//         .setAttribute(
//           "style",
//           "background: linear-gradient(0deg, rgb(155, 0, 0) 0, rgba(0, 0, 0, 0) 25%)"
//         );
//     } else if (status == "Nationally Endangered") {
//       document
//         .getElementById(scientificName)
//         .setAttribute(
//           "style",
//           "background: linear-gradient(0deg, rgb(102, 0, 50) 0, rgba(0, 0, 0, 0) 25%)"
//         );
//     } else if (status == "Nationally Critical") {
//       document
//         .getElementById(scientificName)
//         .setAttribute(
//           "style",
//           "background: linear-gradient(0deg, rgb(50, 0, 51) 0, rgba(0, 0, 0, 0) 25%)"
//         );
//     } else if (status == "Extinct") {
//       document
//         .getElementById(scientificName)
//         .setAttribute(
//           "style",
//           "background: linear-gradient(0deg, rgb(0, 0, 0) 0, rgba(0, 0, 0, 0) 25%)"
//         );
//     } else if (status == "Data Deficient") {
//       document
//         .getElementById(scientificName)
//         .setAttribute(
//           "style",
//           "background: linear-gradient(0deg, rgb(0, 0, 0) 0, rgba(0, 0, 0, 0) 25%)"
//         );
//     }
//   }
// }

// main();

/**
 * Constants and Variable declarations
 */
const birdDataURL = "./data/nzbird.json";
const container = document.getElementById("bird-container");
const searchResultsNumber = document.getElementById("search-results-number");
const birdGIF = document.getElementById("flying-bird");
const statusArray = new Array(
  "Not Threatened",
  "Naturally Uncommon",
  "Relict",
  "Recovering",
  "Declining",
  "Nationally Increasing",
  "Nationally Vulnerable",
  "Nationally Endangered",
  "Nationally Critical",
  "Extinct",
  "Data Deficient"
);
let birdArray = [];
let id = null;

/**
 * Fetching data from Gitlab
 */
async function fetchData() {
  const response = await fetch(birdDataURL);
  if (!response.ok) {
    console.error(response.status); // error handling
    const errorMessage = document.createElement("p");
    errorMessage.setAttribute("class", "error");
    errorMessage.textContent = "ERROR: failed to load bird data from server.";
    container.append(errorMessage);
  }

  const birdData = await response.json();

  for (let i = 0; i < birdData.length; i++) {
    createBirdPanel(birdData[i]);
  }
}

/**
 * Adding birds to website
 */
function createBirdPanel(bird) {
  const birdID = bird.scientific_name.replaceAll(" ", "");

  const panelHTML = `<div class="bird-panel" id = "${birdID}">
        <img src=${bird.photo.source} alt="Photo of ${
    bird.english_name
  }" class="bird-image">
        <div class="shading">
            <div class="circle" style="background-color:var(--${bird.status.replaceAll(
              " ",
              "-"
            )})";></div>
        </div>
        
        <h2 class="maori-name">${bird.primary_name}</h2>
        <p class="photographer">Photo by ${bird.photo.credit}</p>
        
        <h2>${bird.english_name}</h2>
        <div class="bird-content">
            <p class="bold">Scientific Name</p> <p>${bird.scientific_name}</p>
            <p class="bold">Family</p>          <p>${bird.family}</p>
            <p class="bold">Order</p>           <p>${bird.order}</p>
            <p class="bold">Status</p>          <p>${bird.status}</p>
            <p class="bold">Length</p>          <p>${
              bird.size.length.value + " " + bird.size.length.units
            }</p>
            <p class="bold">Weight</p>          <p>${
              bird.size.weight.value + " " + bird.size.weight.units
            }</p>
        </div>
    </div>`;

  container.insertAdjacentHTML("beforeend", panelHTML);
  bird.element = document.getElementById(birdID);
  birdArray.push(bird);
}

/**
 * Open and close functions for search panel on small screens
 */
function openSearchPanel() {
  document.getElementById("search-panel").style.width = "200px";
}
function closeSearchPanel() {
  document.getElementById("search-panel").style.width = "0px";
}

/**
 * Name matching function for search
 */
function matchesName(searchTerm, bird) {
  const maoriName = bird.primary_name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
  const englishName = bird.english_name.toLowerCase();
  const scientificName = bird.scientific_name.toLowerCase();
  if (
    maoriName.includes(searchTerm) ||
    englishName.includes(searchTerm) ||
    scientificName.includes(searchTerm)
  ) {
    return true;
  } else {
    return false;
  }
}

/**
 * Function to add birds to container that match search terms
 */
function addBirds(currentBirds) {
  container.innerHTML = "";
  currentBirds.forEach((bird) => {
    container.append(bird.element);
  });
  searchResultsNumber.textContent = currentBirds.length + " results found";
  if (currentBirds.length === 0) {
    const errorMessage = document.createElement("p");
    errorMessage.setAttribute("class", "error");
    errorMessage.textContent = "No birds matched your search terms.";
    container.append(errorMessage);
  }
}

/**
 * Sorting functions for sort-by options
 */
function lightestToHeaviest(a, b) {
  if (a.size.weight.value < b.size.weight.value) {
    return -1;
  }
  if (a.size.weight.value > b.size.weight.value) {
    return 1;
  }
  return 0;
}
function heaviestToLightest(a, b) {
  if (a.size.weight.value > b.size.weight.value) {
    return -1;
  }
  if (a.size.weight.value < b.size.weight.value) {
    return 1;
  }
  return 0;
}
function alphabeticalByEnglish(a, b) {
  if (a.english_name < b.english_name) {
    return -1;
  }
  if (a.english_name > b.english_name) {
    return 1;
  }
  return 0;
}
function alphabeticalByMaori(a, b) {
  if (a.primary_name < b.primary_name) {
    return -1;
  }
  if (a.primary_name > b.primary_name) {
    return 1;
  }
  return 0;
}
function shortestToLongest(a, b) {
  if (a.size.length.value < b.size.length.value) {
    return -1;
  }
  if (a.size.length.value > b.size.length.value) {
    return 1;
  }
  return 0;
}
function longestToShortest(a, b) {
  if (a.size.length.value > b.size.length.value) {
    return -1;
  }
  if (a.size.length.value < b.size.length.value) {
    return 1;
  }
  return 0;
}

/**
 * Main function calls
 */
fetchData();

// When the filter-results button is clicked, search through the birds:
document.getElementById("filter-button").addEventListener("click", function () {
  const searchTerm = document.querySelector("#search-bar").value;
  let currentBirds = birdArray.slice();

  // if search filter is none
  if (searchTerm === "") {
    currentBirds = birdArray.slice();
  } else {
    // if search filter contains something
    currentBirds = [];
    let processedSearch = searchTerm
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
    birdArray.forEach((bird) => {
      if (matchesName(processedSearch, bird)) {
        currentBirds.push(bird);
      }
    });
  }

  // Conservation status selector
  const conservationStatus =
    document.querySelector("#conserv-option").selectedIndex;
  if (conservationStatus > 0) {
    for (let i = currentBirds.length - 1; i > -1; i--) {
      if (currentBirds[i].status != statusArray[conservationStatus - 1]) {
        currentBirds.splice(i, 1);
      }
    }
  }

  // Sort by selector
  const searchOption = document.querySelector("#sort-option").selectedIndex;
  switch (searchOption) {
    case 0:
      currentBirds.sort(lightestToHeaviest);
      break;
    case 1:
      currentBirds.sort(heaviestToLightest);
      break;
    case 2:
      currentBirds.sort(alphabeticalByEnglish);
      break;
    case 3:
      currentBirds.sort(lightestToHeaviest);
      break;
    case 4:
      currentBirds.sort(shortestToLongest);
      break;
    case 5:
      currentBirds.sort(longestToShortest);
      break;
  }
  // Adding birds that match search conditions
  addBirds(currentBirds);
});
