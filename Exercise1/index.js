let slideIndex = 1;
let dots;
const buttons = document.querySelectorAll(".button-container");
const slideshowContainer = document.getElementById("slideshow-container");
const dotsContainer = document.getElementById("dot-container");
const images = ["image1.jpg", "image2.jpg", "image3.jpg"];

document.addEventListener("DOMContentLoaded", () => {
    generateImagesAndDots(images);
    showSlide(slideIndex);
    setEventForButtons();
});

// Set event for buttons
const setEventForButtons = () => {
    buttons.forEach((button) => {
        button.addEventListener("click", (e) => {
            e.preventDefault();
            const directions = button.classList.contains("right") ? +1 : -1;
            changeSlide(directions);
        });
    });
};

// Set event for dots
const setEventForDots = () => {
    dots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
            goToSlide(index + 1);
        });
    });
};

// Generate images and dots
const generateImagesAndDots = (imagesToGenerate) => {
    const length = imagesToGenerate.length;
    imagesToGenerate.forEach((image, index) => {
        // Generate image
        const slideContainer = document.createElement("div");
        slideContainer.classList.add("slides", "fade");
        slideContainer.innerHTML = `
            <div class="number-text">${index + 1} / ${length}</div>
            <img src="./assets/${image}" alt="Image ${index + 1}" />
            <div class="caption-text">Caption Text ${index + 1}</div>
        `;
        slideshowContainer.insertBefore(slideContainer, buttons[0]);

        // Generate dot
        const dot = document.createElement("span");
        dot.classList.add("dots");

        dotsContainer.appendChild(dot);
    });

    dots = document.querySelectorAll("#dot-container .dots");

    setEventForDots();
};

let slideTimer;
const showSlide = (n) => {
    // Clear existing timer
    if (slideTimer) clearInterval(slideTimer);

    // Get elements and the length of slides and dots
    let slides = document.getElementsByClassName("slides");
    let slidesLength = slides.length;
    let dotsLength = dots.length;

    // Handle case when n go out the boundary of slide length
    if (n > slidesLength) slideIndex = 1;
    if (n < 1) slideIndex = slidesLength;
    if (slideIndex > slidesLength) slideIndex = 1;

    // Handle default behavior
    for (let i = 0; i < slidesLength; i++) {
        slides[i].style.display = "none";
    }

    for (let i = 0; i < dotsLength; i++) {
        dots[i].className = dots[i].className.replace(" active", " ");
    }

    // Change the slide based on zero-index
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].classList.add("active");

    // Set new timer for automatic slideshow
    slideTimer = setInterval(() => {
        slideIndex++;
        showSlide(slideIndex);
    }, 3000);
};

const changeSlide = (n) => {
    showSlide((slideIndex += n));
};

const goToSlide = (n) => {
    showSlide((slideIndex = n));
};
