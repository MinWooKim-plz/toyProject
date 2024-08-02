document.addEventListener('DOMContentLoaded', () => {
    // HTML 요소에 대한 참조 가져오기
    const searchButton = document.querySelector('.search-btn');
    const searchInput = document.querySelector('.search-input');
    const searchCategory = document.querySelector('.search-category');
    let fuse; // Fuse 검색 인스턴스를 저장할 변수 초기화

    // 서버에서 게시물 로드 및 검색 수행
    const performSearch = () => {
        const query = searchInput.value.trim();
        const category = searchCategory.value;
        let keys = ['subject', 'content']; // 기본적으로 제목+내용으로 설정

        if (category === '제목') {
            keys = ['subject']; // 제목에서만 검색
        } else if (category === '내용') {
            keys = ['content']; // 내용에서만 검색
        } else if (category === '글쓴이') {
            keys = ['author_id']; // 작성자에서만 검색 (원래 코드에서 id를 author로 수정)
        }

        fetch('/board', { method: 'GET' })
            .then(response => response.json())
            .then(data => {
                // 검색 옵션을 사용하여 새로운 Fuse 인스턴스 생성
                fuse = new Fuse(data, {
                    keys: keys,
                    includeScore: true, // 랭킹을 위해 검색 점수 포함
                    threshold: 0.3, // 검색 임계값 설정 (필요에 따라 조정)
                });

                if (query) {
                    const results = fuse.search(query);
                    displayResults(results.map(result => result.item));
                } else {
                    displayResults(data); // 검색어가 없을 경우 전체 데이터를 표시
                }
            })
            .catch(error => console.error('게시물 가져오기 오류:', error));
    };

    // UI에서 검색 결과 표시
    const displayResults = (results) => {
        const postList = document.getElementById('post-list');
        postList.innerHTML = ''; // 기존 목록 지우기

        results.forEach(post => {
            // 각 게시물에 대한 테이블 행 생성
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${post.id}</td>
                <td><a href="/lawsupport/detail/${post.id}">${post.subject}</a></td>
                <td>${post.author_id}</td>
                <td>${post.create_date}</td>
                <td>${post.view_count}</td>
                <td>${post.recommend_count}</td>
            `;
            postList.appendChild(row);
        });
    };

    // 검색 버튼 클릭 처리
    searchButton.addEventListener('click', () => {
        performSearch();
    });
});
