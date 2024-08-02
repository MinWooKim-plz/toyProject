document.addEventListener('DOMContentLoaded', () => {
    // 로그인 여부 확인 관련 요소
    const loginButton = document.querySelector('#login');
    const signupButton = document.querySelector('#signup');
    const profileIcon = document.querySelector('.profile-icon');
    // 장바구니 관련 요소
    const cartTableBody = document.querySelector('.cart-table tbody');
    const clearCartButton = document.querySelector('.clear-btn');
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    // 장바구니 항목 생성(로컬 스토리지 데이터 사용)
    if (cartItems.length > 0) {
        cartTableBody.innerHTML = ''; // 기존 내용을 초기화합니다.
        cartItems.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td><img src="${item.image}" alt="${item.name}" class="cart-product-image"></td>
                <td>${item.name}</td>
                <td>${item.price}원</td>
                <td>
                    <div class="cart-item-count-container">
                        <input type="number" value="${item.count}" min="1" data-id="${item.id}" class="cart-item-count">
                        <div class="cart-item-count-buttons">
                            <button class="up" data-id="${item.id}">&#9650;</button>
                            <button class="down" data-id="${item.id}">&#9660;</button>
                        </div>
                    </div>
                </td>
                <td>${item.price * item.count}원</td>
                <td>
                    <button class="delete-btn" data-id="${item.id}">삭제</button>
                </td>
            `;
            cartTableBody.appendChild(row);
        });

        updateCartSummary();

        document.querySelectorAll('.update-btn').forEach(button => {
            button.addEventListener('click', updateCartItem);
        });

        document.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', deleteCartItem);
        });

        document.querySelectorAll('.cart-item-count-buttons .up').forEach(button => {
            button.addEventListener('click', increaseItemCount);
        });

        document.querySelectorAll('.cart-item-count-buttons .down').forEach(button => {
            button.addEventListener('click', decreaseItemCount);
        });

        if (clearCartButton) {
            clearCartButton.addEventListener('click', clearCart);
        }
    } else {
        cartTableBody.innerHTML = '<tr><td colspan="8">장바구니가 비어 있습니다.</td></tr>';
    }

    // 장바구니 데이터 업데이트
    function updateCartItem(event) {
        const button = event.target;
        const itemId = button.getAttribute('data-id');
        const newCount = parseInt(button.closest('.cart-item-count-container').querySelector('.cart-item-count').value);
        const cartItems = JSON.parse(localStorage.getItem('cartItems'));

        const item = cartItems.find(item => item.id === itemId);
        if (item && newCount > 0) {
            item.count = newCount;
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            location.reload();
        }
    }

    // 장바구니 항목 삭제
    function deleteCartItem(event) {
        const button = event.target;
        const itemId = button.getAttribute('data-id');
        let cartItems = JSON.parse(localStorage.getItem('cartItems'));

        cartItems = cartItems.filter(item => item.id !== itemId);
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        location.reload();
    }

    // 장바구니 비우기
    function clearCart() {
        localStorage.removeItem('cartItems');
        location.reload();
    }

    // 구매 수량 늘리기
    function increaseItemCount(event) {
        const button = event.target;
        const itemId = button.getAttribute('data-id');
        const input = button.closest('.cart-item-count-container').querySelector('.cart-item-count');
        let newCount = parseInt(input.value) + 1;
        input.value = newCount;
        updateCartItem(event);
    }

    // 구매 수량 줄이기
    function decreaseItemCount(event) {
        const button = event.target;
        const itemId = button.getAttribute('data-id');
        const input = button.closest('.cart-item-count-container').querySelector('.cart-item-count');
        let newCount = parseInt(input.value) - 1;
        if (newCount > 0) {
            input.value = newCount;
            updateCartItem(event);
        }
    }

    // 예상 결제금액 출력
    function updateCartSummary() {
        const cartItems = JSON.parse(localStorage.getItem('cartItems'));
        const total = cartItems.reduce((sum, item) => sum + (item.price * item.count), 0);
        const shipping = 3900; // Assuming fixed shipping cost
        const finalTotal = total + shipping;
        
        // 예상 결제 금액 출력
        document.querySelector('.summary-amount').innerText = `${total}원`;
        document.querySelector('.shipping').textContent = `${shipping}원`;
        document.querySelector('.total-amount').textContent = `${finalTotal}원`;
    }

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

});
