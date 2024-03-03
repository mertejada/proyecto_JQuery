//Consigo la raza de la url
let breed = decodeURIComponent(window.location.href.split('=')[1]);
breed = breed.split('&')[0];

//Consigo el id de la url
let id = decodeURIComponent(window.location.href.split('=')[2]);

//Elementos del HTML
let catPage = $('#cat-info');
let catTable = $('#cat-table');
let actions = $('#actions');

//Añado el título de la raza
let titleElement = $('<h1 class="text-3xl font-bold text-center"></h1>').text(breed);
catPage.prepend(titleElement);

//FUNCION PARA CREAR LA TABLA DE INFORMACION DEL GATO
//--------------------------------------------------
function createCatTable(catInfo) {
    catTable.empty();
    catTable.addClass('w-1/2 mx-auto');

    for (let key in catInfo) {
        let catTableRow = $('<tr></tr>');

        let keyName = key.charAt(0).toUpperCase() + key.slice(1); //venia en un formato que no me gustaba

        catTableRow.append($('<th></th>').text(keyName));
        catTableRow.append($('<td></td>').text(catInfo[key]));
        catTable.append(catTableRow);
    }
}

//FUNCION PARA AÑADIR LA INFORMACION DE LA RAZA
//---------------------------------------------
function appendBreedInfo(breedInfo) {
    //He limitado las caracteristicas que quiero mostrar porque eran muchas, pero podria mostrar mas
    /*IMPORTANTE: Tambien podria haber mostrado aqui el origen, patron, etc. y no DEPENDER de que la API gratuita
    tambien tenga la raza que muestro, pero es que si no no entendia el objetivo de utilizar la API gratuita si no la necesitaba
    */
    let keysToUse = [
        "temperament", "description", "life_span", "indoor", "dog_friendly",
        "child_friendly", "energy_level", "shedding_level", "grooming",
        "intelligence", "social_needs", "stranger_friendly", "wikipedia_url"
    ];

    for (let key in breedInfo) {
        if (keysToUse.includes(key)) {
            let catTableRow = $('<tr></tr>');

            catTableRow.addClass('border-b-2 border-gray-300');


            let keyName = key.split('_').join(' ');
            keyName = keyName.charAt(0).toUpperCase() + keyName.slice(1);

            catTableRow.append($('<th></th>').text(keyName)); // Encabezado a la izquierda


            //Aqui controlo que no salgan 0 o 1 en lugar de afirmaciones o negaciones, etc.
            if (breedInfo[key] === null) {
                catTableRow.append($('<td></td>').text('No data available'));
            } else if (breedInfo[key] == true) {
                catTableRow.append($('<td></td>').text('Yes'));
            } else if (breedInfo[key] == false) {
                catTableRow.append($('<td></td>').text('No'));
            } else {
                catTableRow.append($('<td></td>').text(breedInfo[key]));
            }

            catTable.append(catTableRow);

        }


    }
}

//FUNCION PARA AÑADIR LAS ACCIONES: ME GUSTA, NO ME GUSTA, FAVORITOS
//---------------------------------------------------------------------
function addActions(id) {
    let likes = 0;
    let dislikes = 0;

    if (localStorage.getItem('likedCats')) {
        let likedCats = JSON.parse(localStorage.getItem('likedCats'));
        likes = likedCats[id] || 0;
    }

    if (localStorage.getItem('dislikedCats')) {
        let dislikedCats = JSON.parse(localStorage.getItem('dislikedCats'));
        dislikes = dislikedCats[id] || 0;
    }

    let likeButton = $(`<button class="bg-green-500 text-white p-2 m-5 rounded">I like it! (<span id="likes-${id}">${likes}</span>)</button>`);
    let dislikeButton = $(`<button class="text-red-400 border-red-400 p-2 m-5 rounded">I don\'t like it (<span id="dislikes-${id}">${dislikes}</span>)</button>`);
    let favoriteButton = $(`<button class="bg-blue-500 text-white p-2 m-5 rounded">Add to favorites</button>`);


    likeButton.on('click', function () { like(id); });
    dislikeButton.on('click', function () { dislike(id); });
    favoriteButton.on('click', function () { addFavorite(breed, id); });

    actions.prepend(likeButton, dislikeButton, favoriteButton);
}


//PROMESA PARA OBTENER LA INFORMACION DEL GATO
//----------------------------------------------
/*Lo he hecho asi porque si no a veces una api tardaba mas en devolver la informacion que la otra y no se mostraba bien
*/
Promise.all([
    /*esto es lo que me devuelve la API gratuita, por eso si no coincide y 
    no encontraba informacion de la raza, devolvia un objeto vacio (global.js linea 69)*/
    getCatInfo(breed),

    //completo la informacion con la API de pago
    getBreedImg(id),
    getBreedInfo(id)

]).then(function (results) {
    let catInfo = results[0];
    let imgData = results[1];
    let breedInfo = results[2].find(cat => cat.id === id);

    createCatTable(catInfo);

    $('#cat-img').empty();
    $('#cat-img').addClass('grid grid-cols-3 gap-4 justify-center');

    for (let i = 0; i < Math.min(imgData.length, 6); i++) { //Si hay mas de 6 imagenes, solo muestro 6
        let img = imgData[i].url;
        let imgElement = $('<img>').attr('src', img);
        $('#cat-img').append(imgElement);
    }

    appendBreedInfo(breedInfo);
    addActions(id);
}).catch(function (error) {
    console.error('Error:', error);
});

