let imgBreedUrl =  "https://api.thecatapi.com/v1/images/search?breed_ids=";

<<<<<<< HEAD
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
=======
>>>>>>> 63bf8f836a3df101a9c854e6c971b1d247fd8684

function getCats(url) {
    return $.getJSON(url); 
}

function getBreedImg(breed){
<<<<<<< HEAD
=======
    console.log(imgBreedUrl + breed);
>>>>>>> 63bf8f836a3df101a9c854e6c971b1d247fd8684
    return $.getJSON(imgBreedUrl + breed);
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
                    reject('No se encontraron coincidencias para la raza proporcionada');

                    let error = $('<h1 class=" font-bold text-center"></h1>').text('Lo sentimos. No encontramos datos sobre esta raza.');
                    catPage.append(error);
                }

                
            })
            .fail(function(jqXHR, textStatus, errorThrown) {
                reject(errorThrown);
            });
    });
}


<<<<<<< HEAD
function addFavoriteEventListeners(favoriteItem,catBreed ,catId) {
=======
function addFavoriteEventListeners(favoriteItem,catBreed) {
>>>>>>> 63bf8f836a3df101a9c854e6c971b1d247fd8684
    let currentUser = localStorage.getItem('currentUsername');
    if(currentUser){
        let favorites = JSON.parse(localStorage.getItem(`favorites-${currentUser}`)) || [];

        let existingFavorite = favorites.find(cat => cat.breed === catBreed);

        if (!existingFavorite){

            getCatInfo(catBreed)
            .then(function(catInfo) {

                let cat= {
<<<<<<< HEAD
                    id: catId,
=======
>>>>>>> 63bf8f836a3df101a9c854e6c971b1d247fd8684
                    breed: catInfo.breed,
                    origin: catInfo.origin,
                    coat: catInfo.coat,
                    pattern: catInfo.pattern
<<<<<<< HEAD
                    
=======
>>>>>>> 63bf8f836a3df101a9c854e6c971b1d247fd8684
                }

                favorites.push(cat);
                localStorage.setItem(`favorites-${currentUser}`, JSON.stringify(favorites));

                alert('Added to favorites');
            })
            .catch(function(error) {
                console.error('Error:', error);
            });


        favorites.push(cat);
        localStorage.setItem(`favorites-${currentUser}`, JSON.stringify(favorites));
        favoriteItem.text('Added to favorites');
        favoriteItem.attr('disabled', true);
        }else{
            alert('This cat is already in your favorites');
        }

        
    }else{
        alert('You must be logged in to add favorites');
    }
    
<<<<<<< HEAD
}


function redirectToCatPage(catBreed,catId) {
    catBreed = catBreed.replace(' ', '%20');
    window.location.href = `cat.html?breed=${catBreed}&id=${catId}`;

}

=======
}
>>>>>>> 63bf8f836a3df101a9c854e6c971b1d247fd8684
