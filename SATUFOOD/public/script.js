document.addEventListener('DOMContentLoaded', () => {
  fetch('/api/menu-products') 
    .then(response => {
      if (!response.ok) { 
        throw new Error('Network response was not ok');
      }
      return response.json(); 
    })
    .then(products => displayProducts(products)) 
    .catch(error => console.error('Error loading products:', error));
    

  const productContainer = document.querySelector('.product-container');
  const cartItemsContainer = document.querySelector('.cart-items');
  const cartTotal = document.getElementById('cart-total');
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  console.log(product.price)
  function displayProducts(products) {
    productContainer.innerHTML = '';

    products.forEach(product => {
      // Kiểm tra xem sản phẩm có đủ thông tin cần thiết để hiển thị không
      if (!product || !product.image || !product.name || !product.price) {
        console.error('Invalid product data:', product);
        return;
      }
      console.log(product.price)
      const productElement = document.createElement('div');
      productElement.classList.add('product-item');

      // Tính toán phần trăm xếp hạng sao
      const ratingPercentage = (product.rating / 5) * 100;

      productElement.innerHTML = `
        <div style="background-image: url('${product.image}'); height: 200px; background-size: cover; background-position: center; border-radius: 0.5rem;"></div>
        <div class="flex flex-col items-start mt-4">
          <p class="text-lg font-semibold text-gray-800">${product.name}</p>
          <p class="text-sm text-gray-600">${product.price} $</p>
          <div class="star-rating" role="img" aria-label="Được xếp hạng ${product.rating} 5 sao">
            <span style="width:${ratingPercentage}%;">★★★★★</span>
          </div>
          <button class="add-to-cart-btn add-to-cart" >Add to Cart</button>
        </div>
      `;
      productElement.querySelector('.add-to-cart-btn').addEventListener('click', () => {
        addToCart(product.name, product.price, product.image); 
      });
      productContainer.appendChild(productElement);
    });
  }
  
  

  function addToCart(name, price, image) {
    const existingItem = cart.find(product => product.name === name);
    if (existingItem) {
      existingItem.quantity+=1;
    } else {
      cart.push({ name, price, quantity: 1, image });
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
          <div class="flex flex-col" style="text-align: right;">
            <h3 class="text-lg font-semibold text-gray-800">${item.name}</h3>
            <p class="text-gray-600">${item.price} $</p>
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

    cartTotal.textContent = `${total} $`;
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
      alertBox.classList.add('alert', 'bg-green-500', 'text-white', 'p-2', 'rounded', 'fixed', 'top-4');
      alertBox.textContent = message;
      document.body.appendChild(alertBox);
      setTimeout(() => {
          alertBox.remove();
      }, 1000); // Tự động ẩn sau 3 giây
  }
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