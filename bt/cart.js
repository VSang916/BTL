document.addEventListener('DOMContentLoaded', () => {
    loadCart();
});

function loadCart() {
    const cartList = document.getElementById('cart-list');
    const totalPriceElement = document.getElementById('total-price');
    let cart = localStorage.getItem('cart');

    if (cart) {
        cart = JSON.parse(cart);
        let totalPrice = 0;
        cartList.innerHTML = '';

        cart.forEach(product => {
            const productElement = document.createElement('div');
            productElement.classList.add('product');

            productElement.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <div>
                    <h2>${product.name}</h2>
                    <p>${product.description}</p>
                    <p>Price: ${product.price} VND</p>
                </div>
                <button class="remove-btn" data-id="${product.id}">Remove</button>
            `;

            cartList.appendChild(productElement);
            totalPrice += product.price;
        });

        totalPriceElement.textContent = totalPrice.toFixed(0);

        document.querySelectorAll('.remove-btn').forEach(button => {
            button.addEventListener('click', (event) => {
                const productId = parseInt(event.target.getAttribute('data-id'));
                removeFromCart(productId);
            });
        });
    } else {
        cartList.innerHTML = '<p>Your cart is empty</p>';
    }
}

function removeFromCart(productId) {
    let cart = localStorage.getItem('cart');
    if (cart) {
        cart = JSON.parse(cart);
        cart = cart.filter(product => product.id !== productId);
        localStorage.setItem('cart', JSON.stringify(cart));
        loadCart();
    }
}

document.addEventListener('DOMContentLoaded', function () {
    var popup = document.getElementById('paymentPopup');
    var openBtn = document.getElementById('openPopupBtn');
    var closeBtn = document.getElementsByClassName('close-btn')[0];

    openBtn.onclick = function() {
        popup.style.display = 'block';
    }

    closeBtn.onclick = function() {
        popup.style.display = 'none';
    }

    window.onclick = function(event) {
        if (event.target == popup) {
            popup.style.display = 'none';
        }
    }

    // Form submission handling (e.g., sending payment data to server)
    document.getElementById('paymentForm').onsubmit = function(event) {
        event.preventDefault();
        // Here you can add your code to handle payment process
        alert('Payment submitted!');
        popup.style.display = 'none';
    }
});