"use strict";
/*!
 * Get More Brain bitmark-JSON to HTML converter by Bit&Black
 * Officially under the umbrella of the bitmark Association
 */
exports.__esModule = true;
exports.AbstractRenderer = void 0;
var fs = require("fs");
var temp = require("temp");
var AbstractRenderer = /** @class */ (function () {
    function AbstractRenderer(command) {
        this.fontsFolder = null;
        this.tempFolder = null;
        this.command = command;
    }
    AbstractRenderer.prototype.useFontsFolder = function (fontsFolder) {
        this.fontsFolder = fontsFolder;
        return this;
    };
    AbstractRenderer.prototype.getLogContent = function () {
        return this.logContent;
    };
    AbstractRenderer.prototype.getTempFolder = function () {
        if (null === this.tempFolder) {
            this.tempFolder = temp.mkdirSync("bitmark");
        }
        return this.tempFolder;
    };
    AbstractRenderer.prototype.clearTempFolder = function () {
        fs.rmSync(this.tempFolder, { recursive: true });
        return this;
    };
    return AbstractRenderer;
}());
exports.AbstractRenderer = AbstractRenderer;
