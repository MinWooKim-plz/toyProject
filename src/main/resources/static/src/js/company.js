document.addEventListener('DOMContentLoaded', function() {
    const reviewsContainer = document.getElementById('reviews-container');
    const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
    const averageRatingElement = document.getElementById('average-rating');
    const latestReviewTextElement = document.querySelector('.latest-review-text');

    if (reviews.length === 0) {
        reviewsContainer.innerHTML = '<p>아직 작성된 리뷰가 없습니다.</p>';
        averageRatingElement.innerHTML = '☆☆☆☆☆ (0.0)';
        latestReviewTextElement.innerHTML = '리뷰 없음';
    } else {
        let totalRating = 0;
        reviews.forEach(review => {
            totalRating += parseInt(review.rating);
        });

        const averageRating = (totalRating / reviews.length).toFixed(1);
        const fullStars = '★'.repeat(Math.floor(averageRating));
        const halfStar = averageRating % 1 !== 0 ? '☆' : '';
        const emptyStars = '☆'.repeat(5 - Math.ceil(averageRating));

        averageRatingElement.innerHTML = `${fullStars}${halfStar}${emptyStars} (${averageRating})`;

        const latestReview = reviews[reviews.length - 1];
        latestReviewTextElement.innerHTML = `"${latestReview.headline}"`;
    }
});
