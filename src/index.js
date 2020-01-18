
let breeds = [];

document.addEventListener("DOMContentLoaded", function () {
  renderImages();
  loadBreeds();
  // addTheCeo();
});

function renderImages() {
  const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
  fetch(imgUrl)
    .then(res=> res.json())
    .then(results => {
      results.message.forEach(img => renderOneImage(img))
    });
}

function renderOneImage(dogImg) {
  let imgContainer = document.querySelector("#dog-image-container");
  let img = document.createElement("img");
  img.src = dogImg;
  imgContainer.appendChild(img);
}

function loadBreeds() {
  const breedUrl = "https://dog.ceo/api/breeds/list/all"
  fetch(breedUrl)
    .then(res => res.json())
    .then(data => {
      breeds = data.message;
      updateBreeds(breeds);
      listenForBreedSelection();
    });
}

function updateBreeds(breeds) {
  let mainUl = document.querySelector("#dog-breeds");
  removeChildElementsFor(mainUl);

  for (const breed in breeds) {
    if (breeds[breed].length > 0) {
      const li = document.createElement("li");
      const span = document.createElement("span");
      span.innerHTML = breed;
      /** TODO: Make 'span' clickable along the full length of 'parent space'. */
      addColorToggle(span); // Challenge 3
      li.appendChild(span);
      mainUl.appendChild(li);

      const subBreeds = breeds[breed];
      const subul = document.createElement("ul");

      li.appendChild(subul);

      for (const subBreed in subBreeds) {
        const subLi = document.createElement("li");
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
    const span = document.createElement('span');
    span.innerHTML = breed;
    /** TODO: Make 'span' clickable along the full length of 'parent space'. */
    addColorToggle(span); // Challenge 3
    breedLi.appendChild(span);
    breedLi.parentElement.appendChild(breedLi);

    const subul = document.createElement('ul');
    breedLi.appendChild(subul);
  }
  
  return breedLi
}

/** Challenge 3 */
function addColorToggle(element, colorClass = "darkred") {
  element.addEventListener("click", (e) => {
    e.preventDefault();
    e.target.classList.toggle(colorClass);
  });
}
/** END: Challenge 3 */

function removeChildElementsFor(parentElement) {
  let childElement;
  while (childElement = parentElement.lastElementChild) {
    parentElement.removeChild(childElement);
  }
}

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
  // allOption.disabled = true; // temporarily disable
  // insert after newly added 'instruction' option
  existingOptions.insertBefore(allOption, instruction.nextSibling);
}

function filterBreedsBy(letter) {
  let allowedBreedKeys = Object.keys(breeds).filter((breedKey) => {
    return breedKey.startsWith(letter);
  });
  let filteredBreeds = Object.fromEntries(
    Object.entries(breeds).filter(
      ([breedKey, breedValue]) => allowedBreedKeys.includes(breedKey)
    )
  );
  
  let breedsToDisplay = isEmpty(filteredBreeds) ? breeds : filteredBreeds;
  updateBreeds(breedsToDisplay);
}

function listenForBreedSelection() {
  let breedFilterDropdown = document.querySelector("#breed-dropdown");
  addExtraOptions(breedFilterDropdown);
  breedFilterDropdown.addEventListener("change", evt => {
    filterBreedsBy(evt.target.value);
  });
}

function isEmpty(obj) {
  for(let prop in obj) {
    if(obj.hasOwnProperty(prop)) {
      return false;
    }
  }
  return true;
}

function addTheCeo() {
  let pageTitle = document.getElementById("title");
  pageTitle.insertAdjacentHTML("afterend", '<div id="the-ceo"><img src="dog-the-ceo.jpg"></div>');
}


