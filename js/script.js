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

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".promo-banner-close").forEach((button) => {
        button.addEventListener("click", () => {
            button.closest(".promo-banner").remove();
        });
    });

    const navbar = document.querySelector(".navbar");

    if (navbar) {
        const updateNavbar = () => {
            navbar.classList.toggle("navbar-scrolled", window.scrollY > 0);
        };

        updateNavbar();
        window.addEventListener("scroll", updateNavbar, { passive: true });
    }

    const priceSlider = document.querySelector(".category-price-slider");

    if (!priceSlider) {
        return;
    }

    const minimumInput = priceSlider.querySelector(".category-price-min");
    const maximumInput = priceSlider.querySelector(".category-price-max");
    const selectedRange = priceSlider.querySelector(".category-price-selected");
    const minimumLabel = document.querySelector(".category-min-price");
    const maximumLabel = document.querySelector(".category-max-price");
    const rangeMin = Number(minimumInput.min);
    const rangeMax = Number(minimumInput.max);

    const updateRange = (changedInput) => {
        let minimum = Number(minimumInput.value);
        let maximum = Number(maximumInput.value);

        if (minimum > maximum) {
            if (changedInput === minimumInput) {
                minimum = maximum;
                minimumInput.value = minimum;
            } else {
                maximum = minimum;
                maximumInput.value = maximum;
            }
        }

        const minimumPercent = ((minimum - rangeMin) / (rangeMax - rangeMin)) * 100;
        const maximumPercent = ((maximum - rangeMin) / (rangeMax - rangeMin)) * 100;

        selectedRange.style.left = `${minimumPercent}%`;
        selectedRange.style.width = `${maximumPercent - minimumPercent}%`;
        minimumLabel.textContent = `$${minimum}`;
        maximumLabel.textContent = `$${maximum}`;
    };

    minimumInput.addEventListener("input", () => updateRange(minimumInput));
    maximumInput.addEventListener("input", () => updateRange(maximumInput));
    updateRange();
});
