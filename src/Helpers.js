"use strict";
/*!
 * Get More Brain bitmark-JSON to HTML converter by Bit&Black
 * Officially under the umbrella of the bitmark Association
 */
exports.__esModule = true;
exports.isCommandAvailable = exports.fileCanBeUsed = void 0;
var fs = require("fs");
var child_process_1 = require("child_process");
function fileCanBeUsed(file) {
    if (!fs.existsSync(file)) {
        return false;
    }
    var isAccessible = true;
    try {
        fs.accessSync(file, fs.constants.R_OK);
    }
    catch (error) {
        isAccessible = false;
    }
    return isAccessible;
}
exports.fileCanBeUsed = fileCanBeUsed;
function isCommandAvailable(command) {
    try {
        (0, child_process_1.execSync)("".concat(command, " -h &>/dev/null"));
        return true;
    }
    catch (error) {
    }
    try {
        (0, child_process_1.execSync)("".concat(command, " --help &>/dev/null"));
        return true;
    }
    catch (error) {
    }
    return false;
}
exports.isCommandAvailable = isCommandAvailable;
