// orderinfo.js
document.addEventListener('DOMContentLoaded', function() {
    // 로그인 상태 확인 함수(로그인 여부에 따라 헤더 요소 변경)
    const checkLoginStatus = () => {
        fetch('/board', {
            method: 'GET',
            credentials: 'include'
        })
            .then(response => response.json())
            .then(data => {
                if (!data.loggedIn) {
                    // 비 로그인 상태
                    window.alert("로그인이 필요합니다.");
                    window.location.href = 'login.html';
                }
            })
            .catch(error => console.error('Error:', error));
    };
    
    // 페이지 로드 시 로그인 상태 확인
    checkLoginStatus();

    // 주문내역가져오기
    fetchOrders();
});

function fetchOrders() {
    fetch('/orderinfo')
        .then(response => response.json())
        .then(data => {
            const emptyList = document.querySelector('.empty-list');
            const orderTableBody = document.getElementById('orderTableBody');
            data.forEach(info => {
                // 데이터 없다는 텍스트 숨기기
                emptyList.style.display = "none";

                // 주문내역 출력
                const row = document.createElement('tr');
                row.classList.add('order-row');
                row.dataset.orderId = info.orderId; // 주문 ID를 데이터 속성으로 저장
                row.innerHTML = `
                    <td>${info.orderId}</td>
                    <td><img src="${info.image}" alt="${info.productName}" /></td>
                    <td>${info.productName} 외 ${info.count - 1}건</td>
                    <td>₩ ${info.totalAmount}</td>
                    <td>${info.created_at}</td>
                `;
                row.addEventListener('click', () => {
                    window.location.href = `/order-details.html?orderId=${info.orderId}`;
                });
                orderTableBody.appendChild(row);
            });
        })
        .catch(error => {
            emptyList.style.display = "block";
            console.error('Error fetching orders:', error)
        });
}
