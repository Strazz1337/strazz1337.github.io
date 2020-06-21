let nav = document.getElementById("js_navitems");
let navToggle = document.getElementById("js_navbar_toggle");
let navIcon = document.getElementById("navbar_icon");

navToggle.addEventListener('click', function () {
    nav.classList.toggle('active');
    navIcon.classList.toggle('fa-bars');
    navIcon.classList.toggle('fa-times-circle');
});

function removeDropdownMenu() {
    if (nav.classList.contains('active')) {
        nav.classList.toggle('active');
        navIcon.classList.toggle('fa-bars');
        navIcon.classList.toggle('fa-times-circle');
    }
}