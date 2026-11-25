// Add custom JavaScript here

document.addEventListener("DOMContentLoaded", () => {
    const reviews = document.querySelector(".customer-reviews");

    if (!reviews) {
        return;
    }

    const reviewWindow = reviews.querySelector(".customer-reviews-window");
    const reviewTrack = reviews.querySelector(".customer-reviews-track");
    const reviewCards = reviewTrack.querySelectorAll(".customer-review-card");
    const previousButton = reviews.querySelector(".customer-reviews-prev");
    const nextButton = reviews.querySelector(".customer-reviews-next");

    const getStep = () => {
        const cardWidth = reviewCards[0].getBoundingClientRect().width;
        const gap = parseFloat(getComputedStyle(reviewTrack).gap) || 0;

        return cardWidth + gap;
    };

    const showSecondReview = () => {
        reviewWindow.scrollLeft = getStep();
    };

    previousButton.addEventListener("click", () => {
        reviewWindow.scrollBy({ left: -getStep(), behavior: "smooth" });
    });

    nextButton.addEventListener("click", () => {
        reviewWindow.scrollBy({ left: getStep(), behavior: "smooth" });
    });

    requestAnimationFrame(showSecondReview);
    window.addEventListener("resize", showSecondReview);
});
