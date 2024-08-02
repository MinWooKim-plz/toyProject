document.addEventListener('DOMContentLoaded', () => {
    const loginButton = document.querySelector('#login');
    const signupButton = document.querySelector('#signup');
    const profileIcon = document.querySelector('.profile-icon');
    const contentTextarea = document.querySelector('.post-body');

    // 취소 버튼 누를 때 돌아감 기능
    document.getElementById('cancel-button').onclick = function() {
        window.location.href = '/post/list';
    };

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


    document.querySelector('.create-post').addEventListener('submit', function(event) {
        event.preventDefault();

        const formData = new FormData(this);
        const file = formData.get('file'); .
        const MAX_SIZE = 5 * 1024 * 1024;

        if (file && file.size > MAX_SIZE) {
            alert('파일 크기는 5MB를 초과할 수 없습니다.');
            return;
        }


        fetch('/post/uploadImage', {
            method: 'POST',
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            if (data.fileUrl) {

                const imageMarkdown = `![Image](${data.fileUrl})\n`;
                contentTextarea.value += imageMarkdown;
            } else {
                console.error('파일 업로드 실패:', data);
            }
        })
        .catch(error => console.error('Error:', error));
    });
});
