let catUrl = 'https://catfact.ninja/breeds';
let catBreedsUrl =  "https://api.thecatapi.com/v1/breeds?limit=25";

function getCats(url) {
    return $.getJSON(url); 
}

function getCatsBreeds(url) {
    //hacer todo aqui 
}

/*
getBreeds(breedsUrl)
    .then((data) => {
        console.log(data);
    })
    .catch((error) => {
        console.error('Error en la petición:', error);
    });
*/