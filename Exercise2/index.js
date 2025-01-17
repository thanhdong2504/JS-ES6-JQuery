const images = ["img1.jpg", "img2.jpg", "img3.jpg"];
const urlImages = "https://placehold.co/600x400?text=";
const slides = document.querySelector(".slides");
const dots = document.querySelector(".dots");
let slideIndex = 0;
const totalSlides = images.length;
const prevBtn = document.querySelector("#prev");
const nextBtn = document.querySelector("#next");

document.addEventListener("DOMContentLoaded", () => {
    generateImagesAndDots();
    setEventListeners();

    // Automatically change slides
    setInterval(() => showSlide(slideIndex + 1, true), 5000);
});

const generateImagesAndDots = () => {
    images.forEach((img, index) => {
        // Generate slides
        slides.innerHTML += `
            <div class="slide ${index === 0 ? "active" : ""}" data-slide="${index}" style="display: ${index === 0 ? "block" : "none"}">
                <img src="${urlImages + img}" alt="Image ${index}"/>
            </div>
        `;
        // Generate dots
        dots.innerHTML += `<span class="dot${index === 0 ? " active" : ""}"></span>`;
    });
};

const setEventListeners = () => {
    nextBtn.addEventListener("click", () => showSlide(slideIndex + 1, true));
    prevBtn.addEventListener("click", () => showSlide(slideIndex - 1, false));
    document.querySelectorAll(".dot").forEach((dot, index) => {
        dot.addEventListener("click", () => goToSlide(index));
    });
};

const validateIndex = (index, totalLength) => {
    if (index >= totalSlides) return 0;
    else if (index < 0) return totalLength - 1;
    return index;
};

const showSlide = (index, isMovingRight) => {
    const slides = document.querySelectorAll(".slide");
    const oldIndex = slideIndex;
    // Update slideIndex
    slideIndex = validateIndex(index, totalSlides);
    // Get current slides
    const currentSlide = slides[oldIndex];
    // Get next slides
    const nextSlide = slides[slideIndex];
    // Reset any existing animations
    slides.forEach((slide) => {
        slide.style.animation = "";
        slide.style.zIndex = "0";
    });
    // Set up the slides
    currentSlide.style.zIndex = "1";
    nextSlide.style.zIndex = "2";
    nextSlide.style.display = "block";
    // Apply animations
    currentSlide.style.animation = (isMovingRight ? "slideOutLeft" : "slideOutRight") + " 0.5s ease forwards";
    nextSlide.style.animation = (isMovingRight ? "slideInRight" : "slideInLeft") + " 0.5s ease forwards";
    // Update dots
    const dotElements = document.querySelectorAll(".dot");
    dotElements.forEach((dot, idx) => {
        dot.classList.toggle("active", idx === slideIndex);
    });
};

const goToSlide = (index) => {
    const newSlideIndex = validateIndex(index, totalSlides);
    const step = slideIndex < newSlideIndex ? 1 : -1;

    for (let i = slideIndex; i !== newSlideIndex; i += step) setTimeout(() => showSlide(i + step, slideIndex < newSlideIndex), 50 * Math.abs(i - slideIndex));
};
