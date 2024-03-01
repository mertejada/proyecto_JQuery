let favTable = document.getElementById('favorites-table');

let currentUser = localStorage.getItem('currentUsername');

let favorites = JSON.parse(localStorage.getItem(`favorites-${currentUser}`)) || [];

favorites.forEach(cat => {
    let row = document.createElement('tr');

    row.innerHTML = `
        
        <td>${cat.breed}</td>
        <td>${cat.origin}</td>
        <td>${cat.coat}</td>
        <td>${cat.pattern}</td>
        <td><button class="remove-favorite bg-red-500 text-white p-2 m-5 rounded" data-id="${cat.id}">Remove</button></td>
<<<<<<< HEAD
        <td><a href="#" id="see-${cat.breed}" class="see-more-button bg-orange-500 text-white p-2 m-5 rounded">See more</a></td>
=======
>>>>>>> 63bf8f836a3df101a9c854e6c971b1d247fd8684
    `;
    favTable.appendChild(row);

    let removeButton = row.querySelector('.remove-favorite');
    removeButton.addEventListener('click', (event) => {
        let productId = event.target.getAttribute('data-id'); 
        let productIndex = favorites.findIndex(cat => cat.id === productId); 
        favorites.splice(productIndex, 1); 
        localStorage.setItem(`favorites-${currentUser}`, JSON.stringify(favorites)); 
        row.remove();
    });
<<<<<<< HEAD

    let seeMoreButton = row.querySelector('.see-more-button');

    seeMoreButton.addEventListener('click', (event) => {
        event.preventDefault();
        let breed = seeMoreButton.getAttribute('id').split('-')[1];
        redirectToCatPage(breed, cat.id);
    });

=======
>>>>>>> 63bf8f836a3df101a9c854e6c971b1d247fd8684
});