document.addEventListener('DOMContentLoaded', () => {
    fetch('products.json')
        .then(response => response.json())
        .then(data => displayProducts(data.products))
        .catch(error => console.error('Lỗi khi tải sản phẩm:', error)); 

    const productContainer = document.querySelector('.product-container');
    const cartIcon = document.getElementById('cart-icon');
    const cartItemsContainer = document.querySelector('.cart-items');
    const cartTotal = document.getElementById('cart-total');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    function displayProducts(products) {
        productContainer.innerHTML = ''; 
        products.forEach(product => {
            const productElement = document.createElement('div');
            productElement.classList.add('product-item', 'flex', 'flex-col', 'gap-2');

            productElement.innerHTML = `
                <div style="background-image: url('${product.image}');"></div>
                <div>
                    <p class="text-base font-medium text-black">${product.name}</p>
                    <p class="text-sm text-gray-600">${product.price} VND</p>
                    <button class="mt-2 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 add-to-cart" 
                            data-name="${product.name}" data-price="${product.price}">Add to Cart</button>
                </div>
            `;
            productContainer.appendChild(productElement);
        });

        attachAddToCartListeners(); 
    }

    function attachAddToCartListeners() {
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', () => {
                const name = button.dataset.name;
                const price = parseInt(button.dataset.price);
                addToCart(name, price);
            });
        });
    }

    function addToCart(name, price) {
        const existingItem = cart.find(item => item.name === name);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({ name, price, quantity: 1 });
        }
        updateCart();
        showAlert(`${name} đã được thêm vào giỏ hàng!`); // Hiển thị thông báo
    }

    function removeFromCart(name) {
        const itemIndex = cart.findIndex(item => item.name === name);
        if (itemIndex > -1) {
            cart[itemIndex].quantity--;
            if (cart[itemIndex].quantity === 0) {
                cart.splice(itemIndex, 1);
            }
            updateCart();
        }
    }

    function updateCart() {
        cartItemsContainer.innerHTML = '';
        let total = 0;

        if (cart.length === 0) {
        // Hiển thị thông báo "Giỏ hàng trống"
            const emptyMessage = document.createElement('p');
            emptyMessage.classList.add('text-center', 'text-gray-600', 'mt-4'); // Thêm class CSS tùy chỉnh
            emptyMessage.textContent = 'Giỏ hàng trống';
            cartItemsContainer.appendChild(emptyMessage);
        } else {
            cart.forEach(item => {
                const cartItem = document.createElement('div');
                cartItem.classList.add('cart-item', 'flex', 'justify-between', 'items-center', 'border-b', 'py-2');
                cartItem.innerHTML = `
                    <img src="${item.image}" alt="${item.name}" class="w-20 h-20 object-cover mr-4 rounded"> 
                    <div class="flex flex-col">
                    <h3 class="text-lg font-semibold text-gray-800">${item.name}</h3>
                    <p class="text-gray-600">${item.price} VND</p>
                    <div class="flex items-center mt-1">
                        <button class="decrease-quantity" data-name="${item.name}">-</button>
                        <span class="text-gray-600 mx-2">Số lượng: ${item.quantity}</span>
                        <button class="increase-quantity" data-name="${item.name}">+</button>
                    </div>
                    </div>
                    `; 
            
                cartItemsContainer.appendChild(cartItem);
                total += item.price * item.quantity;
            
                // Sự kiện cho nút tăng giảm số lượng
                const decreaseButton = cartItem.querySelector('.decrease-quantity');
                decreaseButton.addEventListener('click', () => {
                    if (item.quantity > 1) {
                    item.quantity--;
                    updateCart();
                    } else {
                    removeFromCart(item.name); // Xóa sản phẩm khi còn 1 và ấn "-"
                    }
                });
                cartItem.querySelector('.increase-quantity').addEventListener('click', () => {
                    item.quantity++;
                    updateCart();
                });
            });
        }

        cartTotal.textContent = `${total} VND`;
        localStorage.setItem('cart', JSON.stringify(cart));

        document.querySelectorAll('.remove-from-cart').forEach(button => {
            button.addEventListener('click', () => {
                const itemName = button.dataset.name;
                removeFromCart(itemName);
            });
        });
    }

    // Hàm hiển thị thông báo
    function showAlert(message) {
        const alertBox = document.createElement('div');
        alertBox.classList.add('alert', 'bg-green-500', 'text-white', 'p-2', 'rounded', 'fixed', 'top-4', 'right-4');
        alertBox.textContent = message;
        document.body.appendChild(alertBox);
        setTimeout(() => {
            alertBox.remove();
        }, 3000); // Tự động ẩn sau 3 giây
    }

    attachAddToCartListeners(); 
    updateCart(); 
});