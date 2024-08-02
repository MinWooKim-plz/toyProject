// 게시물의 날짜를 형식화하는 함수
const formatDate = (dateString) => {
    const now = new Date(); // 현재 날짜와 시간
    const postDate = new Date(dateString); // 게시물의 날짜와 시간
    const timeDifference = now - postDate; // 시간 차이 (밀리초 단위)

    // 1일(24시간) 이하인 경우: 시간 표시
    if (timeDifference < 24 * 60 * 60 * 1000) {
        const hours = postDate.getHours().toString().padStart(2, '0'); // 시간 (두 자리로 맞춤)
        const minutes = postDate.getMinutes().toString().padStart(2, '0'); // 분 (두 자리로 맞춤)
        return `${hours}:${minutes}`; // "HH:MM" 형식으로 반환
    }

    // 1일 이상인 경우: 날짜 표시
    const day = postDate.getDate().toString().padStart(2, '0'); // 일 (두 자리로 맞춤)
    const month = (postDate.getMonth() + 1).toString().padStart(2, '0'); // 월 (두 자리로 맞춤, 0부터 시작하므로 +1)
    const year = postDate.getFullYear() % 100; // 두 자리 연도

    // 연도가 현재 연도와 다를 경우 'yy/mm/dd' 형식, 같은 연도일 경우 'mm/dd' 형식
    return (now.getFullYear() === postDate.getFullYear()) ? `${month}/${day}` : `${year}/${month}/${day}`;
};

document.addEventListener('DOMContentLoaded', () => {
    // 로그인, 회원가입, 프로필 아이콘
    const loginButton = document.querySelector('#login');
    const signupButton = document.querySelector('#signup');
    const profileIcon = document.querySelector('.profile-icon');
    const postButton = document.querySelector('.bottom-btn-box .write-post-button');

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
                    postButton.style.display = 'inline-block';
                } else {
                    loginButton.style.display = 'inline-block';
                    signupButton.style.display = 'inline-block';
                    profileIcon.style.display = 'none';
                    postButton.style.display = 'none';
                }
            })
            .catch(error => console.error('Error:', error));
    };

    const postList = document.getElementById('post-list'); // 게시물을 표시할 테이블 본문 요소
    const pagination = document.getElementById('pagination'); // 페이지네이션 요소
    const limit = 50; // 한 번에 요청할 게시물 수
    let currentPage = 1; // 현재 페이지 번호

    checkLoginStatus();
});

// 글쓰기 버튼 누르면 createpost로 이동함.
document.getElementById('post-button').onclick = function () {
    window.location.href = '/lawsupport/create';
};

