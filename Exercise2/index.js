const slidesContainer = document.getElementById("slides-container");
const dotsContainer = document.getElementById("dots-container");
const prevButton = document.getElementById("slide-arrow-prev");
const nextButton = document.getElementById("slide-arrow-next");
const images = ["img1", "img2", "img3"];
const cloneImageArray = [...images];
let slideValue = 1;
let currentIndexValue = slideValue;

document.addEventListener("DOMContentLoaded", () => {
    generateImages(images);
    generateDots(images);
    setEventForButton(prevButton);
    setEventForButton(nextButton);
});

// Generate images and dots
const generateImages = (imageToGenerate) => {
    imageToGenerate.forEach((image, index) => {
        // Generate images
        const slideComponent = document.createElement("li");
        slideComponent.classList.add("slide");
        slideComponent.innerHTML = `
            <img src="https://placehold.co/600x400?text=${image}.jpg" alt="Image ${index + 1}" />
        `;
        slideComponent.setAttribute("data-slide", index + 1);
        slidesContainer.appendChild(slideComponent);
    });
};

// Generate dots
const generateDots = (dotsArray) => {
    dotsArray.forEach((dot, index) => {
        const dotComponent = document.createElement("li");
        dotComponent.classList.add("dot");
        if (index === 0) dotComponent.classList.add("active");
        dotComponent.addEventListener("click", () => {
            showSlide(index + 1);
        });
        dotsContainer.appendChild(dotComponent);
    });
};

const cloneSlide = (index, container, type = "next", referencedNode) => {
    if (!index || !container) return;

    const slideClone = document.createElement("li");
    slideClone.classList.add("slide");
    slideClone.innerHTML = `
        <img src="https://placehold.co/600x400?text=${index}.jpg" alt="Image ${index}" />
    `;
    slideClone.setAttribute("data-slide", currentIndexValue);
    if (type === "next") container.appendChild(slideClone);
    else container.insertBefore(slideClone, referencedNode);
};

// Set event for next button
const setEventForButton = (button) => {
    button.addEventListener("click", () => {
        if (button.id === "slide-arrow-prev") {
            showSlide(--currentIndexValue, true);
        } else {
            showSlide(++currentIndexValue);
        }
    });
};

// Set slideshow
const showSlide = (n, isDecreased = false) => {
    const slides = document.querySelectorAll(".slide");
    const imagesLength = images.length;
    const slideWidth = slides[0].clientWidth;
    let dots = document.querySelectorAll(".dot");

    if (n > imagesLength) {
        slideValue = n % imagesLength !== 0 ? n % imagesLength : imagesLength;
        if (!isDecreased) cloneSlide(images[slideValue - 1], slidesContainer);
        slidesContainer.scrollLeft = isDecreased ? slidesContainer.scrollLeft - slideWidth : slidesContainer.scrollLeft + slideWidth;
    } else {
        slideValue = n;
        slidesContainer.scrollLeft = isDecreased ? slidesContainer.scrollLeft - slideWidth : slideWidth * (slideValue - 1);
    }

    dots.forEach((dot) => dot.classList.remove("active"));
    dots[(slideValue - 1) % imagesLength].classList.add("active");
};
