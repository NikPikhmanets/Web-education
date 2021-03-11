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