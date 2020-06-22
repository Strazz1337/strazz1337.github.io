$(document).ready(function () {
    getMenus();
});

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

function getMenus() {
    return new Promise(
        function (resolve, reject) {
            $.ajax(
                {
                    url: "/api/menu",
                    type: "GET",
                    contentType: 'application/json; charset=utf-8',
                    dataType: 'json',

                    success: function (data) {
                        for (i = 0; i < data.length; i++) {
                            createMenuButtons(data, i);
                        }
                    },
                    error: function (error) {
                        popup.show(false, error);;
                    },

                });
        });
}

function createMenuButtons(data, menuid) {
    let menubutton = document.createElement("button");
    menubutton.innerHTML = data[menuid].name;
    menubutton.classList.add("buttonpill");
    document.getElementById("menu_list").appendChild(menubutton);
}