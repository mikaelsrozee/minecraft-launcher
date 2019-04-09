const path = require('path');
const fs = require('fs');
const validate = require(path.resolve(__dirname, './assets/js/validate-file'));

let packDir = null;

function init() {
    packDir = getPackDirectory();
    let packs = getAllValidPacks(packDir);

    packs.forEach(pack => {
       createPackIcon(pack);
    });
}

function getPackDirectory() {
    if (packDir == null) {
        packDir = path.join(__dirname, "/packs");
    }

    return packDir;
}

function getAllValidPacks(dir) {
    let packs = [];

    fs.readdirSync(dir).forEach(file => {
       if (path.extname(file) === '.json') {
           const isFileValid = validate.isFileValid(file);
           if (isFileValid.result) {
               packs.push(JSON.parse(fs.readFileSync(path.join(dir, "/", file), 'utf8')));
           } else {
               console.error(isFileValid.msg);
           }
       }
    });

    return packs;
}

function createPackIcon(pack) {
    let img = pack['pack_icon'];

    if (img == null) {
        // if no pack icon specified, use default pack icon
        img = "assets/img/pack-icon.png";
    }

    if ('content' in document.createElement('template')) {
        const template = document.getElementById("template-pack-icon");
        let templateClone = document.importNode(template.content, true);

        templateClone.children[0].setAttribute("src", img);
        templateClone.children[0].addEventListener('click', () => togglePackInfo(pack));

        let packs = document.getElementById("packs");
        packs.insertBefore(templateClone, document.getElementById("add-pack"));
    }
}

// called whenever a pack icon is clicked
function togglePackInfo(pack) {
    let iconClicked = event.target;

    if (iconClicked.className.includes("selected")) {
        // if the icon is already selected:
        hidePackInfoPane();
        deselectAllPackIcons();
    } else {
        // if the icon is not already selected:
        deselectAllPackIcons();
        selectPackIcon(iconClicked);
        showPackInfoPane();
        showPackInfoFor(pack);
    }

}

function hidePackInfoPane() {
    let pane = document.getElementById("right-side");

    if (!pane.classList.contains("hidden")) {
        pane.classList.add("hidden");
    }
}

function showPackInfoPane() {
    let pane = document.getElementById("right-side");

    if (pane.classList.contains("hidden")) {
        pane.classList.remove("hidden");
    }
}

function showPackInfoFor(pack) {
    for (let key in pack) {
        let element = document.getElementById(key.toString());
        if (element !== null) {
            element.innerText = pack[key];
        }
    }
}

function selectPackIcon(icon) {
    icon.classList.add("selected");
}

function deselectPackIcon(icon) {
    icon.classList.remove("selected");
}

function deselectAllPackIcons() {
    // for each pack, call deselectPackIcon(pack)
    document.querySelectorAll(".pack").forEach(pack => {
       deselectPackIcon(pack);
    });
}

init();
