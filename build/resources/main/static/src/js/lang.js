const langResource = {
    ko: {
        menu_home: "홈",
        menu_news: "정보",
        menu_board: "자유게시판",
        menu_store: "스토어",
        menu_law: "법률지원",
        menu_review: "기업리뷰",
        login: "로그인",
        signup: "회원가입",
        board_free: "자유게시판",
        more_free: "더보기",
        board_news: "정보",
        more_news: "더보기",
        board_law: "법률지원",
        more_law: "더보기",
        board_store: "스토어",
        more_store: "더보기"
    },
    en: {
        menu_home: "Home",
        menu_news: "News",
        menu_board: "Board",
        menu_store: "Store",
        menu_law: "Legal Support",
        menu_review: "Company Reviews",
        login: "Login",
        signup: "Sign Up",
        board_free: "Free Board",
        more_free: "More",
        board_news: "News",
        more_news: "More",
        board_law: "Legal Support",
        more_law: "More",
        board_store: "Store",
        more_store: "More"
    },
    zh: {
        menu_home: "首页",
        menu_news: "新闻",
        menu_board: "公告栏",
        menu_store: "商店",
        menu_law: "法律支援",
        menu_review: "公司评论",
        login: "登录",
        signup: "注册",
        board_free: "自由公告栏",
        more_free: "更多",
        board_news: "新闻",
        more_news: "更多",
        board_law: "法律支援",
        more_law: "更多",
        board_store: "商店",
        more_store: "更多"
    },
    ja: {
        menu_home: "ホーム",
        menu_news: "ニュース",
        menu_board: "掲示板",
        menu_store: "ストア",
        menu_law: "法律支援",
        menu_review: "企業レビュー",
        login: "ログイン",
        signup: "サインアップ",
        board_free: "自由掲示板",
        more_free: "もっと見る",
        board_news: "ニュース",
        more_news: "もっと見る",
        board_law: "法律支援",
        more_law: "もっと見る",
        board_store: "ストア",
        more_store: "もっと見る"
    },
    vi: {
        menu_home: "Trang Chủ",
        menu_news: "Tin Tức",
        menu_board: "Bảng Tin",
        menu_store: "Cửa Hàng",
        menu_law: "Hỗ Trợ Pháp Lý",
        menu_review: "Đánh Giá Công Ty",
        login: "Đăng Nhập",
        signup: "Đăng Ký",
        board_free: "Bảng Tin Tự Do",
        more_free: "Thêm",
        board_news: "Tin Tức",
        more_news: "Thêm",
        board_law: "Hỗ Trợ Pháp Lý",
        more_law: "Thêm",
        board_store: "Cửa Hàng",
        more_store: "Thêm"
    },
    mn: {
        menu_home: "Нүүр",
        menu_news: "Мэдээ",
        menu_board: "Зарлалын самбар",
        menu_store: "Дэлгүүр",
        menu_law: "Хууль эрх зүйн дэмжлэг",
        menu_review: "Компанийн тойм",
        login: "Нэвтрэх",
        signup: "Бүртгүүлэх",
        board_free: "Чөлөөт зарлалын самбар",
        more_free: "Илүү",
        board_news: "Мэдээ",
        more_news: "Илүү",
        board_law: "Хууль эрх зүйн дэмжлэг",
        more_law: "Илүү",
        board_store: "Дэлгүүр",
        more_store: "Илүү"
    },
    uk: {
        menu_home: "Головна",
        menu_news: "Новини",
        menu_board: "Дошка оголошень",
        menu_store: "Магазин",
        menu_law: "Юридична підтримка",
        menu_review: "Відгуки про компанії",
        login: "Увійти",
        signup: "Реєстрація",
        board_free: "Вільна дошка",
        more_free: "Більше",
        board_news: "Новини",
        more_news: "Більше",
        board_law: "Юридична підтримка",
        more_law: "Більше",
        board_store: "Магазин",
        more_store: "Більше"
    }
};

window.addEventListener("load", function() {
    const selectedLang = localStorage.getItem('selectedLang') || 'ko';
    document.getElementById("languageSelector").value = selectedLang;
    updateLanguage(selectedLang);

    document.getElementById("languageSelector").addEventListener("change", function() {
        const selectedLang = this.value;
        localStorage.setItem('selectedLang', selectedLang);
        updateLanguage(selectedLang);
    });
});

function updateLanguage(lang) {
    for (let key in langResource[lang]) {
        const element = document.getElementById(key);
        if (element) {
            element.textContent = langResource[lang][key];
        }
    }
}
