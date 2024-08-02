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

    
    // 비밀번호 변경
    const passwordForm = document.getElementById('password-form');
    const currentPassword = document.getElementById('current-password');
    const newPassword = document.getElementById('new-password');
    const confirmPassword = document.getElementById('confirm-password');
    const passwordCriteriaError = document.getElementById('password-criteria-error');
    const passwordMatchError = document.getElementById('password-match-error');

    function validatePasswordCriteria(password) {
        const lengthValid = password.length >= 8 && password.length <= 20;
        const criteriaValid = /(?=.*[a-zA-Z])(?=.*[0-9])|(?=.*[a-zA-Z])(?=.*[!@#$%^&*])|(?=.*[0-9])(?=.*[!@#$%^&*])/.test(password);
        return lengthValid && criteriaValid;
    }

    newPassword.addEventListener('input', () => {
        const password = newPassword.value;
        if (password.length < 8 || password.length > 20) {
            passwordCriteriaError.textContent = '8~20자 내로 입력해주세요.';
            passwordCriteriaError.style.display = 'block';
        } else if (!validatePasswordCriteria(password)) {
            passwordCriteriaError.textContent = '영문/숫자/특수문자 중 두 가지 이상을 조합해주세요.';
            passwordCriteriaError.style.display = 'block';
        } else {
            passwordCriteriaError.textContent = '';
            passwordCriteriaError.style.display = 'none';
        }

        if (newPassword.value !== confirmPassword.value) {
            passwordMatchError.textContent = '비밀번호가 다릅니다.';
            passwordMatchError.style.display = 'block';
        } else {
            passwordMatchError.textContent = '';
            passwordMatchError.style.display = 'none';
        }
    });

    confirmPassword.addEventListener('input', () => {
        if (newPassword.value !== confirmPassword.value) {
            passwordMatchError.textContent = '비밀번호가 다릅니다.';
            passwordMatchError.style.display = 'block';
        } else {
            passwordMatchError.textContent = '';
            passwordMatchError.style.display = 'none';
        }
    });

    passwordForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const currentPasswordValue = currentPassword.value.trim();
        const newPasswordValue = newPassword.value.trim();

        if (!validatePasswordCriteria(newPasswordValue)) {
            if (newPasswordValue.length < 8 || newPasswordValue.length > 20) {
                passwordCriteriaError.textContent = '8~20자 내로 입력해주세요.';
                passwordCriteriaError.style.display = 'block';
            } else {
                passwordCriteriaError.textContent = '영문/숫자/특수문자 중 두 가지 이상을 조합해주세요.';
                passwordCriteriaError.style.display = 'block';
            }
            return;
        }

        if (newPasswordValue !== confirmPassword.value) {
            passwordMatchError.textContent = '비밀번호가 다릅니다.';
            passwordMatchError.style.display = 'block';
            return;
        }

        const passwordData = {
            currentPassword: currentPasswordValue,
            newPassword: newPasswordValue
        };

        fetch('/update-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(passwordData),
            credentials: 'include'  // 쿠키를 포함하여 요청
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert(data.message);
                    window.location.href = 'profile.html';
                } else {
                    alert(data.message);
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert(error.message);
            });
    });
});
