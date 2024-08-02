document.addEventListener('DOMContentLoaded', function () {
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

    //회원 탈퇴
    const deleteAccountForm = document.getElementById('delete-account-form');

    deleteAccountForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const password = document.getElementById('password').value;

        const userData = {
            password: password
        };

        fetch('/delete', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData),
            credentials: 'include'  // 쿠키를 포함하여 요청
        })
        .then(response => {
            if (response.ok) {
                return response.json(); //data = response.json() 탈퇴 성공 시 success 값이 true
            } else {
                return response.json().then(errorData => {
                    throw new Error(errorData.message);
                });
            }
        })
        .then(data => {
            console.log('Response data:', data); // 디버깅을 위한 로그
            // 로그인 성공시 성공 메세지 띄우고 홈 화면으로 이동
            if (data.success) {
                alert(data.message);
                window.location.href = 'networker.html';
            } else { // 실패시 실패 메세지 알림
                alert(data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert(error.message);
        });
    });
});
