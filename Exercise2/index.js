const images = ["img1.jpg", "img2.jpg", "img3.jpg"];
const slides = document.querySelector(".slides");
const dots = document.querySelector(".dots");
let slideIndex = 0;
const totalSlides = images.length;
const prevBtn = document.querySelector("#prev");
const nextBtn = document.querySelector("#next");

document.addEventListener("DOMContentLoaded", () => {
    generateImagesAndDots();
    setEventListeners();
});

const generateImagesAndDots = () => {
    images.forEach((img, index) => {
        const slide = document.createElement("div");
        slide.classList.add("slide");
        index === slideIndex && slide.classList.add("active");
        slide.setAttribute("data-slide", index);
        if (slideIndex !== index) slide.style.display = "none";
        slide.innerHTML = `
            <img src="./assets/${img}" alt="Image ${index}"/>
        `;

        slides.appendChild(slide);

        const dot = document.createElement("span");
        dot.classList.add("dot");
        index === 0 && dot.classList.add("active");
        dots.appendChild(dot);
    });
};

const setEventListeners = () => {
    nextBtn.addEventListener("click", () => {
        showSlide(slideIndex + 1, true);
    });

    prevBtn.addEventListener("click", () => {
        showSlide(slideIndex - 1, false);
    });

    // Update dot click handlers
    const dotElements = document.querySelectorAll(".dot");
    dotElements.forEach((dot, index) => {
        dot.addEventListener("click", () => {
            goToSlide(index);
        });
    });
};

const validateIndex = (index, totalLength) => {
    let newIndex;
    if (index >= totalSlides) {
        newIndex = 0;
    } else if (index < 0) {
        newIndex = totalLength - 1;
    } else {
        newIndex = index;
    }

    return newIndex;
};

const showSlide = (index, isMovingRight) => {
    const slides = document.querySelectorAll(".slide");
    const oldIndex = slideIndex;

    // Update slideIndex
    slideIndex = validateIndex(index, totalSlides);

    // Get current and next slides
    const currentSlide = slides[oldIndex];
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
    if (isMovingRight) {
        currentSlide.style.animation = "slideOutLeft 0.5s ease forwards";
        nextSlide.style.animation = "slideInRight 0.5s ease forwards";
    } else {
        currentSlide.style.animation = "slideOutRight 0.5s ease forwards";
        nextSlide.style.animation = "slideInLeft 0.5s ease forwards";
    }

    // Update dots
    const dotElements = document.querySelectorAll(".dot");
    dotElements.forEach((dot, idx) => {
        dot.classList.toggle("active", idx === slideIndex);
    });
};

const goToSlide = (index) => {
    // Get the value of current index
    let currentSlideIndex = slideIndex;

    // Validate index
    let newSlideIndex = validateIndex(index, totalSlides);

    let isMovingRight = currentSlideIndex < newSlideIndex && currentSlideIndex < index;

    const delay = 50;

    if (isMovingRight) {
        for (let i = currentSlideIndex; i < newSlideIndex; i++) {
            setTimeout(() => {
                showSlide(i + 1, isMovingRight);
            }, delay * (i - currentSlideIndex));
        }
    } else {
        for (let i = currentSlideIndex; i > newSlideIndex; i--) {
            setTimeout(() => {
                showSlide(i - 1, isMovingRight);
            }, delay * (currentSlideIndex - i));
        }
    }
};
