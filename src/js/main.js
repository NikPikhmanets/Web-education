function openNav() {
    let nav = document.getElementById("h-nav");
    let intro = document.getElementById("h-intro");

    if (nav.style.display === "none") {
        intro.style.display = "none";
        nav.style.display = "block";
    } else {
        nav.style.display = "none";
        intro.style.display = "block";
    }
}

let slideIndex = 1;

function nextSlide() {
    showSlides(slideIndex++);
}

function prevSlide() {
    showSlides(slideIndex--);
}

function showSlides(n) {
    let slides = document.getElementsByClassName("about-items");

    if (n > slides.length - 1) {
        slideIndex = 1
    }
    if (n < 1) {
        slideIndex = slides.length
    }
    for (let i = i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideIndex - 1].style.display = "block";
}