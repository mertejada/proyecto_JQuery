let favTable = document.getElementById('favorites-table'); 

let currentUser = localStorage.getItem('currentUsername'); //Obtengo el usuario actual
let favorites = JSON.parse(localStorage.getItem(`favorites-${currentUser}`)) || []; //Obtengo los favoritos del usuario actual si los hay, si no, un array vacio    

favorites.forEach(cat => {
    let row = document.createElement('tr');

    /*Iba a mostrar mas informacion del gato en favoritos pero al haber tantos datos, no sabia por cuales decidirme
    y he optado por mostrar aqui tambien el boton de "ver mas" que lleva a la pagina del gato*/
    row.innerHTML = `
        <td>${cat.breed}</td>
        <td><button class="remove-favorite bg-red-500 text-white p-2 m-5 rounded" data-id="${cat.id}">Remove</button></td>
        <td><a href="#" id="see-${cat.breed}" class="see-more-button bg-orange-500 text-white p-2 m-5 rounded">See more</a></td>
    `;
    favTable.appendChild(row);

    //Evento para eliminar de favoritos
    let removeButton = row.querySelector('.remove-favorite');
    removeButton.addEventListener('click', (event) => {
        let productId = event.target.getAttribute('data-id'); 
        let productIndex = favorites.findIndex(cat => cat.id === productId); 
        favorites.splice(productIndex, 1); 
        localStorage.setItem(`favorites-${currentUser}`, JSON.stringify(favorites)); 
        row.remove();
    });

    //Evento para redirigir a la pagina del gato
    let seeMoreButton = row.querySelector('.see-more-button');

    seeMoreButton.addEventListener('click', (event) => {
        event.preventDefault();
        let breed = seeMoreButton.getAttribute('id').split('-')[1];
        redirectToCatPage(breed, cat.id);
    });
});