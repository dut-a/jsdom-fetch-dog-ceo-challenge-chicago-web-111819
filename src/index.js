
let filterDetected = false;

document.addEventListener("DOMContentLoaded", () => {
  fetchDogs();
  fetchBreeds();
  // filterBreeds();
})

/** Challenge 1 */
function displayImages(json){
  const div = document.querySelector('#dog-image-container');
  json.message.forEach(function(image){
    const p = document.createElement('p');
    p.innerHTML = `<img src=${image} />`;
    div.appendChild(p);
  });
}

function fetchDogs() {
  return fetch("https://dog.ceo/api/breeds/image/random/4")
    .then(resp => resp.json())
    .then(json => displayImages(json));
}
/** END: Challenge 1: Fetch and display 'dog images'. */

/** Challenge 2: Fetch and display 'dog breeds' */
function renderBreeds(json) {
  console.log("renderBreeds() called...")
  const mainUl = document.querySelector('#dog-breeds');
  
  const breeds = json.message;
  console.log(breeds);
    for (const breed in breeds) {
      if (breeds[breed].length > 0) {
        const li = document.createElement('li');
        const span = document.createElement('span');
        span.innerHTML = breed;
        /** TODO: Make 'span' clickable along the full length of 'parent space'. */
        addColorToggle(span); // Challenge 3
        li.appendChild(span);
        mainUl.appendChild(li);

        const subBreeds = breeds[breed];
        const subul = document.createElement('ul');

        li.appendChild(subul);

        for (const subBreed in subBreeds) {
          const subLi = document.createElement('li');
          subLi.innerHTML = subBreeds[subBreed];
          // add color change behavior to 'baby', LOL.
          addColorToggle(subLi, "goldenrod"); // Challenge 3
          // TODO: when 'baby' is clicked, activate parent too :)
          // addColorToggle(li);
          subul.appendChild(prepareBreed(subBreeds[subBreed], true, false));
        }

      } else {
        mainUl.appendChild(prepareBreed(breed, false, false));
      }
    }
}

function prepareBreed(breed, childBreed = false, hasSubBreeds = false) {
  const breedLi = document.createElement('li');
  breedLi.innerHTML = breed;
  childBreed ? addColorToggle(breedLi, "goldenrod") : addColorToggle(breedLi); // Challenge 3

  if (hasSubBreeds) {
    // const li = document.createElement('li');
    const span = document.createElement('span');
    span.innerHTML = breed;
    /** TODO: Make 'span' clickable along the full length of 'parent space'. */
    addColorToggle(span); // Challenge 3
    breedLi.appendChild(span);
    breedLi.parentElement.appendChild(breedLi);

    // const subBreeds = breeds[breed];
    const subul = document.createElement('ul');
    breedLi.appendChild(subul);
  }
  
  return breedLi
}

function fetchBreeds() {
  const breedUrl = 'https://dog.ceo/api/breeds/list/all';

  return fetch(breedUrl)
    .then(resp => resp.json())
    .then(breeds => {
      if (!filterDetected) {
        // fetchBreeds();
        console.log("rendering ALL breeds...");
        renderBreeds(breeds);
      } else {
        console.log("rendering FILTERED breeds...");
        renderBreeds(filterBreeds(breeds));
      }
      // renderBreeds(breeds);
      // renderBreeds(filterBreeds(breeds));
      // console.log(filterBreeds(breeds));
      filterBreeds(breeds);
      // return breeds;
    });
}

/** END: Challenge 2 */

/** Challenge 3 */
function addColorToggle(element, colorClass = "darkred") {
  element.addEventListener("click", (e) => {
    e.preventDefault();
    e.target.classList.toggle(colorClass);
  });
}
/** END: Challenge 3 */

/**
 * Challenge 4:
 * Filter breeds that start with a particular letter using a dropdown.
 * 
 */
function addExtraOptions(existingOptions) {
  /** 'instruction' option */
  let instruction = document.createElement("option");
  let instTxt = "--- select ---";
  instruction.text = instTxt;
  instruction.value = instTxt;
  
  // insert as first option; select by default.
  existingOptions.insertBefore(instruction, existingOptions.firstChild);
  instruction.selected = true;
  instruction.disabled = true;

  /** 'all' option */
  let allOption = document.createElement("option");
  let allTxt = "all";
  allOption.text = allTxt;
  allOption.value = allTxt;
  allOption.disabled = true; // temporarily disable
  // insert after newly added 'instruction' option
  existingOptions.insertBefore(allOption, instruction.nextSibling);
}

function filterBreeds(breeds) {
  console.log("filterBreeds() triggered...");
  // prep
  filterDetected = true;
  let filterOptions = document.querySelector('#breed-dropdown');
  addExtraOptions(filterOptions);

  // desired behavior
  filterOptions.addEventListener("change", (e) => {
    renderBreeds(breedsSubset(breeds, e.target.value));
  });

  function breedsSubset(breeds, filterCriterion) {
    let allBreeds = breeds.message;
    let breedsToDisplay = allBreeds;
    let allowedKeys = Object.keys(allBreeds).filter((breedKey) => {
        return breedKey.startsWith(filterCriterion)
    });
    let filteredDogBreeds = Object.fromEntries(
      Object.entries(allBreeds).filter(
        ([key, val]) => allowedKeys.includes(key)
      )
   );

    // console.log("all breeds: ", b);
    // console.log("filtered breeds: ", filteredDogBreeds);
    // location.reload(true);
    if (filterDetected) { breedsToDisplay = filteredDogBreeds };
    // renderBreeds(breeds);
    console.log("Breeds: ", breedsToDisplay);
    console.log("filter detected: ", filterDetected);
    return breedsToDisplay;
  }

}
/** END: Challenge 4 */
