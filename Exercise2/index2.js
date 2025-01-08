let slideIndex = 1;
showSlide(slideIndex);

function changeSlide(n) {
    showSlide(slideIndex += n)
}

function showCurrentSlide(n) {
    showSlide(slideIndex = n);
}

function showSlide(n) {
    let slides = document.getElementsByClassName("slides");
    let slidesLength = slides.length;

    let dots = document.getElementsByClassName("dots");
    let dotsLength = dots.length;

    if (n > slidesLength) slideIndex = 1;
    if (n < 1) slideIndex = slidesLength;

    for (let i = 0; i < slidesLength; i++) slides[i].style.display = "none";
    for (let i = 0; i < dotsLength; i++) dots[i].classList.remove("active");

    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].classList.add("active");
}
