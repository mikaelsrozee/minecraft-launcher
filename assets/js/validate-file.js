const isJSON = require('is-valid-json');

function init() {
    document.querySelectorAll(".pack-file-input").forEach(input => {
       input.addEventListener("input", () => isUploadedFileValid(input.files[0]));
    });

    setIndicatorState("hidden");

    // TODO: add event listener to add button => submitFile()
}

module.exports = {
    isFileValid: function (file, dir) {
        const fs = require('fs');
        const path = require('path');

        if (file === undefined) {
            return;
        }

        // check if file is a .json file
        if (path.extname(file) !== ".json") {
            return {result: false, msg: "Invalid file type. Required: '.json', Found: '" + path.extname(file) + "'"};
        }

        // check JSON is valid
        const readFile = fs.readFileSync(path.join(dir, "/", file), 'utf8');

        if (!isJSON(readFile)) {
            return {result: false, msg: "File '" + file + "' is not valid JSON."};
        }

        // check if file has all required attributes
        const jsonFile = JSON.parse(readFile);
        const reqAttributes = ["pack_name", "pack_author", "pack_ver", "mc_ver", "forge_ver", "desc"];
        let hasAllAttributes = true;
        let missingAttribute = null;
        reqAttributes.forEach(attr => {
            if (!jsonFile.hasOwnProperty(attr)) {
                hasAllAttributes = false;
                missingAttribute = attr;
            }
        });

        if (!hasAllAttributes) {
            return {result: false, msg: "Missing required attribute '" + missingAttribute + "' from file '" + file + "'"};
        }

        return {result: true, msg: null};
    }
};

function isUploadedFileValid(file) {
    if (file === undefined) {
        setIndicatorState("hidden");
        return;
    }

    let {result, msg} = module.exports.isFileValid(file.name, file.path.replace(file.name, ""));

    if (result) {
        setIndicatorState("valid");
    } else {
        setIndicatorState("invalid");
    }

    return {result, msg};
}

function setIndicatorState(state) {
    let indicator = document.querySelector("#valid-icon");

    if (indicator === null) {
        return;
    }

    if (state === "hidden") {
        indicator.textContent = " ";
    } else if (state === "valid") {
        indicator.textContent = "✓";
        indicator.setAttribute("style", "color: lime;");
    } else if (state === "invalid") {
        indicator.textContent = "✗";
        indicator.setAttribute("style", "color: red;");
    }
}

function submitFile() {
    // TODO: recheck validity

    // TODO: if file is valid, pass it to the packs folder

    // TODO: refresh pack list

    // TODO: return to main menu
}

init();
