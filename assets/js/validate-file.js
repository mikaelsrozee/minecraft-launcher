const isJSON = require('is-valid-json');

function init() {
    const fileUpload = document.querySelector(".pack-file-input");
    if (fileUpload === null) {
        return;
    }
    fileUpload.addEventListener("input", () => isUploadedFileValid(fileUpload.files[0]));

    setIndicatorState("hidden");
    const fileSubmit = document.querySelector(".pack-file-submit");
    if (fileSubmit === null) {
        return;
    }
    fileSubmit.addEventListener("click", () => submitFile(fileUpload.files[0]));
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
    const fileSubmit = document.querySelector(".pack-file-submit");

    if (indicator === null || fileSubmit === null) {
        return;
    }

    if (state === "hidden") {
        indicator.textContent = " ";
        fileSubmit.setAttribute("disabled", "true");
    } else if (state === "valid") {
        indicator.textContent = "✓";
        indicator.setAttribute("style", "color: lime;");
        fileSubmit.removeAttribute("disabled");
    } else if (state === "invalid") {
        indicator.textContent = "✗";
        indicator.setAttribute("style", "color: red;");
    }
}

function submitFile(file) {
    console.log(file);

    // TODO: recheck validity

    // TODO: if file is valid, pass it to the packs folder

    // TODO: refresh pack list

    // TODO: return to main menu
}

init();
