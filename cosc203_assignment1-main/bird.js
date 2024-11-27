/**
 * Constants and Variable declarations
 */

//the URL for the bird data
const birdDataURL = "./data/nzbird.json";
//the container that the bird cards will be added to
const container = document.getElementById("bird-container");
//the number of birds depending on the filtering
const searchResultsAmount = document.getElementById("search-results-amount");
//the array of the different conservation statuses of the birds
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
//the array of the different families of the birds
const familyArray = new Array(
  "Notiomystidae",
  "Spheniscidae",
  "Petroicidae",
  "Recurvirostridae",
  "Phalacrocoracidae",
  "Strigopidae",
  "Columbidae",
  "Apterygidae",
  "Cuculidae",
  "Meliphagidae",
  "Psittaculidae",
  "Falconidae",
  "Callaeidae",
  "Halcyonidae",
  "Ardeidae",
  "Mohouidae",
  "Locustellidae",
  "Charadriidae",
  "Anatidae",
  "Motacillidae",
  "Rhipiduridae",
  "Acanthisittidae",
  "Rallidae",
  "Acanthizidae",
  "Strigidae",
  "Laridae",
  "Zosteropidae",
  "Diomedeidae",
  "Scolopacidae",
  "Haematopodidae"
);

//the array of the different bird
let birdArray = [];
// the unique id used for each of the birds
let id = null;
//the audio file for the kiwi
const audio = new Audio("data/kiwi-call.mp3");

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
  //For loop for each bird in the array of birds
  for (let i = 0; i < birdData.length; i++) {
    createBirdPanel(birdData[i]);
  }
}

/**
 * Adding birds to website
 */
function createBirdPanel(bird) {
  //Creating a unique ID for each bird
  const birdID = bird.scientific_name.replaceAll(" ", "");
  //Creating the HTML for each bird
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
        
        <h3 class="maori-name">${bird.primary_name}</h2>
        <p class="photographer">Photo by ${bird.photo.credit}</p>
        
        <h3>${bird.english_name}</h2>
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

  //the container HTML for the bird cards will have each card added to it
  container.insertAdjacentHTML("beforeend", panelHTML);
  //the bird ID will be added to the array of birds by using the push method and getting the bird using the bird ID
  bird.element = document.getElementById(birdID);
  birdArray.push(bird);
}

/**
 * Name matching function for search
 */
function matchesName(searchTerm, bird) {
  //normalising the bird names in maori to lowercase
  const maoriName = bird.primary_name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
  //normalising the bird names in english to lowercase
  const englishName = bird.english_name.toLowerCase();
  //normalising the bird names in scientific name to lowercase
  const scientificName = bird.scientific_name.toLowerCase();
  //if the search term is included in the bird names then it will return true
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
  //the container will be cleared
  container.innerHTML = "";
  //for each bird that matches the criteria, it will be added to the container
  currentBirds.forEach((bird) => {
    container.append(bird.element);
  });
  //the number of birds found that matches the criteria will be displayed
  searchResultsAmount.textContent = currentBirds.length + " results found";
  //if there are no birds that match the criteria then an error message will be displayed
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
/* The birds will be sorted from lightest to heaviest*/
function lightestToHeaviest(a, b) {
  if (a.size.weight.value < b.size.weight.value) {
    return -1;
  }
  if (a.size.weight.value > b.size.weight.value) {
    return 1;
  }
  return 0;
}
/* The birds will be sorted from heaviest to lightest*/
function heaviestToLightest(a, b) {
  if (a.size.weight.value > b.size.weight.value) {
    return -1;
  }
  if (a.size.weight.value < b.size.weight.value) {
    return 1;
  }
  return 0;
}
/* The birds will be sorted in alphabetical order in English*/
function alphabeticalByEnglish(a, b) {
  if (a.english_name < b.english_name) {
    return -1;
  }
  if (a.english_name > b.english_name) {
    return 1;
  }
  return 0;
}
/* The birds will be sorted in alphabetical order in Maori*/
function alphabeticalByMaori(a, b) {
  if (a.primary_name < b.primary_name) {
    return -1;
  }
  if (a.primary_name > b.primary_name) {
    return 1;
  }
  return 0;
}
/* The birds will be sorted from shortest to longest*/
function shortestToLongest(a, b) {
  if (a.size.length.value < b.size.length.value) {
    return -1;
  }
  if (a.size.length.value > b.size.length.value) {
    return 1;
  }
  return 0;
}
/* The birds will be sorted from longest to shortest*/
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
    // normalise search term
    let processedSearch = searchTerm
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
    //for each bird that matches the search term, it will be added to the current birds array
    birdArray.forEach((bird) => {
      if (matchesName(processedSearch, bird)) {
        currentBirds.push(bird);
      }
    });
  }

  // Family  selector
  const familyStatus = document.querySelector("#family-option").selectedIndex;
  //if the family is greater than 0 then the birds that match the family will be added to the current birds array
  if (familyStatus > 0) {
    for (let i = currentBirds.length - 1; i > -1; i--) {
      if (currentBirds[i].family != familyArray[familyStatus - 1]) {
        currentBirds.splice(i, 1);
      }
    }
  }

  // Conservation status selector
  const conservationStatus =
    document.querySelector("#conserv-option").selectedIndex;
  //if the conservation status is greater than 0 then the birds that match the conservation status will be added to the current birds array
  if (conservationStatus > 0) {
    for (let i = currentBirds.length - 1; i > -1; i--) {
      if (currentBirds[i].status != statusArray[conservationStatus - 1]) {
        currentBirds.splice(i, 1);
      }
    }
  }

  // Sort by selector
  const searchOption = document.querySelector("#sort-option").selectedIndex;
  //switch statement for the sort by selector
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

/**
 *
 * @param birdArray array of bird json objects to be filtered
 * @param range array for range of values to be accepted, string values
 * @param key function to provide value of a bird json to be compared to the range
 * @returns array of bird json objects as described
 */
function filterBirdsByRange(birdArray, range, key) {
  if (range[0] === "") {
    range[0] = Number.NEGATIVE_INFINITY;
  }
  if (range[1] === "") {
    range[1] = Number.POSITIVE_INFINITY;
  }
  return birdArray.filter((birdJSON) => {
    return (
      parseFloat(range[0]) <= key(birdJSON) &&
      key(birdJSON) <= parseFloat(range[1])
    );
  });
}

/* extra feature - for the kiwi sound button action */

/*onclick event for the audio to play when the button is clicked*/
document.getElementById("secret-button").addEventListener("click", function () {
  clearInterval(id);
  audio.play();
});

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    audio.play();
  });
});
