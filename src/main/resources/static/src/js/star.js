$('.star_rating > .star').click(function() {
    $(this).parent().children('span').removeClass('on');
    $(this).addClass('on').prevAll('span').addClass('on');
  })

  document.addEventListener('DOMContentLoaded', function() {
    const stars = document.querySelectorAll('.star_rating .star');
    let selectedRating = 0;

    stars.forEach(star => {
        star.addEventListener('click', function() {
            stars.forEach(s => s.classList.remove('on'));
            this.classList.add('on');
            this.previousElementSibling && this.previousElementSibling.classList.add('on'); // 선택한 별의 이전 별들도 채움
            let prevSibling = this.previousElementSibling;
            while (prevSibling) {
                prevSibling.classList.add('on');
                prevSibling = prevSibling.previousElementSibling;
            }
            selectedRating = this.getAttribute('value');
        });
    });

    const reviewForm = document.getElementById('reviewForm');
    reviewForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const headline = document.getElementById('headline').value;
        const pros = document.getElementById('pros').value;
        const cons = document.getElementById('cons').value;

        const review = {
            headline,
            pros,
            cons,
            rating: selectedRating,
            date: new Date().toLocaleDateString()
        };

        let reviews = JSON.parse(localStorage.getItem('reviews')) || [];
        reviews.push(review);
        localStorage.setItem('reviews', JSON.stringify(reviews));

        alert('리뷰가 제출되었습니다.');
        window.location.href = 'company.html';
    });
});
