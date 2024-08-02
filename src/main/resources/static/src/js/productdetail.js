// 전역변수
let productId, productImage, productName, productPrice;

document.addEventListener('DOMContentLoaded', function() {
    // 헤더 요소
    const loginButton = document.querySelector('#login');
    const signupButton = document.querySelector('#signup');
    const profileIcon = document.querySelector('.profile-icon');

    // 로그인 상태 확인 함수(로그인 여부에 따라 헤더 요소 변경)
    const checkLoginStatus = () => {
        fetch('/board', {
            method: 'GET',
            credentials: 'include'
        })
            .then(response => response.json())
            .then(data => {
                if (data.loggedIn) {
                    loginButton.style.display = 'none';
                    signupButton.style.display = 'none';
                    profileIcon.style.display = 'inline-block';
                } else {
                    loginButton.style.display = 'inline-block';
                    signupButton.style.display = 'inline-block';
                    profileIcon.style.display = 'none';
                }
            })
            .catch(error => console.error('Error:', error));
    };

    // 페이지 로드 시 로그인 상태 확인
    checkLoginStatus();

    // 기본적으로 첫 번째 탭을 열기
    document.querySelector('.tab-button').click();
    
    // URL에서 productId 파라미터를 가져옴
    const urlParams = new URLSearchParams(window.location.search);
    productId = urlParams.get('productId');

    if (productId) {
        // 제품 정보를 가져오는 API 호출
        fetch(`/api/products/${productId}`)
            .then(response => response.json())
            .then(product => {
                // 전역변수에 제품 정보 저장
                productImage = product.image;
                productName = product.name;
                productPrice = product.price;
                
                // 제품 정보를 HTML에 추가
                const productDetailContainer = document.querySelector('.product-detail-container');
                productDetailContainer.innerHTML = `
                    <div class="product-image">
                        <img src="${product.image}" alt="${product.name}">
                    </div>
                    <div class="product-info">
                        <h1 class="product-name">${product.name}</h1>
                        <p class="product-description">${product.description}</p>
                        <p class="product-price">₩ ${product.price.toLocaleString()}</p>
                        <div class="product-quantity">
                        <p>수량</p>
                        <div class="quantity-controls">
                            <button class="quantity-btn" onclick="decreaseQuantity()"><i class="fa-solid fa-minus"></i></button>
                            <input type="text" id="quantity-input" value="0" readonly>
                            <button class="quantity-btn" onclick="increaseQuantity()"><i class="fa-solid fa-plus"></i></button>
                        </div>
                    </div>
                    <div class="total-price">
                        <p>TOTAL</p>
                        <p class="total">₩ 0</p>
                    </div>
                    <div class="product-actions">
                        <button class="buy-now" onclick="buyNow()">구매하기</button>
                        <button class="add-to-cart" onclick="addToCart()">장바구니에 추가</button>
                    </div>
                    </div>
                `;
            })
            .catch(error => {
                console.error('Error fetching product:', error);
            });
    } else {
        console.error('Product ID is missing in the URL.');
    }
});


// 구매 수량 늘리기
function increaseQuantity() {
    var quantityInput = document.getElementById('quantity-input');
    var currentQuantity = parseInt(quantityInput.value);
    quantityInput.value = currentQuantity + 1;
    updateTotalPrice();
}
// 구매 수량 줄이기
function decreaseQuantity() {
    var quantityInput = document.getElementById('quantity-input');
    var currentQuantity = parseInt(quantityInput.value);
    if (currentQuantity > 1) {
        quantityInput.value = currentQuantity - 1;
    }
    updateTotalPrice();
}

// 합계 가격 출력
function updateTotalPrice() {
    var quantityInput = document.getElementById('quantity-input').value;    // 구매 갯수
    var totalPriceElement = document.querySelector('.total');               // 총 가격 출력할 곳
    totalPriceElement.textContent = '₩ ' + (productPrice * quantityInput).toLocaleString();
}

// 장바구니에 추가 함수
function addToCart() {
    // 구매 갯수
    var productCount = parseInt(document.getElementById('quantity-input').value);
    
    if (productCount > 0) {
        var cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        var existingItem = cartItems.find(item => item.id === productId);

        
        if (existingItem) {

            existingItem.count += productCount;
        } else {
            var cartItem = {
                id: productId,
                name: productName,
                price: productPrice,
                image: productImage,
                count: productCount
            };
            cartItems.push(cartItem);
        }

        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        alert(productCount + '개의 상품이 장바구니에 추가되었습니다.');
        productCount.value = 0;
    } else {
        alert('추가할 상품 수량을 선택해주세요.');
    }
}

function buyNow(){
    addToCart();
    window.location.href = '/views/cart.html';
}

// 상세정보, 구매후기, 반품교환, Q&A 탭 이동
function openTab(tabName) {
    var i;
    var x = document.getElementsByClassName("tab-content");
    var tabs = document.getElementsByClassName("tab-button");
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    for (i = 0; i < tabs.length; i++) {
        tabs[i].classList.remove("active");
    }
    document.getElementById(tabName).style.display = "block";
    event.currentTarget.classList.add("active");
}