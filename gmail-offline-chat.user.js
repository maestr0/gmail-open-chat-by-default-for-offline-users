gTable = null;

function getContactsTable() {
    var tables = document.getElementsByTagName('table');
    for (var i = 0; i < tables.length; i++) {
        if (tables[i].getAttribute('class') == 'vH' && tables[i].getAttribute('role') == 'listbox') {
            var rows = tables[i].getElementsByTagName('tr');
            if (rows.length > 0) {
                return tables[i];
            }
        }
    }

    return null;
}

function modified(node) {
    gTable.removeEventListener("DOMSubtreeModified", modified, false);

    console.log('modified')
    var crows = gTable.getElementsByTagName('tr');
    for (var i = 0; i < crows.length; i++) {
        var img = crows[i].getElementsByTagName('img');
        if (img.length < 1) continue;
        img = img[0];
        if (img.alt == "Offline" || img.alt == "") {



            var row = crows[i];
            var name = row.querySelector(".az1").innerHTML;

            var klikaj = function(name2) {
                    //e.preventDefault();
                    //e.stopPropagation();
                    //var name2 = name;
                    openOfflineChat(name2);
                }


            row.onclick = function(e) {
                e.stopPropagation();
                klikaj(this.querySelector(".az1").innerHTML);
            }
            console.log('binding chat for row' + i);
        } else {
            //crows[i].style.display = '';
            console.log('TODO: unbinding for row ' + i);
        }
    }
    console.log('end modified')

    gTable.addEventListener("DOMSubtreeModified", modified, false);
}
var openOfflineChat = function(name) {
        var evt_click = document.createEvent("MouseEvents");
        evt_click.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        var evt_focus = document.createEvent("MouseEvents");
        evt_focus.initMouseEvent("focus", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        var evt_mouseover = document.createEvent("MouseEvents");
        evt_mouseover.initMouseEvent("mouseover", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);

        var putText = function(name) {

                $('input[title="Search people..."]').value = "";
                $('input[title="Search people..."]').dispatchEvent(evt_focus);
                $('input[title="Search people..."]').value = name;
            };

        var clickOnChat = function() {
                console.log("removing fields");
                $('div[role="listbox"] div').remove();
                $('div[role="listbox"] div div div').remove();
                console.log("clicking on chat icon");
                $('div[role="listbox"] div div div').dispatchEvent(evt_mouseover);
                $('div[role="listbox"] div div div').dispatchEvent(evt_click);
            };

        putText(name);
        setTimeout(clickOnChat, 500);

    }

function load() {
    if (getContactsTable() == gTable) return;

    if (gTable != null) {
        gTable.removeEventListener("DOMSubtreeModified", modified, false);
    }

    if ((gTable = getContactsTable()) != null) {
        gTable.addEventListener("DOMSubtreeModified", modified, false);
        modified();
    }
}

window.addEventListener("DOMSubtreeModified", load, false);
