document.addEventListener('DOMContentLoaded', function () {
    const loginButton = document.querySelector('.auth-buttons a[href="login.html"]');
    const signupButton = document.querySelector('.auth-buttons a[href="signup.html"]');
    const profileIcon = document.querySelector('.auth-buttons .profile-icon');

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
    
    // 회원가입 폼
    const signupForm = document.getElementById('signup-form');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirm-password');
    const passwordCriteriaError = document.getElementById('password-criteria-error');
    const passwordMatchError = document.getElementById('password-match-error');

    function validatePasswordCriteria(password) {
        const lengthValid = password.length >= 8 && password.length <= 20;
        const criteriaValid = /(?=.*[a-zA-Z])(?=.*[0-9])|(?=.*[a-zA-Z])(?=.*[!@#$%^&*])|(?=.*[0-9])(?=.*[!@#$%^&*])/.test(password);
        return lengthValid && criteriaValid;
    }

    password.addEventListener('input', () => {
        const pw = password.value;
        if (pw.length < 8 || pw.length > 20) {
            passwordCriteriaError.textContent = '8~20자 내로 입력해주세요.';
            passwordCriteriaError.style.display = 'block';
        } else if (!validatePasswordCriteria(pw)) {
            passwordCriteriaError.textContent = '영문/숫자/특수문자 중 두 가지 이상을 조합해주세요.';
            passwordCriteriaError.style.display = 'block';
        } else {
            passwordCriteriaError.textContent = '';
            passwordCriteriaError.style.display = 'none';
        }

        if (password.value !== confirmPassword.value) {
            passwordMatchError.textContent = '비밀번호가 다릅니다.';
            passwordMatchError.style.display = 'block';
        } else {
            passwordMatchError.textContent = '';
            passwordMatchError.style.display = 'none';
        }
    });

    confirmPassword.addEventListener('input', () => {
        if (password.value !== confirmPassword.value) {
            passwordMatchError.textContent = '비밀번호가 다릅니다.';
            passwordMatchError.style.display = 'block';
        } else {
            passwordMatchError.textContent = '';
            passwordMatchError.style.display = 'none';
        }
    });

    signupForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const nickname = document.getElementById('nickname').value;
        const email = document.getElementById('email').value;
        const nationality = document.getElementById('nationality').value;
        const passwordValue = password.value.trim();

        if (!validatePasswordCriteria(passwordValue)) {
            if (passwordValue.length < 8 || passwordValue.length > 20) {
                passwordCriteriaError.textContent = '8~20자 내로 입력해주세요.';
                passwordCriteriaError.style.display = 'block';
            } else {
                passwordCriteriaError.textContent = '영문/숫자/특수문자 중 두 가지 이상을 조합해주세요.';
                passwordCriteriaError.style.display = 'block';
            }
            return;
        }

        if (passwordValue !== confirmPassword.value) {
            passwordMatchError.textContent = '비밀번호가 다릅니다.';
            passwordMatchError.style.display = 'block';
            return;
        }

        const signupData = {
            nickname: nickname,
            email: email,
            nationality: nationality,
            password: passwordValue
        };

        fetch('/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(signupData)
        })
            .then(response => response.text().then(text => ({ status: response.status, body: text })))
            .then(({ status, body }) => {
                if (status === 200) {
                    alert(body);
                    window.location.href = 'login.html';
                } else {
                    alert(body);
                }
            })
            .catch(error => {
                console.error('Network Error:', error);
                alert('회원가입 중 네트워크 오류가 발생했습니다. 다시 시도해주세요.');
            });
    });

});
