let slideIndex = 1;
showSlides(slideIndex);

function changeSlide(n) {
    showSlides((slideIndex += n));
}

function currentSlide(n) {
    showSlides((slideIndex = n));
}

function showSlides(n) {
    // Get elements and the length of slides and dots
    let slides = document.getElementsByClassName("slides");
    let slidesLength = slides.length;
    let dots = document.getElementsByClassName("dots");
    let dotsLength = dots.length;

    // Handle case when n go out the boundary of slide length
    if (n > slidesLength) slideIndex = 1;
    if (n < 1) slideIndex = slidesLength;

    // Handle default behavior
    for (let i = 0; i < slidesLength; i++) {
        slides[i].style.display = "none";
    }

    for (let i = 0; i < dotsLength; i++) {
        dots[i].className = dots[i].className.replace(" active", " ");
    }

    // Change the slide based on zero-index
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}
