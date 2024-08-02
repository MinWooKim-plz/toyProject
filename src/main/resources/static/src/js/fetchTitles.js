document.addEventListener("DOMContentLoaded", function () {
    // 정보 게시판의 뉴스 제목을 로드
    const infoList = document.querySelector('.board-content-info');

    // 로컬 스토리지에서 제목과 링크를 가져옴
    const newsItems = JSON.parse(localStorage.getItem('newsItems')) || [];

    // 제목을 <li> 요소로 변환하여 삽입
    infoList.innerHTML = newsItems.map(item => `<li><a href="${item.url}" target="_blank">${item.title}</a></li>`).join('');

});
