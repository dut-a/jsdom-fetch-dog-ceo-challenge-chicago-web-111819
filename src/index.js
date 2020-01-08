document.addEventListener("DOMContentLoaded", function(){
    fetchDogs();
    fetchBreeds();
})

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

function fetchBreeds() {
    const breedUrl = 'https://dog.ceo/api/breeds/list/all'

    return fetch(breedUrl)
        .then(resp => resp.json())
        .then(json => renderUlTag(json));
}

function renderUlTag(json) {
    const mainUl = document.querySelector('#dog-breeds');

    const breeds = json.message;
    for (const breed in breeds) {
        if (breeds[breed].length > 0) {
        
        const li = document.createElement('li');
        li.innerHTML = breed;
        mainUl.appendChild(li)
        
        const subBreeds = breeds[breed];
        const subul = document.createElement('ul');

        li.appendChild(subul);

        for (const subBreed in subBreeds) {
            const subli = document.createElement('li');
            
            subli.innerHTML = subBreeds[subBreed];
            subul.appendChild(subli);

        }
        } else {
            const li = document.createElement('li');
            li.innerHTML = breed;
            mainUl.appendChild(li);
        }
    }
    console.log("Breeds: ", json);
    
}
// function renderUlTag(json) {
//     const ul = document.querySelector('#dog-breeds');



//     // json.message.for (breedname => {
//     //     const li = document.createElement('li');
        
//     //     console.log(breedname);
//     //     // if ( ) {
//         //     li.innerHTML = ``;
//         // }
//         // ul.appendChild(p);
//     });
// }