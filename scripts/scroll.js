window.onscroll = function () {
    var scrollButton = document.getElementById("scroll-up-button");
    if (window.pageYOffset > 20) {
        scrollButton.style.display = "block";
    } else {
        scrollButton.style.display = "none";
    }
};

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}