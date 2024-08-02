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
});

document.addEventListener("DOMContentLoaded", function () {
    // 모든 뉴스 항목의 제목과 링크를 가져옴
    const newsItems = Array.from(document.querySelectorAll('.news-content-main, .news-content')).map(el => {
      return {
        title: el.querySelector('h2').innerText,
        url: el.querySelector('a').href
      };
    });
  
    // 로컬 스토리지에 저장
    localStorage.setItem('newsItems', JSON.stringify(newsItems));
  });
  