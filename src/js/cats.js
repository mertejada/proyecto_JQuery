    let catUrl = 'https://catfact.ninja/breeds';

    let catList = $('#cat-list');
    let catTable = $('#cat-table');

    let currentView = 'list';

    let currentPage = 0;
    let catsPerPage = 7;

    catBreedsUrl =  "https://api.thecatapi.com/v1/breeds" + `?limit=${catsPerPage}&page=${currentPage}`;

    let sortBy = 'asc';

    $('#sort-by').on('change', function() {
        sortBy = $(this).val();
        currentPage = 1;
        displayView(currentView,sortBy);
    });

    function getCatsBreeds(url) {
        return $.getJSON(url);
    }

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
                    <button id="add-to-favorites-${cat.id}" class="add-to-favorites bg-gray-400 text-white p-2 rounded cursor-pointer mt-3 mx-4">Add to favorites</button>

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

            $('#add-to-favorites-'+cat.id).on('click', function(event) {
                event.preventDefault();
                  addFavorite(cat.name, cat.id);
            });
            
        });
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
                <td><button id="add-to-favorites-table-${cat.id}" class="add-to-favorites bg-gray-400 text-white p-2 rounded cursor-pointer">Add to favorites</button></td>

                `);
            tbody.append(catItem); 

            $('.see-more-button').on('click', function(event) {
                event.preventDefault();
                let breed = $(this).attr('id').split('-')[1];
                redirectToCatPage(breed,cat.id);
            });

            $('#add-to-favorites-table-'+cat.id).on('click', function(event) {
                event.preventDefault();
                addFavorite(cat.name, cat.id);
            });

        });

        catList.hide();
        catTable.show();
    }


    function displayView(currentView, sortBy) {
        getCatsBreeds(catBreedsUrl) 
            .done(function(data) { 

                if(sortBy === 'desc'){
                    data.sort((a,b) => a.name < b.name ? 1 : -1);
                }

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
            currentPage = 1;
            currentView = 'list';
            displayView(currentView,sortBy);

        } else if (event.target.id === 'table') {
            currentPage = 1;
            currentView = 'table';
            displayView(currentView,sortBy);
        }
        
    });


    displayView(currentView,sortBy);

    function redirectToCatPage(catBreed, catId) {
        const encodedCatBreed = encodeURIComponent(catBreed.replace(/-/g, ' '));
        window.location.href = `cat.html?breed=${encodedCatBreed}&id=${catId}`;
    }


    $(window).scroll(function() {
        if($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
            currentPage++;
            let newCatBreedsUrl = "https://api.thecatapi.com/v1/breeds" + `?limit=${catsPerPage}&page=${currentPage}`;
            
            getCatsBreeds(newCatBreedsUrl)
                .done(function(data) {
                    addCatsToList(data);
                })
                .fail(function(jqXHR, textStatus, errorThrown) {
                    console.error('Error en la petición:', textStatus, errorThrown);
                });
        }
    });

    function addCatsToList(newCatsData) {
        if (currentView === 'list') {
            newCatsData.forEach(cat => {
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
                            <button id="add-to-favorites-${cat.id}" class="add-to-favorites bg-gray-400 text-white p-2 rounded cursor-pointer mt-3 mx-4">Add to favorites</button>
                        </div>
                    </div>
                `);
                catList.append(catItem); 

                $('.see-more-button').on('click', function(event) {
                    event.preventDefault();
                    let breed = $(this).attr('id').split('-')[1]; 
                    let id = $(this).attr('id').split('-')[2];
                    redirectToCatPage(breed,id);
                });

                $('#add-to-favorites-'+cat.id).on('click', function(event) {
                    event.preventDefault();
                    addFavorite(cat.name, cat.id);
                });

            });
        } else {
            newCatsData.forEach(cat => {
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
                    <td><button id="add-to-favorites-table-${cat.id}" class="add-to-favorites bg-gray-400 text-white p-2 rounded cursor-pointer">Add to favorites</button></td>
                `);
                $('#cat-table tbody').append(catItem); // Agregar el elemento al final de la tabla existente

                $('.see-more-button').on('click', function(event) {
                    event.preventDefault();
                    let breed = $(this).attr('id').split('-')[1];
                    redirectToCatPage(breed,cat.id);
                });

                $('#add-to-favorites-table-'+cat.id).on('click', function(event) {
                    event.preventDefault();
                    addFavorite(cat.name, cat.id);
                });



            });
        }
    }


    



