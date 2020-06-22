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
                        setDefaultMenuInformation(data, data[0].menuId)

                    },
                    error: function (error) {
                        popup.show(false, error);;
                    },

                });
        });
}

function setDefaultMenuInformation(data, menuid) {
    let menuInformation = document.getElementsByClassName("menu_information")[0];
    let menuTitle = document.getElementsByClassName("menu_title")[0];
    let menuHeader = document.createElement("h4");
    let menuText = document.createElement("p");

    menuHeader.innerHTML = data[0].name + " menu <span class=\"menu_price\">€" + data[0].price + " p.p.</span>";
    menuTitle.appendChild(menuHeader);
    menuText.innerHTML = data[0].description;
    menuInformation.appendChild(menuText);


    setMenuInformation(data, data[0].menuId);
}

function createMenuButtons(data, menuid) {
    if (data[menuid].isVisible) {
        let menubutton = document.createElement("button");
        menubutton.innerHTML = data[menuid].name;
        menubutton.classList.add("buttonpill");

        menubutton.addEventListener('click', function () {
            let menuInformation = document.getElementsByClassName("menu_information")[0];
            menuInformation.getElementsByClassName("menu_title")[0].querySelector("h4").innerHTML = data[menuid].name + " menu <span class=\"menu_price\">€" + data[menuid].price + " p.p.</span>";
            menuInformation.querySelector("p").innerHTML = data[menuid].description;
            setMenuInformation(data, data[menuid].menuId);

        });

        document.getElementById("menu_list").appendChild(menubutton);
    }
}

function setMenuInformation(data, menuid) {
    return new Promise(
        function (resolve, reject) {
            $.ajax(
                {
                    url: "/api/menu/menuitems",
                    type: "GET",
                    contentType: 'application/json; charset=utf-8',
                    dataType: 'json',

                    success: function (data) {
                        if (document.getElementsByClassName("menu_items")[0] != null) {
                            document.getElementsByClassName("menu_items")[0].remove();
                        }

                        let count = 0;
                        for (i = 0; i < data.length; i++) {
                            if (data[i].menuId == menuid) {
                                count++;
                            }
                        }

                        if (count == 0) { // menu has no products
                            return;
                        }

                        let menuDetails = document.getElementsByClassName("menu_details")[0];
                        let menuItemsDiv = document.createElement("div");
                        let menuItemsTitle = document.createElement("h4");
                        let menuItemsList = document.createElement("ul");
                        menuItemsTitle.innerHTML = 'Producten'

                        menuItemsDiv.classList.add("menu_items");
                        menuDetails.appendChild(menuItemsDiv);

                        let menuItems = document.getElementsByClassName("menu_items")[0];
                        menuItems.appendChild(menuItemsTitle);
                        menuItems.appendChild(menuItemsList);

                        for (i = 0; i < data.length; i++) {
                            if (data[i].menuId == menuid) {
                                if (data[i].isVisible) {
                                    let item = document.createElement("li");
                                    item.innerHTML = data[i].name;

                                    if (data[i].containsGluten) {
                                        item.innerHTML += ` <i class="fa fa-leaf"></i>`;
                                    }

                                    if (data[i].containsLactose) {
                                        item.innerHTML += ` <i class="fa fa-leaf"></i>`;
                                    }

                                    if (data[i].isVegan) {
                                        item.innerHTML += ` <i class="fa fa-leaf"></i>`;
                                    }

                                    if (data[i].isFish) {
                                        item.innerHTML += ` <i class="fa fa-leaf"></i>`;
                                    }

                                    if (data[i].isMeat) {
                                        item.innerHTML += ` <i class="fa fa-leaf"></i>`;
                                    }



                                    menuItems.querySelector("ul").appendChild(item);
                                }
                            }
                        }


                    },
                    error: function (error) {
                        popup.show(false, error);;
                    },

                });
        });
}

