let catUrl = 'https://catfact.ninja/breeds';

<<<<<<< HEAD
=======



>>>>>>> 63bf8f836a3df101a9c854e6c971b1d247fd8684
let catList = $('#cat-list');
let catTable = $('#cat-table');

let currentView = 'list';

let currentPage = 0;
<<<<<<< HEAD
let catsPerPage = 20;

let catBreedsUrl =  "https://api.thecatapi.com/v1/breeds" + `?limit=${catsPerPage}&page=${currentPage}`;

let sortBy = 'asc';


//un evento para cambiar el sortby

$('#sort-by').on('change', function() {
    sortBy = $(this).val();
    currentPage = 1;
    displayView(currentView);
    console.log(sortBy);
});



function getCatsBreeds(url, sortBy) {
    return $.getJSON(url);
}


=======
let catsPerPage = 5;

let catBreedsUrl =  "https://api.thecatapi.com/v1/breeds" + `?limit=${catsPerPage}&page=${currentPage}`;




function getCatsBreeds(url) {
    return $.getJSON(url);
}

>>>>>>> 63bf8f836a3df101a9c854e6c971b1d247fd8684
function createListView(catsData) {
    catList.empty();
    
    catsData.forEach(cat => {
        let catItem = $('<li></li>');

        getBreedImg(cat.id)
        .done((data)=>{
            let img = data[0].url;
            let imgElement = $('<img>').attr('src', img);
            imgElement.addClass('h-fit');
    
            catItem.prepend(imgElement);
        })
        .fail(function(jqXHR, textStatus, errorThrown){
            console.error('Error en la petición:', textStatus, errorThrown);
        });
        
        
        
        catItem.addClass('border', 'border-gray-200', 'p-10', 'justify-between', 'items-center', 'bg-white', 'mb-4', 'rounded', 'shadow-md');
        catItem.html(`
        <div class="flex flex-col justify-between items-center gap-2">
            <div>
                <h2 class="text-xl font-semibold">${cat.name}</h2>
            </div>
            <div>
                <a href="#" id="see-${cat.name}-${cat.id}" class="see-more-button bg-orange-500 text-white p-2 m-5 rounded">See more</a>
                <button id="add-to-favorites-${cat.id}" class=" bg-gray-400 text-white p-2 rounded cursor-pointer mt-3 mx-4">Add to favorites</button>

            </div>
        </div>
        `);
        catList.append(catItem); // Agregar el elemento a la lista

        $('.see-more-button').on('click', function(event) {
            event.preventDefault();
            let breed = $(this).attr('id').split('-')[1]; 
            let id = $(this).attr('id').split('-')[2];

            redirectToCatPage(breed,id);

        });

        let addToFavoritesButton = $('#add-to-favorites-'+cat.id);

        addToFavoritesButton.on('click', (event)=>{
            event.preventDefault();
<<<<<<< HEAD
            addFavoriteEventListeners(addToFavoritesButton, cat.name, cat.id);
        });
        
    });
=======
            addFavoriteEventListeners(addToFavoritesButton, cat.name);
        });
        
    });


    // Manejar clics en los enlaces "See more"
    

    // Ocultar la tabla y mostrar la lista
>>>>>>> 63bf8f836a3df101a9c854e6c971b1d247fd8684
    catTable.hide();
    catList.show();
}

function createTableView(catsData){
    let tbody = $("#cat-table tbody");
    tbody.empty(); 

    catsData.forEach(cat => {
        let catItem = $('<tr></tr>');
        
        getBreedImg(cat.id)
        .done((data)=>{
            let img = data[0].url;
            let imgElement = $('<img>').attr('src', img);

            imgElement.addClass('h-100');

            let imgTd = $('<td></td>');

            imgTd.append(imgElement);
            catItem.prepend(imgTd);
        })
        .fail(function(jqXHR, textStatus, errorThrown){
            console.error('Error en la petición:', textStatus, errorThrown);
        });

        catItem.html(`
            <td class="border px-4 py-2">${cat.name}</td>
            <td><a href="#" id="see-${cat.name}" class="see-more-button bg-orange-500 text-white p-2 m-5 rounded">See more</a></td>

            `);
<<<<<<< HEAD
=======


>>>>>>> 63bf8f836a3df101a9c854e6c971b1d247fd8684
        tbody.append(catItem); 

        $('.see-more-button').on('click', function(event) {
            event.preventDefault();
            let breed = $(this).attr('id').split('-')[1];
            redirectToCatPage(breed,cat.id);
        });

    });

    catList.hide();
    catTable.show();
}


function displayView(currentView) {
    getCatsBreeds(catBreedsUrl) // Obtener la lista de razas de gatos
        .done(function(data) { // Si la petición es exitosa
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

function redirectToCatPage(catBreed,catId) {
    catBreed = catBreed.replace(' ', '%20');
<<<<<<< HEAD
=======

>>>>>>> 63bf8f836a3df101a9c854e6c971b1d247fd8684
    window.location.href = `cat.html?breed=${catBreed}&id=${catId}`;

}





