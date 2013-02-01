gTable = null;

function getContactsTable() {
    var tables = document.getElementsByTagName('table');
    for (var i = 0; i < tables.length; i++) {
        if (tables[i].getAttribute('class') === 'vH' && tables[i].getAttribute('role') === 'listbox') {
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

    console.log('modified');
    var crows = gTable.getElementsByTagName('tr');
    for (var i = 0; i < crows.length; i++) {
        var img = crows[i].getElementsByTagName('img');
        if (img.length < 1) continue;
        img = img[0];
        if (img.className.indexOf(" df ") > -1 || img.alt === "") {
            crows[i].onclick = function(e) {
                e.stopPropagation();
                console.log("CHAT - clicked on", this.getElementsByClassName('az1')[0].innerHTML);
                openOfflineChat(this.querySelector(".az1").innerHTML);
            };
            console.log('adding offline chat for ' + i);
        } else {
            // nothing
        }
    }
    console.log('end modified');

    gTable.addEventListener("DOMSubtreeModified", modified, false);
}
var self = this;
var chatSearch = document.querySelector('div[role="complementary"] input[type="text"][aria-haspopup]');

var openOfflineChat = function(name) {
        var evt_click = document.createEvent("MouseEvents");
        evt_click.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        var evt_focus = document.createEvent("MouseEvents");
        evt_focus.initMouseEvent("focus", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        var evt_mouseover = document.createEvent("MouseEvents");
        evt_mouseover.initMouseEvent("mouseover", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);

        var putText = function(name) {

                chatSearch.value = "";
                chatSearch.dispatchEvent(evt_focus);
                chatSearch.value = name;
            };

        var clickOnChat = function() {
                // console.log("removing fields");
                // $('div[role="listbox"] div').remove();
                // $('div[role="listbox"] div div div').remove();
                var options = document.querySelectorAll('div[role="listbox"] div div div.uX');
                for (i = 0; i < options.length; i++) {
                    if (options[i].innerHTML === "Send offline chat") {
                        console.log("clicking on the chat icon");
                        options[i].dispatchEvent(evt_mouseover);
                        options[i].dispatchEvent(evt_click);
                        options[i].style.zIndex = 0;
                        break;
                    }
                }
                chatSearch.value = "";
                $('div[role="listbox"]').style.zIndex = 0;

                // console.log("clicking on chat icon");
                // $('div[role="listbox"] div div div').dispatchEvent(evt_mouseover);
                // $('div[role="listbox"] div div div').dispatchEvent(evt_click);
                // $('div[role="listbox"]').style.zIndex=0;
            };

        putText(name);
        $('div[role="listbox"]').style.zIndex = -100;
        setTimeout(clickOnChat, 500);

    };

function load() {
    if (getContactsTable() === gTable) return;

    if (gTable !== null) {
        gTable.removeEventListener("DOMSubtreeModified", modified, false);
    }

    if ((gTable = getContactsTable()) !== null) {
        gTable.addEventListener("DOMSubtreeModified", modified, false);
        modified();
    }
}

window.addEventListener("DOMSubtreeModified", load, false);
load();
