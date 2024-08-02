document.addEventListener('DOMContentLoaded', async () => {
    // DOMContentLoaded 이벤트가 발생하면, 즉 페이지의 DOM이 완전히 로드된 후에 실행됩니다.

    // 로그인, 회원가입, 프로필 아이콘 요소를 선택합니다.
    const loginButton = document.querySelector('#login');
    const signupButton = document.querySelector('#signup');
    const profileIcon = document.querySelector('.profile-icon');
    const edit_delete_Button = document.querySelector('.right-align button');

    // 로그인 상태 및 작성자를 확인하는 함수 정의
    const checkStatus = () => {
        // 서버에 로그인 상태를 확인하기 위한 GET 요청을 보냅니다.
        fetch('/board', {
            method: 'GET', // 요청 메서드는 GET입니다.
            credentials: 'include' // 쿠키를 포함하여 요청을 보냅니다. (로그인 상태 확인에 필요한 쿠키를 전송)
        })
        .then(response => response.json()) // 서버의 응답을 JSON 형태로 파싱합니다.
        .then(async data => {
            // 로그인 상태를 확인합니다.
            if (data.loggedIn) {
                // 로그인 상태인 경우
                loginButton.style.display = 'none'; // 로그인 버튼을 숨깁니다.
                signupButton.style.display = 'none'; // 회원가입 버튼을 숨깁니다.
                profileIcon.style.display = 'inline-block'; // 프로필 아이콘을 표시합니다.

                // 현재 페이지의 post id 가져오기(유저 이메일 아이디)
                const postuserId = document.querySelector('.postuserId')
                // 서버로 현재 로그인된 사용자의 id와 post id를 전송하여 비교 요청을 보냅니다.
                const userId = data.userEmail; // 서버에서 받아온 현재 로그인된 사용자의 id

                // 서버에서 받은 결과를 확인하여 post id와 user id의 일치 여부를 처리합니다.
                if (postuserId == userId) {
                    // post id와 user id가 일치하는 경우
                    edit_delete_Button.style.display = 'inline-block'
                } else {
                    // post id와 user id가 일치하지 않는 경우
                    edit_delete_Button.style.display = 'none'
                }
            } else {
                // 로그아웃 상태인 경우
                loginButton.style.display = 'inline-block'; // 로그인 버튼을 표시합니다.
                signupButton.style.display = 'inline-block'; // 회원가입 버튼을 표시합니다.
                profileIcon.style.display = 'none'; // 프로필 아이콘을 숨깁니다.
            }
        })
        .catch(error => console.error('Error:', error)); // 오류가 발생한 경우 콘솔에 오류를 출력합니다.
    };

    // DOMContentLoaded 이벤트가 발생하면 로그인 상태를 확인하는 함수 호출
    checkStatus();
});
