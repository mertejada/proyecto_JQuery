
let breed = decodeURIComponent(window.location.href.split('=')[1]);
breed = breed.split('&')[0]; 

let id = decodeURIComponent(window.location.href.split('=')[2]);


let catUrl = 'https://catfact.ninja/breeds';

let catPage = $('#cat-info');
let catTable = $('#cat-table');


let titleElement = $('<h1 class="text-3xl font-bold text-center"></h1>').text(breed);
catPage.prepend(titleElement);

function getCats(url) {
    return $.getJSON(url);
}


function createCatTable(catInfo) {
    catTable.empty();

    for (let key in catInfo) {
        let catTableRow = $('<tr></tr>');

        let keyName = key.charAt(0).toUpperCase() + key.slice(1);

        catTableRow.append($('<th></th>').text(keyName)); // Encabezado a la izquierda
        catTableRow.append($('<td></td>').text(catInfo[key])); // Información a la derecha
        catTable.append(catTableRow);
    }
}

function appendBreedInfo(breedInfo) {
    let keysToUse = [
        "temperament", "description", "life_span", "indoor", "dog_friendly",
        "child_friendly", "energy_level", "shedding_level", "grooming",
        "intelligence", "social_needs", "stranger_friendly" ,"wikipedia_url"
    ];

    for (let key in breedInfo) {
        if(keysToUse.includes(key)){
            let catTableRow = $('<tr></tr>');
        

            let keyName = key.split('_').join(' ');
            keyName = keyName.charAt(0).toUpperCase() + keyName.slice(1);
     
            catTableRow.append($('<th></th>').text(keyName)); // Encabezado a la izquierda
    
            if(breedInfo[key] === null){
                catTableRow.append($('<td></td>').text('No data available'));
            }else if(breedInfo[key] == true){
                catTableRow.append($('<td></td>').text('Yes'));
            }else if(breedInfo[key] == false){
                catTableRow.append($('<td></td>').text('No'));
            }else{
                catTableRow.append($('<td></td>').text(breedInfo[key])); 
            }
    
            catTable.append(catTableRow);
        
        }

        
    }
}


function addActions(id) {
    let likes = 0;
    let dislikes = 0;

    if(localStorage.getItem('likedCats')) {
        let likedCats = JSON.parse(localStorage.getItem('likedCats'));
        likes = likedCats[id] || 0;
    }

    if(localStorage.getItem('dislikedCats')) {
        let dislikedCats = JSON.parse(localStorage.getItem('dislikedCats'));
        dislikes = dislikedCats[id] || 0;
    }

    let likeButton = $(`<button class="bg-green-500 text-white p-2 m-5 rounded">I like it! (<span id="likes-${id}">${likes}</span>)</button>`);
    let dislikeButton = $(`<button class="text-red-400 border-red-400 p-2 m-5 rounded">I don\'t like it (<span id="dislikes-${id}">${dislikes}</span>)</button>`);
    let favoriteButton = $(`<button class="bg-blue-500 text-white p-2 m-5 rounded">Add to favorites</button>`);


    likeButton.on('click', function() { like(id);});
    dislikeButton.on('click', function() { dislike(id);});
    favoriteButton.on('click', function() { addFavorite(breed, id);});

    actions.prepend(likeButton, dislikeButton, favoriteButton);
}



Promise.all([
    getCatInfo(breed),
    getBreedImg(id),
    getBreedInfo(id)
]).then(function(results) {
    let catInfo = results[0];
    let imgData = results[1];
    let breedInfo = results[2].find(cat => cat.id === id);

    createCatTable(catInfo);
    
    let img = imgData[0].url;
    let imgElement = $('<img>').attr('src', img);
    imgElement.addClass('h-96');
    $('#cat-img').append(imgElement);

    appendBreedInfo(breedInfo);
    
    addActions(id);
}).catch(function(error) {
    console.error('Error:', error);
});

