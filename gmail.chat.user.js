gTable = null;

function getContactsTable() {
    var tables = document.getElementsByTagName('table');
    for(var i = 0; i < tables.length; i++) {
        if(tables[i].getAttribute('class') == 'vH' && tables[i].getAttribute('role') == 'listbox') {
            var rows = tables[i].getElementsByTagName('tr');
            if(rows.length > 0) {
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
    for(var i = 0; i < crows.length; i++) {
        var img = crows[i].getElementsByTagName('img');
        if(img.length < 1) continue;
        img = img[0];
        if(img.className.indexOf(" df ") > -1 || img.alt === "") {
            //crows[i].style.display = 'none';
            crows[i].onclick = function(e) {
                e.stopPropagation();
                console.log("CHAT - clicked on" , this.getElementsByClassName('az1')[0].innerHTML);
            };
            console.log('adding offline chat for ' + i);
        } else {
            //crows[i].style.display = '';
            crows[i].onclick = null;
            console.log('removing offline chat for row ' + i);
        }
    }
    console.log('end modified');

    gTable.addEventListener("DOMSubtreeModified", modified, false);
}

function load() {
    if(getContactsTable() == gTable) return;

    if(gTable !== null) {
        gTable.removeEventListener("DOMSubtreeModified", modified, false);
    }

    if((gTable = getContactsTable()) !== null) {
        gTable.addEventListener("DOMSubtreeModified", modified, false);
        modified();
    }
}

window.addEventListener("DOMSubtreeModified", load, false);
load();