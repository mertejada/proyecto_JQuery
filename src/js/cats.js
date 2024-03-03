


let catList = $('#cat-list'); // Lista de gatos
let catTable = $('#cat-table'); // Tabla de gatos

let currentView = 'list';//vista por defecto
let sortBy = 'asc'; //Ordenar por defecto
let currentPage = 0; //Pagina actual
let catsPerPage = 7; //Gatos por pagina

//Modifico la url de la API para poder hacer el scroll gracias a la paginación
catBreedsUrl = "https://api.thecatapi.com/v1/breeds" + `?limit=${catsPerPage}&page=${currentPage}`;


//FUNCION PARA CREAR LA VISTA DE LISTA
//-------------------------------------
function createListView(catsData) {
    catList.empty();

    catsData.forEach(cat => { // recorro el array de gatos
        let catItem = $('<li></li>');

        getBreedImg(cat.id)
            .done((data) => {
                let img = data[0].url;
                let imgElement = $('<img>').attr('src', img);
                imgElement.addClass('h-fit');

                catItem.prepend(imgElement);
            })
            .fail(function (jqXHR, textStatus, errorThrown) {
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
                    <button id="add-to-favorites-${cat.id}" class="add-to-favorites bg-gray-400 text-white p-2 rounded cursor-pointer mt-3 mx-4">Add to favorites</button>

                </div>
            </div>
            `);

        catList.append(catItem); // Agregar el elemento a la lista

        //Evento para ver mas informacion del gato
        $('.see-more-button').on('click', function (event) {
            event.preventDefault();
            let breed = $(this).attr('id').split('-')[1];
            let id = $(this).attr('id').split('-')[2];

            redirectToCatPage(breed, id);

        });

        //Evento para añadir a favoritos
        $('#add-to-favorites-' + cat.id).on('click', function (event) {
            event.preventDefault();
            addFavorite(cat.name, cat.id);
        });

    });
    catTable.hide();
    catList.show();
}

//FUNCION PARA CREAR LA VISTA DE TABLA
//-------------------------------------
function createTableView(catsData) {
    let tbody = $("#cat-table tbody");
    tbody.empty();

    catsData.forEach(cat => {
        let catItem = $('<tr></tr>');

        getBreedImg(cat.id)
            .done((data) => {
                let img = data[0].url;
                let imgElement = $('<img>').attr('src', img);

                imgElement.addClass('h-100');

                let imgTd = $('<td></td>');

                imgTd.append(imgElement);
                catItem.prepend(imgTd);
            })
            .fail(function (jqXHR, textStatus, errorThrown) {
                console.error('Error en la petición:', textStatus, errorThrown);
            });

        catItem.html(`
                <td class="border px-4 py-2">${cat.name}</td>
                <td><a href="#" id="see-${cat.name}" class="see-more-button bg-orange-500 text-white p-2 m-5 rounded">See more</a></td>
                <td><button id="add-to-favorites-table-${cat.id}" class="add-to-favorites bg-gray-400 text-white p-2 rounded cursor-pointer">Add to favorites</button></td>

                `);
        tbody.append(catItem);

        //Evento para ver mas informacion del gato
        $('.see-more-button').on('click', function (event) {
            event.preventDefault();
            let breed = $(this).attr('id').split('-')[1];
            redirectToCatPage(breed, cat.id);
        });

        //Evento para añadir a favoritos
        $('#add-to-favorites-table-' + cat.id).on('click', function (event) {
            event.preventDefault();
            addFavorite(cat.name, cat.id);
        });

    });

    catList.hide();
    catTable.show();
}

//FUNCION PARA MOSTRAR LA VISTA
//--------------------------------
function displayView(currentView, sortBy) {
    getCatsBreeds(catBreedsUrl)
        .done(function (data) {

            if (sortBy === 'desc') {
                data.sort((a, b) => a.name < b.name ? 1 : -1); //esto ordena los datos de forma descendente
            }

            if (currentView === 'list') {
                createListView(data);
            } else {
                createTableView(data);
            }
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            console.error('Error en la petición:', textStatus, errorThrown);
        });
}

//FUNCION PARA REDIRECCIONAR A LA PAGINA DE GATO
//----------------------------------------------
function redirectToCatPage(catBreed, catId) {
    const encodedCatBreed = encodeURIComponent(catBreed.replace(/-/g, ' '));
    //deberia funcionar, pero si entramos en el gato Chantilly-Tiffany, no funciona porque tiene un guion y no he conseguido solucionarlo
    window.location.href = `cat.html?breed=${encodedCatBreed}&id=${catId}`;
}


//FUNCION PARA AÑADIR MAS GATOS A LA LISTA O LA TABLA (para el scroll)
//---------------------------------------------------
/*probablemente haya una maanera mas eficiente de hacer esto para no tener que "repetir codigo" 
pero no he conseguido hacerlo de otra manera con el poco tiempo que hay*/
function addCatsToList(newCatsData) {
    if (currentView === 'list') {
        newCatsData.forEach(cat => {
            let catItem = $('<li></li>');

            getBreedImg(cat.id)
                .done((data) => {
                    let img = data[0].url;
                    let imgElement = $('<img>').attr('src', img);
                    imgElement.addClass('h-fit');
                    catItem.prepend(imgElement);
                })
                .fail(function (jqXHR, textStatus, errorThrown) {
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
                            <button id="add-to-favorites-${cat.id}" class="add-to-favorites bg-gray-400 text-white p-2 rounded cursor-pointer mt-3 mx-4">Add to favorites</button>
                        </div>
                    </div>
                `);
            catList.append(catItem);

            $('.see-more-button').on('click', function (event) {
                event.preventDefault();
                let breed = $(this).attr('id').split('-')[1];
                let id = $(this).attr('id').split('-')[2];
                redirectToCatPage(breed, id);
            });

            $('#add-to-favorites-' + cat.id).on('click', function (event) {
                event.preventDefault();
                addFavorite(cat.name, cat.id);
            });

        });
    } else {
        newCatsData.forEach(cat => {
            let catItem = $('<tr></tr>');

            getBreedImg(cat.id)
                .done((data) => {
                    let img = data[0].url;
                    let imgElement = $('<img>').attr('src', img);
                    imgElement.addClass('h-100');
                    let imgTd = $('<td></td>');
                    imgTd.append(imgElement);
                    catItem.prepend(imgTd);
                })
                .fail(function (jqXHR, textStatus, errorThrown) {
                    console.error('Error en la petición:', textStatus, errorThrown);
                });

            catItem.html(`
                    <td class="border px-4 py-2">${cat.name}</td>
                    <td><a href="#" id="see-${cat.name}" class="see-more-button bg-orange-500 text-white p-2 m-5 rounded">See more</a></td>
                    <td><button id="add-to-favorites-table-${cat.id}" class="add-to-favorites bg-gray-400 text-white p-2 rounded cursor-pointer">Add to favorites</button></td>
                `);
            $('#cat-table tbody').append(catItem);

            $('.see-more-button').on('click', function (event) {
                event.preventDefault();
                let breed = $(this).attr('id').split('-')[1];
                redirectToCatPage(breed, cat.id);
            });

            $('#add-to-favorites-table-' + cat.id).on('click', function (event) {
                event.preventDefault();
                addFavorite(cat.name, cat.id);
            });



        });
    }
}


//Evento para cambiar la vista 
//-------------------------------------------
$('#choose-view').on('click', function (event) {
    if (event.target.id === 'list') {
        currentPage = 1;
        currentView = 'list';
        displayView(currentView, sortBy);

    } else if (event.target.id === 'table') {
        currentPage = 1;
        currentView = 'table';
        displayView(currentView, sortBy);
    }

});

//Evento para cambiar el orden
//------------------------------------------------
$('#sort-by').on('change', function () {
    sortBy = $(this).val();
    currentPage = 1;
    displayView(currentView, sortBy);
});



//Evento para hacer scroll infinito
//------------------------------------------------
$(window).scroll(function () {
    if ($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
        currentPage++;
        let newCatBreedsUrl = "https://api.thecatapi.com/v1/breeds" + `?limit=${catsPerPage}&page=${currentPage}`;

        getCatsBreeds(newCatBreedsUrl)
            .done(function (data) {
                addCatsToList(data);
            })
            .fail(function (jqXHR, textStatus, errorThrown) {
                console.error('Error en la petición:', textStatus, errorThrown);
            });
    }
});


//Cargo la vista por defecto
displayView(currentView, sortBy);









