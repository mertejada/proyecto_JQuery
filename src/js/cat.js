
let breed = decodeURIComponent(window.location.href.split('=')[1]);
breed = breed.split('&')[0]; 

let id = decodeURIComponent(window.location.href.split('=')[2]);

console.log(breed);
console.log(id);

let catUrl = 'https://catfact.ninja/breeds';

let catPage = $('#cat-info');

function getCats(url) {
    return $.getJSON(url);
}


function createCatPage(catInfo) {
    let catPage = $('<div class="flex flex-col justify-center"></div>');

    let catInfoHtml = $('<h1 class="text-3xl font-bold text-center"></h1>').text(breed);
    let catDescription = $('<div id="cat-description" class="flex flex-col justify-center p-6 m-6 border rounded-2xl"></div>');

    let origin = $('<div><h2 class="text-2xl font-semibold text-gray-500">Origin</h2><p></p></div>').find('p').text(catInfo.origin).end();
    let coat = $('<div><h2 class="text-2xl font-semibold text-gray-500">Coat</h2><p></p></div>').find('p').text(catInfo.coat).end();
    let pattern = $('<div><h2 class="text-2xl font-semibold text-gray-500">Pattern</h2><p></p></div>').find('p').text(catInfo.pattern).end();

    catDescription.append(origin, coat, pattern);
    catPage.append(catInfoHtml, catDescription);

    $('#cat-info').append(catPage);
}


getCatInfo(breed)
    .then(function(catInfo) {
        createCatPage(catInfo);
    })
    .catch(function(error) {
        console.error('Error:', error);
    });

getBreedImg(id)
    .done((data)=>{
        let img = data[0].url;
        let imgElement = $('<img>').attr('src', img);
        imgElement.addClass('h-96');

        $('#cat-img').append(imgElement);
        console.log(id);
    })
    .fail(function(jqXHR, textStatus, errorThrown){
        console.error('Error en la petición:', textStatus, errorThrown);
    });

