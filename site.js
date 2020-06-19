let nav = document.getElementById("js_navitems");
let navToggle = document.getElementById("js_navbar_toggle");

navToggle.addEventListener('click', function () {
    nav.classList.toggle('active');
});

function removeDropdownMenu() {
    if (nav.classList.contains('active')) {
        nav.classList.toggle('active');
    }
}