"use strict";
/*!
 * Get More Brain bitmark-JSON to HTML converter by Bit&Black
 * Officially under the umbrella of the bitmark Association
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.Vivliostyle = void 0;
var fs = require("fs");
var path = require("path");
var AbstractRenderer_1 = require("./AbstractRenderer");
var child_process_1 = require("child_process");
var fsExtra = require("fs-extra");
var Vivliostyle = /** @class */ (function (_super) {
    __extends(Vivliostyle, _super);
    function Vivliostyle() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Vivliostyle.prototype.getRendererName = function () {
        return "Vivliostyle";
    };
    Vivliostyle.prototype.getPDF = function (html, css) {
        var htmlFileContent = "<!DOCTYPE html>\n            <html lang=\"de\">\n                <head>\n                    <meta charset=\"utf8\">\n                    <style>".concat(css, "</style>\n                </head>\n                <body>").concat(html, "</body>\n            </html>\n        ");
        var inputPath = path.join(this.getTempFolder(), "input.html");
        var outputPath = path.join(this.getTempFolder(), "output.pdf");
        var logPath = path.join(this.getTempFolder(), "log.txt");
        fs.writeFileSync(inputPath, htmlFileContent);
        if (null !== this.fontsFolder) {
            var srcDir = this.fontsFolder;
            var destDir = path.join(this.getTempFolder(), path.basename(this.fontsFolder));
            try {
                fsExtra.copySync(srcDir, destDir);
            }
            catch (error) {
                throw new Error("Failed copying font folder: ".concat(error));
            }
        }
        var hasError = false;
        try {
            (0, child_process_1.execSync)("".concat(this.command, " build -d ").concat(inputPath, " -o ").concat(outputPath, " &>").concat(logPath));
        }
        catch (error) {
            hasError = true;
        }
        this.logContent = fs.readFileSync(logPath).toString();
        if (true === hasError) {
            throw new Error("Command failed: ".concat(this.logContent));
        }
        return fs.readFileSync(outputPath, { encoding: "utf16le" });
    };
    return Vivliostyle;
}(AbstractRenderer_1.AbstractRenderer));
exports.Vivliostyle = Vivliostyle;
