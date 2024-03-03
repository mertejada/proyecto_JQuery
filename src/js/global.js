//VARIABLES DE URL
//-----------------
let imgBreedUrl = "https://api.thecatapi.com/v1/images/search?breed_ids="; //URL para obtener la imagen de la raza de gato
let catBreedsUrl = "https://api.thecatapi.com/v1/breeds"; //URL para obtener la informacion de la raza de gato
let catUrl = 'https://catfact.ninja/breeds'; //URL para obtener las razas de gatos de la API gratuita 




//CERRAR SESION
//---------------------------------------------------------
let close = document.getElementById('close-session');

if (localStorage.getItem('currentUsername')) {

    close.addEventListener('click', () => {
        localStorage.removeItem('currentUsername');
        window.location.href = 'index.html';

    });
} else {
    close.style.display = 'none';

    let logIn = document.getElementById('log-in');
    logIn.style.display = 'block';
}

//OBTENER RAZAS DE GATOS DE LA API GRATUITA
//------------------------------------------
function getCats(url) {
    return $.getJSON(url);
}

//OBTENER RAZAS DE GATOS DE LA API 
//------------------------------------------
function getCatsBreeds(url) {
    return $.getJSON(url);
}


//OBTENER IMAGEN DE RAZA LA API DE THECATAPI
//------------------------------------------
function getBreedImg(breed) {
    return $.getJSON(imgBreedUrl + breed + '&limit=3'); // Ajusta la URL para obtener tres imágenes
}

//OBTENER INFORMACION DE RAZA DE GATOS DE LA API DE THECATAPI
//-----------------------------------------------------------
function getBreedInfo(breed) {
    return $.getJSON(catBreedsUrl);
}



//BUSCAR SI EN LA API GRATUITA EXISTE LA RAZA DE GATO DE LA API DE THECATAPI
//--------------------------------------------------------------------------
function getCatInfo(catBreed) {
    return new Promise(function (resolve, reject) {
        getCats(catUrl) //Se obtienen las razas de gatos de la API gratuita
            .done(function (data) {
                let catsData = data.data;
                let catInfo = catsData.find(cat => cat.breed === catBreed); //Se busca la raza de gato en la API gratuita

                if (catInfo) {
                    resolve(catInfo);
                } else {
                    console.error('No se encontraron coincidencias para la raza proporcionada');
                    resolve({}); //Se resuelve la promesa con un objeto vacío para que el código no falle en la promesa mas adelante
                }
            })
            .fail(function (jqXHR, textStatus, errorThrown) {
                reject(errorThrown);
            });
    });
}


//FUNCION PARA AÑADIAR A FAVORITOS
//--------------------------------
function addFavorite(catBreed, catId) {
    let currentUser = localStorage.getItem('currentUsername');
    if (currentUser) {
        let favorites = JSON.parse(localStorage.getItem(`favorites-${currentUser}`)) || [];

        let existingFavorite = favorites.find(cat => cat.breed === catBreed);

        if (!existingFavorite) {

            let cat = {
                breed: catBreed,
                id: catId
            };

            favorites.push(cat);
            localStorage.setItem(`favorites-${currentUser}`, JSON.stringify(favorites));

            alert('The cat has been added to your favorites');

        } else {
            alert('This cat is already in your favorites');
        }
    } else {
        alert('You must be logged in to add favorites');
    }
}

//FUNCION PARA REDIRECCIONAR A LA PAGINA DE GATO
//----------------------------------------------
function redirectToCatPage(catBreed, catId) {
    catBreed = catBreed.replace(' ', '%20');
    window.location.href = `cat.html?breed=${catBreed}&id=${catId}`;
}

//FUNCIONES PARA DAR LIKE Y DISLIKE A LOS GATOS
//---------------------------------------------
//DAR LIKE A LOS GATOS
function like(catId) {

    if (!localStorage.getItem('likedCats')) {
        localStorage.setItem('likedCats', JSON.stringify({}));
    }


    let likedCats = JSON.parse(localStorage.getItem('likedCats'));

    if (likedCats[catId]) {
        likedCats[catId]++;
    } else {
        likedCats[catId] = 1;
    }

    localStorage.setItem('likedCats', JSON.stringify(likedCats));

    updateLikesCount(catId, likedCats[catId]);
}

function updateLikesCount(catId, likesCount) {
    let catLikes = document.getElementById(`likes-${catId}`);
    if (catLikes) {
        catLikes.innerHTML = likesCount;
    }
}

//DAR DISLIKE A LOS GATOS
function dislike(catId) {
    if (!localStorage.getItem('dislikedCats')) {
        localStorage.setItem('dislikedCats', JSON.stringify({}));
    }

    let dislikedCats = JSON.parse(localStorage.getItem('dislikedCats'));

    if (dislikedCats[catId]) {
        dislikedCats[catId]++;
    } else {
        dislikedCats[catId] = 1;
    }

    localStorage.setItem('dislikedCats', JSON.stringify(dislikedCats));

    updateDislikesCount(catId, dislikedCats[catId]);
}

function updateDislikesCount(catId, dislikesCount) {
    let catDislikes = document.getElementById(`dislikes-${catId}`);
    if (catDislikes) {
        catDislikes.innerHTML = dislikesCount;
    }
}

