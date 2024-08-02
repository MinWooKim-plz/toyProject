document.addEventListener('DOMContentLoaded', () => {
    const inquiryForm = document.getElementById('inquiry-form');
    const contentInput = document.getElementById('content');
    const privacyConsentInput = document.getElementById('privacy-consent');
    const inquiryTypeSelect = document.getElementById('inquiry-type');
    const emailInput = document.getElementById('email');
    const fileInput = document.getElementById('file');

    const loginButton = document.querySelector('#login');
    const signupButton = document.querySelector('#signup');
    const profileIcon = document.querySelector('.profile-icon');
    
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

    inquiryTypeSelect.addEventListener('change', () => {
        if (inquiryTypeSelect.value === 'advertisement') {
            contentInput.value = "1. 캠페인 내용\n2. 기간\n3. 예산";
        } else {
            contentInput.value = "";
        }
    });

    inquiryForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const inquiryType = inquiryTypeSelect.value;
        const content = contentInput.value.trim();
        const email = emailInput.value.trim();
        const privacyConsent = privacyConsentInput.checked;
        const file = fileInput.files[0];

        if (content === '') {
            alert('문의 내용을 입력해주세요.');
            return;
        }

        if (!privacyConsent) {
            alert('개인정보 수집 및 이용에 동의해주세요.');
            return;
        }

        const maxFileSize = 15 * 1024 * 1024;
        if (file && file.size > maxFileSize) {
            alert('첨부 파일의 크기는 15MB를 초과할 수 없습니다.');
            return;
        }

        const formData = new FormData();
        formData.append('inquiryRequest', new Blob([JSON.stringify({
            inquiryType: inquiryType,
            content: content,
            email: email
        })], {type: 'application/json'}));
        if (file) {
            formData.append('file', file);
        }

        fetch('/inquiry', {
            method: 'POST',
            body: formData,
            credentials: 'include',
            mode: 'cors'
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text();
            })
            .then(response => {
                alert('문의가 성공적으로 접수되었습니다.');
                inquiryForm.reset();
            })
            .catch(error => {
                console.error('Error:', error);
                alert('문의 접수 중 오류가 발생했습니다.');
            });
    });

    checkLoginStatus();
});
