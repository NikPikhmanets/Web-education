function openNav() {
    let nav = document.getElementById("header-nav");
    let intro = document.getElementById("header-intro");

    if (nav.style.display === "none") {
        intro.style.display = "none";
        nav.style.display = "block";
    } else {
        nav.style.display = "none";
        intro.style.display = "block";
    }
}