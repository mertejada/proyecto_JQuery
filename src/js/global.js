let imgBreedUrl =  "https://api.thecatapi.com/v1/images/search?breed_ids=";


function getCats(url) {
    return $.getJSON(url); 
}

function getBreedImg(breed){
    console.log(imgBreedUrl + breed);
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


function addFavoriteEventListeners(favoriteItem,catBreed) {
    let currentUser = localStorage.getItem('currentUsername');
    if(currentUser){
        let favorites = JSON.parse(localStorage.getItem(`favorites-${currentUser}`)) || [];

        let existingFavorite = favorites.find(cat => cat.breed === catBreed);

        if (!existingFavorite){

            getCatInfo(catBreed)
            .then(function(catInfo) {

                let cat= {
                    breed: catInfo.breed,
                    origin: catInfo.origin,
                    coat: catInfo.coat,
                    pattern: catInfo.pattern
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
    
}