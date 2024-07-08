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
        const productContainer = document.querySelector('.product-container');
        productContainer.innerHTML = '';
    
        products.forEach(product => {
            // Kiểm tra xem sản phẩm có đủ thông tin cần thiết để hiển thị không
            if (!product || !product.image || !product.name || !product.price) {
                console.error('Invalid product data:', product);
                return;
            }
    
            const productElement = document.createElement('div');
            productElement.classList.add('product-item');
    
            // Tính toán phần trăm xếp hạng sao
            const ratingPercentage = (product.rating / 5) * 100;
    
            productElement.innerHTML = `
                <div style="background-image: url('${product.image}'); height: 200px; background-size: cover; background-position: center; border-radius: 0.5rem;"></div>
                <div class="flex flex-col items-start mt-4">
                    <p class="text-lg font-semibold text-gray-800">${product.name}</p>
                    <p class="text-sm text-gray-600">${product.price} VND</p>
                    <div class="star-rating" role="img" aria-label="Được xếp hạng ${product.rating} 5 sao">
                        <span style="width:${ratingPercentage}%;">★★★★★</span>
                    </div>
                    <button class="add-to-cart-btn mt-2 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 add-to-cart" 
                            data-name="${product.name}" data-price="${product.price}">Add to Cart</button>
                </div>
            `;
            productContainer.appendChild(productElement);
        });
    
        attachAddToCartListeners(); // Gắn các trình nghe sự kiện cho nút Add to Cart
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


document.getElementById('order-now-btn').addEventListener('click', function() {
    window.location.href = "menu.html" // Đường dẫn tới trang menu
});

/*chat*/
document.addEventListener('DOMContentLoaded', function () {
    const toggleChatbot = document.getElementById('toggleChatbot');
    const chatContainer = document.getElementById('chatContainer');

    toggleChatbot.addEventListener('click', function () {
        chatContainer.classList.toggle('open');
        chatContainer.style.display = chatContainer.classList.contains('open') ? 'block' : 'none';
    });
});

function sendMessage() {
    var userInput = document.getElementById('userInput').value;
    var chatBox = document.getElementById('chatBox');

    // Clear user input
    document.getElementById('userInput').value = '';

    // Create user message element
    var userMessageElement = document.createElement('div');
    userMessageElement.classList.add('chat-message', 'user');
    userMessageElement.innerHTML = '<p>' + userInput + '</p>';
    chatBox.appendChild(userMessageElement);

    // Scroll chat box to bottom
    chatBox.scrollTop = chatBox.scrollHeight;
}