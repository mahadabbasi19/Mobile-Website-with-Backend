document.addEventListener('DOMContentLoaded', function () {
    const productsContainer = document.getElementById('products');
    const searchButton = document.getElementById('searchButton');
    const searchBar = document.getElementById('searchBar');

    searchButton.addEventListener('click', () => {
        const query = searchBar.value;
        fetch(`http://localhost:3000/getData?prodName=${query}`)
            .then(response => response.json())
            .then(data => {
                displayProducts(data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    });

    function displayProducts(products) {
        productsContainer.innerHTML = ''; // Clear previous results
        if (products.length === 0) {
            productsContainer.innerHTML = '<p>No products found.</p>';
            return;
        }

        products.forEach(product => {
            const cardDiv = document.createElement('div');
            cardDiv.classList.add('card');

            const cardImage = document.createElement('img');
            cardImage.src = product.image; // Assuming product.image is a URL
            cardImage.alt = product.name;
            cardImage.classList.add('card-img-top');

            const cardBody = document.createElement('div');
            cardBody.classList.add('card-body');

            const cardTitle = document.createElement('h5');
            cardTitle.classList.add('card-title');
            cardTitle.textContent = product.product_name;

            const cardPrice = document.createElement('p'); // Create paragraph element for price
            cardPrice.classList.add('card-text');
            cardPrice.textContent = `Rs ${product.price}`;

            const specificationsButton = document.createElement('button');
            specificationsButton.textContent = 'Specifications';
            specificationsButton.classList.add('specifications-button');

            specificationsButton.addEventListener('click', () => {
                openModal(product);
            });

            const buyNowButton = document.createElement('a'); // Change button to anchor tag
            buyNowButton.textContent = 'Buy Now';
            buyNowButton.classList.add('buy-now-button');
            buyNowButton.href = `/details.html?product=${product.product_name}`;

            cardBody.appendChild(cardTitle);
            cardBody.appendChild(cardPrice);
            cardBody.appendChild(specificationsButton);
            cardBody.appendChild(buyNowButton);

            cardDiv.appendChild(cardImage);
            cardDiv.appendChild(cardBody);
            productsContainer.appendChild(cardDiv);
        });
    }

    function openModal(product) {
        const modal = document.getElementById('specificationsModal');
        const modalContent = document.querySelector('#specificationsModal .modal-content');

        modalContent.innerHTML = `
            <span class="close">&times;</span>
            <p>Brand: ${product.brand_name}</p>
            <p>RAM: ${product.ram}</p>
            <p>ROM: ${product.rom}</p>
            <p>Battery: ${product.battery}</p>
            <p>Processor: ${product.processor}</p>
            <p>Charging Speed: ${product.charging_speed}</p>
            <p>Network: ${product.network}</p>
            <p>Price: Rs ${product.price}</p>
        `;

        modal.style.display = 'block';

        const closeModal = modalContent.querySelector('.close');
        closeModal.onclick = function () {
            modal.style.display = 'none';
        }

        window.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = 'none';
            }
        }
    }
});
