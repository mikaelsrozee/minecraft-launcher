const path = require('path');
const fs = require('fs');

function displayPack(pathToPackJSON) {
    const jsonFile = getJsonFile(pathToPackJSON);

    if (document.getElementById("right-side").className === "hidden") {
        document.getElementById("right-side").className = "";
    }

    for (let key in jsonFile) {
        if (key !== "pack_icon") {
            document.getElementById(key.toString()).innerText = jsonFile[key];
        }
    }
}

function createPackIcon(pathToPackJSON) {
    const jsonFile = getJsonFile(pathToPackJSON);
    if ('content' in document.createElement('template')) {
        const template = document.getElementById("template-pack-icon");
        let templateClone = document.importNode(template.content, true);

        templateClone.children[0].setAttribute("src", jsonFile['pack_icon']);
        templateClone.children[0].addEventListener('click', () => displayPack(pathToPackJSON));

        let packs = document.getElementById("packs");
        packs.append(templateClone);
    }
}

function getJsonFile(pathToPackJSON) {
    let request = new XMLHttpRequest();
    request.open("GET", path.join(__dirname, pathToPackJSON), false);
    request.send(null);
    return JSON.parse(request.responseText);
}

function init() {
    fs.readdir(path.join(__dirname, "/packs"), function (err, files) {
        if (err) {
            console.error("Could not list the directory.", err);
            process.exit(1);
        }

        files.forEach(function (file, index) {
            createPackIcon("/packs/" + file);
        });
    });
}

document.addEventListener("load", init());