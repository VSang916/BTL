document.addEventListener('DOMContentLoaded', () => {
  //Lấy dữ liệu sản phẩm
  fetch('/api/menu-products') 
    .then(response => {
      return response.json(); 
    })
    .then(products => displayProducts(products)) 
  //Tạo các biến
  const productContainer = document.querySelector('.product-container');
  const cartItemsContainer = document.querySelector('.cart-items');
  const cartTotal = document.getElementById('cart-total');
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  //Hàm hiển thị sản phẩm trong Menu
  function displayProducts(products) {
    productContainer.innerHTML = '';

    products.forEach(product => {
      const productElement = document.createElement('div');
      productElement.classList.add('product-item');

      //Tính toán phần trăm xếp hạng sao
      const ratingPercentage = (product.rating / 5) * 100;

      productElement.innerHTML = `
        <div style="background-image: url('${product.image}'); height: 200px; background-size: cover; background-position: center; border-radius: 0.5rem;"></div>
        <div class="flex flex-col items-start mt-4">
          <p class="text-lg font-semibold text-gray-800">${product.name}</p>
          <p class="text-sm text-gray-600">${product.price} $</p>
          <div class="star-rating" role="img" aria-label="Được xếp hạng ${product.rating} 5 sao">
            <span style="width:${ratingPercentage}%;">★★★★★</span>
          </div>
          <button class="add-to-cart-btn" >Add to Cart</button>
        </div>
      `;
      productElement.querySelector('.add-to-cart-btn').addEventListener('click', () => {
        addToCart(product.name, product.price, product.image); 
      });
      productContainer.appendChild(productElement);
    });
  }
  
  
  //Hàm thêm sản phẩm vào giỏ hàng
  function addToCart(name, price, image) {
    const existingItem = cart.find(product => product.name === name);
    if (existingItem) {
      existingItem.quantity+=1;
    } else {
      cart.push({ name, price, quantity: 1, image });
    }
    showAlert(`${name} đã được thêm vào giỏ hàng!`); 
    updateCart();
  }

  //Xóa sản phẩm ra khỏi giỏ hàng khi còn 1
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
          <div class="flex items-center">
            <img src="${item.image}" alt="${item.name}" class="w-20 h-20 object-cover mr-4 rounded"> 
            <div class="flex flex-col">
              <h3 class="text-lg font-semibold text-gray-800">${item.name}</h3>
              <p class="text-gray-600">${item.price} $/sản phẩm</p>
              <div class="flex items-center mt-1 gap-x-4">
                <button class="decrease-quantity" data-name="${item.name}"> - </button>
                <span class="quantity" data-name="${item.name}">Số lượng: ${item.quantity}</span> 
                <button class="increase-quantity" data-name="${item.name}"> + </button>
              </div>
            </div>
          </div>
          <div class="text-right">
            <p class="text-gray-600" id="item-total-${item.name}">${(item.price * item.quantity).toFixed(2)} $</p>
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
          removeFromCart(item.name);
          }
        });
        cartItem.querySelector('.increase-quantity').addEventListener('click', () => {
          item.quantity++;
          updateCart();
        });
      });
    }

    cartTotal.textContent = `${(total).toFixed(2)} $`;
    localStorage.setItem('cart', JSON.stringify(cart));

    document.querySelectorAll('.remove-from-cart').forEach(button => {
      button.addEventListener('click', () => {
        const itemName = button.dataset.name;
        removeFromCart(itemName);
      });
    });
  }
  
  // Hàm hiển thị thông báo
  let lastAlertTop = 2; 
  let alertCount = 0;

  function showAlert(message) {
    const alertBox = document.createElement('div');
    alertBox.classList.add('alert', 'bg-green-500', 'text-white', 'p-2', 'rounded', 'fixed', 'top-4');
    alertBox.textContent = message;
    
    alertBox.style.top = `${lastAlertTop}rem`;
    lastAlertTop += 4;
    alertCount++;

    alertBox.style.transition = "top 0.3s ease-in-out";

    document.body.appendChild(alertBox);

    setTimeout(() => {
      alertBox.remove();
      alertCount--; 

      adjustAlertPositions();
    }, 2000);
  }
  //Chỉnh lại vị trí của thông báo khi có thông báo mới
  function adjustAlertPositions() {
    const alerts = document.querySelectorAll('.alert');
    let currentTop = 2; // Reset vị trí bắt đầu

    alerts.forEach(alert => {
      alert.style.top = `${currentTop}rem`;
      currentTop += 4;
    });
  lastAlertTop = currentTop; // Cập nhật lại lastAlertTop
  }
  updateCart()
});

//Đặt hàng
document.getElementById('order-now-btn').addEventListener('click', function() {
  window.location.href = "menu.html" 
});

//Chat
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

  document.getElementById('userInput').value = '';

  var userMessageElement = document.createElement('div');
  userMessageElement.classList.add('chat-message', 'user');
  userMessageElement.innerHTML = '<p>' + userInput + '</p>';
  chatBox.appendChild(userMessageElement);

  chatBox.scrollTop = chatBox.scrollHeight;
}

//Luckywheel
function openModal() {
  var modal = document.getElementById('modal');
  modal.style.display = 'flex';
}

function closeModal() {
  var modal = document.getElementById('modal');
  modal.style.display = 'none';
}
