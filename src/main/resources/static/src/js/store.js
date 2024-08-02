// DB에서 데이터 가져오기
async function fetchProductData() {
    try {
        const response = await fetch('/store'); // URL 조정 필요
        const products = await response.json();
        displayProducts(products);
    } catch (error) {
        console.error('Error fetching product data:', error);
    }
}

// 데이터 기반 상품 목록 생성
function displayProducts(products) {
    const productList = document.getElementById('product-list');
    productList.innerHTML = ''; // 기존 제품 목록 삭제

    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.className = 'section-product';
        productElement.setAttribute('data-id', product.id);
        productElement.setAttribute('data-price', product.price);
        productElement.setAttribute('data-name', product.name);

        productElement.innerHTML = `
            <a href="javascript:void(0);" class="product-link">
                <img class="product-info" src="${product.image}" alt="${product.name}">
                <div class="product-info">
                    <p class="product-description">${product.name}</p>
                    <p class="product-cost">${product.price.toLocaleString()}원</p>
                </div>
            </a>
            <div class="btn-set">
                <button class="btn-plusminus" onclick="decrease(this)"><i class="fa-solid fa-minus"></i></button>
                <input class="product-count" type="text" value="0">
                <button class="btn-plusminus" onclick="increase(this)"><i class="fa-solid fa-plus"></i></button>
                <button class="btn-cart" onclick="addToCart(this)"><i class="fa-solid fa-cart-plus"></i></button>
            </div>
        `;
        
        // 상품 클릭 시 상세 페이지로 이동
        productElement.querySelector('.product-link').addEventListener('click', () => {
            window.location.href = `/views/productdetail.html?productId=${product.id}`;
        });

        productList.appendChild(productElement);
    });
}

// 수량 감소 함수
function decrease(button) {
    var input = button.parentElement.querySelector('.product-count');
    var currentValue = parseInt(input.value);
    if (currentValue > 0) {
        input.value = currentValue - 1;
    }
}

// 수량 증가 함수
function increase(button) {
    var input = button.parentElement.querySelector('.product-count');
    var currentValue = parseInt(input.value);
    input.value = currentValue + 1;
}

// 장바구니에 추가 함수
function addToCart(button) {
    var productElement = button.closest('.section-product');
    var productId = productElement.getAttribute('data-id');
    var productName = productElement.getAttribute('data-name');
    var productPrice = parseInt(productElement.getAttribute('data-price'));
    var productImage = productElement.querySelector('img').src;
    var input = productElement.querySelector('.product-count');
    var productCount = parseInt(input.value);
    
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
        input.value = 0;
    } else {
        alert('추가할 상품 수량을 선택해주세요.');
    }
}

// 가격순으로 정렬하는 함수
function sortProducts(order) {
    const productList = document.getElementById('product-list');
    const products = Array.from(productList.getElementsByClassName('section-product'));

    products.sort((a, b) => {
        const priceA = parseInt(a.getAttribute('data-price'));
        const priceB = parseInt(b.getAttribute('data-price'));
        return order === 'low' ? priceA - priceB : priceB - priceA;
    });

    products.forEach(product => productList.appendChild(product));
}

// 검색어로 상품 필터링 함수
function filterProducts() {
    const searchInput = document.querySelector('.search-text').value.toLowerCase();
    const productList = document.getElementById('product-list');
    const products = Array.from(productList.getElementsByClassName('section-product'));

    products.forEach(product => {
        const productName = product.getAttribute('data-name').toLowerCase();
        if (productName.includes(searchInput) || searchInput === '') {
            product.style.display = 'flex';
        } else {
            product.style.display = 'none';
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
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
    
    // 상품 목록 생성하기
    fetchProductData();
});
