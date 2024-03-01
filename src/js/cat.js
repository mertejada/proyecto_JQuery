/*let imgBreedUrl =  "https://api.thecatapi.com/v1/images/search?breed_ids=";


function getCatInfo(catBreed) {
    return new Promise(function(resolve, reject) {
        getCats(catUrl)
            .done(function(data) {
                let catsData = data.data;
                let catInfo = catsData.find(cat => cat.breed.toLowerCase() === catBreed.toLowerCase());
                resolve(catInfo);
            })
            .fail(function(jqXHR, textStatus, errorThrown) {
                reject(errorThrown);
            });
    });
}

function createCatPage(catInfo) {
    let catPage = $('#cat-info');
    let catInfoHtml = `
    <div  class="flex flex-col justify-center ">

        <h1 class="text-3xl font-bold text-center">${catInfo.breed}</h1>
        <div id="cat-description" class="flex flex-col justify-center p-6 m-6 border rounded-2xl">
        <div>
            <h2 class="text-2xl font-semibold text-gray-500">Origin</h2>
            <p>${catInfo.origin}</p>
        </div>
        <div>
            <h2 class="text-2xl font-semibold text-gray-500">Coat</h2>
            <p>${catInfo.coat}</p>
        </div>
        <div>
            <h2 class="text-2xl font-semibold text-gray-500">Pattern</h2>
            <p>${catInfo.pattern}</p>
        </div>
        </div>
    
        </div>
    `;
    catPage.append(catInfoHtml);
}

let breed = decodeURIComponent(window.location.href.split('=')[1]); // Decodificar URI

getCatInfo(breed)
    .then((catInfo) => {
        createCatPage(catInfo);
    })
    .catch((error) => {
        console.error('Error en la petición:', error);
    });




function getBreedImg(breed) {
    breed = breed.toLowerCase();
    breed = breed.substring(0, 4); //es porque en la api no hay imagenes para todas las razas
    return $.getJSON(imgBreedUrl + breed);
}

let imgNumber = 3;

for(let i = 0; i < imgNumber; i++){
    getBreedImg(breed)
    .done((data)=>{
        let img = data[0].url;
        let imgElement = $('<img>').attr('src', img);
        //añade calses para que la imagen sea pequeña 
        imgElement.addClass('w-1/4 h-1/4');

        $('#cat-img').append(imgElement);
    })
    .fail(function(jqXHR, textStatus, errorThrown){
        console.error('Error en la petición:', textStatus, errorThrown);
    });
}

*/