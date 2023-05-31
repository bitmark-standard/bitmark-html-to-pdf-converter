/*!
 * Get More Brain bitmark-JSON to HTML converter by Bit&Black
 * Officially under the umbrella of the bitmark Association 
 */

import * as fs from "fs";
import { execSync } from "child_process";

function fileCanBeUsed(file): boolean {
    if (!fs.existsSync(file)) {
        return false;
    }

    let isAccessible = true;

    try {
        fs.accessSync(file, fs.constants.R_OK);
    } catch (error) {
        isAccessible = false;
    }

    return isAccessible;
}

function isCommandAvailable(command): boolean {
    try {
        execSync(`${command} -h &>/dev/null`);
        return true;
    } catch (error) {
    }

    try {
        execSync(`${command} --help &>/dev/null`);
        return true;
    } catch (error) {
    }

    return false;
}

export { fileCanBeUsed, isCommandAvailable };