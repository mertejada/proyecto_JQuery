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
});