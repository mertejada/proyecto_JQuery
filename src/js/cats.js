let catUrl = 'https://catfact.ninja/breeds';
let catBreedsUrl =  "https://api.thecatapi.com/v1/breeds?limit=25";
let imgBreedUrl =  "https://api.thecatapi.com/v1/images/search?breed_ids=";



let catList = $('#cat-list');
let catTable = $('#cat-table');

let currentView = 'list';


function getCatsBreeds(url) {
    return $.getJSON(url); 
}

function createListView(catsData) {
    catList.empty();
    
    catsData.forEach(cat => {
        let catItem = $('<li></li>');
        catItem.addClass('border', 'border-gray-200', 'p-10', 'justify-between', 'items-center', 'bg-white', 'mb-4', 'rounded', 'shadow-md');
        catItem.html(`
            <div>
                <h2 class="text-xl font-semibold">${cat.name}</h2>
            </div>
            <div>
                <a href="#" id="see-${cat.name}" class="see-more-button bg-orange-500 text-white p-2 m-5 rounded">See more</a>
            </div>
        `);
        
        catList.append(catItem); // Agregar el elemento a la lista

        $('.see-more-button').on('click', function(event) {
            event.preventDefault();
            let breed = $(this).attr('id').split('-')[1];
            redirectToCatPage(breed);
        });
    });


    // Manejar clics en los enlaces "See more"
    

    // Ocultar la tabla y mostrar la lista
    catTable.hide();
    catList.show();
}

function createTableView(catsData){
    let tbody = $("#cat-table tbody");
    tbody.empty(); 

    catsData.forEach(cat => {
        let catItem = $('<tr></tr>');
        catItem.html(`
            <td class="border px-4 py-2">${cat.name}</td>`);

        tbody.append(catItem); 

        $('.see-more-button').on('click', function(event) {
            event.preventDefault();
            let breed = $(this).attr('id').split('-')[1];
            redirectToCatPage(breed);
        });

    });

    catList.hide();
    catTable.show();
}


function displayView(currentView) {
    getCatsBreeds(catBreedsUrl)
        .done(function(data) {
            

            if(currentView === 'list'){
                createListView(data);
            }else{
                createTableView(data);

            }
        })
        .fail(function(jqXHR, textStatus, errorThrown) {
            console.error('Error en la petición:', textStatus, errorThrown);
        });
}

$('#choose-view').on('click', function(event) {
    if (event.target.id === 'list') {
        currentView = 'list';
        displayView(currentView);

    } else if (event.target.id === 'table') {
        currentView = 'table';
        displayView(currentView);
    }
    
});


displayView(currentView);

function redirectToCatPage(catBreed) {
    catBreed = catBreed.replace(' ', '%20');

    window.location.href = `cat.html?breed=${catBreed}`;
}


function getBreedImg(breed, url) {
    return $.getJSON(imgBreedUrl + breed);
}
