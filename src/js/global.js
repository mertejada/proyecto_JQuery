let imgBreedUrl =  "https://api.thecatapi.com/v1/images/search?breed_ids=";
let catBreedsUrl = "https://api.thecatapi.com/v1/breeds";
let close = document.getElementById('close-session');

if(localStorage.getItem('currentUsername')){

    close.addEventListener('click', () => {
    localStorage.removeItem('currentUsername');
    window.location.href = 'index.html';

});}else{
    close.style.display = 'none';

    let logIn = document.getElementById('log-in');
    logIn.style.display = 'block';
}

function getCats(url) {
    return $.getJSON(url); 
}

function getBreedImg(breed){
    return $.getJSON(imgBreedUrl + breed);
}

function getBreedInfo(breed){
    return $.getJSON(catBreedsUrl);
}

function getCatInfo(catBreed) {
    return new Promise(function(resolve, reject) {
        getCats(catUrl)
            .done(function(data) {
                let catsData = data.data;
                let catInfo = catsData.find(cat => cat.breed === catBreed);

                if (catInfo) {
                    resolve(catInfo); 
                } else {
                    console.error('No se encontraron coincidencias para la raza proporcionada');
                    // No se rechaza la promesa, simplemente se resuelve con un objeto vacío
                    resolve({});
                    let message = 'No se pueden mostrar algunas características de la raza.';
                    catInfo.append($('<td></td>').text(message));
                }

                
            })
            .fail(function(jqXHR, textStatus, errorThrown) {
                reject(errorThrown);
            });
    });
}

function addFavorite(catBreed ,catId) {
    let currentUser = localStorage.getItem('currentUsername');
    if(currentUser){
        let favorites = JSON.parse(localStorage.getItem(`favorites-${currentUser}`)) || [];

        let existingFavorite = favorites.find(cat => cat.breed === catBreed);

        if (!existingFavorite){

            let cat = {
                breed: catBreed,
                id: catId
            };

            favorites.push(cat);
            localStorage.setItem(`favorites-${currentUser}`, JSON.stringify(favorites));

            alert('The cat has been added to your favorites');
        
        }else{
            alert('This cat is already in your favorites');
        }
    }else{
        alert('You must be logged in to add favorites');
    }   
}

function redirectToCatPage(catBreed,catId) {
    catBreed = catBreed.replace(' ', '%20');
    window.location.href = `cat.html?breed=${catBreed}&id=${catId}`;
}

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

