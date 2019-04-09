function init() {
    // TODO: add event listener to new pack file input => isFileValid()

    // TODO: add event listener to add button => submitFile()
}

module.exports = {
    isFileValid: function () {
        // TODO: check if file is a .json file

        // TODO: check JSON is valid

        // TODO: check if file has all required attributes

        // TODO: check if pack icon can be found (if specified)

        // TODO: return {isValid, error}

        return {result: true, msg: null};
    }
};

function submitFile() {
    // TODO: recheck validity

    // TODO: if file is valid, pass it to the packs folder

    // TODO: refresh pack list

    // TODO: return to main menu
}

init();
