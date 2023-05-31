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
exports.HTMLConvertCommand = void 0;
var fs = require("fs");
var path = require("path");
var AHFormatter_1 = require("../Renderer/AHFormatter");
var AbstractConsoleCommand_1 = require("bitandblack-console/src/Commands/AbstractConsoleCommand");
var ArgumentModeEnum_1 = require("bitandblack-console/src/Commands/ArgumentModeEnum");
var ConsoleCommandInterface_1 = require("bitandblack-console/src/Commands/ConsoleCommandInterface");
var Helpers_1 = require("../Helpers");
var InputModeEnum_1 = require("bitandblack-console/src/Commands/InputModeEnum");
var HTMLToPDFConverter_1 = require("../HTMLToPDFConverter");
var PagedJS_1 = require("../Renderer/PagedJS");
var Vivliostyle_1 = require("../Renderer/Vivliostyle");
var HTMLConvertCommand = /** @class */ (function (_super) {
    __extends(HTMLConvertCommand, _super);
    function HTMLConvertCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HTMLConvertCommand.prototype.configure = function () {
        var optionMarginDescription = "This option is an addition the the "
            + "<comment>background-image</comment> option and will only be active, "
            + "when the <comment>background-image</comment> option is in use. ";
        this
            .setName("html:convert")
            .setDescription("This command converts HTML into PDF. ")
            .addInputArgument("input", ArgumentModeEnum_1.ArgumentModeEnum.REQUIRED, "The HTML input. This may be the path to a file or a stream with the HTML content. ")
            .addInputArgument("output", ArgumentModeEnum_1.ArgumentModeEnum.OPTIONAL, "The PDF input.")
            .addInputOption("css", InputModeEnum_1.InputModeEnum.VALUE_REQUIRED, "Path to a custom CSS file. If not set, the default stylesheet of this library will be used. ")
            .addInputOption("fonts", InputModeEnum_1.InputModeEnum.VALUE_REQUIRED, "Path to a folder with fonts that are referenced in the CSS. ")
            .addInputOption("renderer", InputModeEnum_1.InputModeEnum.VALUE_REQUIRED, "Name or path to a custom HTML to PDF renderer. "
            + "This can be for example <comment>vivliostyle</comment> if this binary is available on your system, "
            + "or <comment>/usr/local/AHFormatterV72/run.sh</comment>. If not set, the default renderer will be used. "
            + "Currently supported renderers are: AH Formatter, PagedJS and Vivliostyle. ")
            .addInputOption("background-image", InputModeEnum_1.InputModeEnum.VALUE_REQUIRED, "The path to an image, that will appear in the background, for example a Letterhead. "
            + "This may be a <comment>JPEG</comment>, <comment>PNG</comment> or <comment>TIFF</comment>. "
            + "Some renderers also support <comment>PDF</comment> and <comment>EPS</comment>. "
            + "This is a simple way to customize the design without writing a custom stylesheet. "
            + "The <comment>margin</comment> options can be used to fit the page content better into "
            + "the layout of the background image.")
            .addInputOption("margin-top", InputModeEnum_1.InputModeEnum.VALUE_REQUIRED, "The space at the top of the page, for example <comment>25mm</comment>. " + optionMarginDescription)
            .addInputOption("margin-right", InputModeEnum_1.InputModeEnum.VALUE_REQUIRED, "The space to the right of the page, for example <comment>25mm</comment>. " + optionMarginDescription)
            .addInputOption("margin-bottom", InputModeEnum_1.InputModeEnum.VALUE_REQUIRED, "The space at the bottom of the page, for example <comment>25mm</comment>. " + optionMarginDescription)
            .addInputOption("margin-left", InputModeEnum_1.InputModeEnum.VALUE_REQUIRED, "The space to the left of the page, for example <comment>25mm</comment>. " + optionMarginDescription);
    };
    HTMLConvertCommand.prototype.execute = function (input, output) {
        output.writeln("Starting conversion now.");
        var inputArgument = input.getInputArgument("input");
        var outputArgument = input.getInputArgument("output");
        var cssOption = null;
        if (input.hasInputOption("css")) {
            cssOption = input.getInputOption("css");
        }
        var rendererOption = "./node_modules/.bin/pagedjs-cli";
        if (input.hasInputOption("renderer")) {
            rendererOption = input.getInputOption("renderer");
        }
        var renderer = new PagedJS_1.PagedJS(rendererOption);
        var isAvailable = (0, Helpers_1.isCommandAvailable)(rendererOption);
        if (false === isAvailable) {
            output.writeln("<error>Error</error> A renderer \"".concat(rendererOption, "\" seems not to be available."));
            return ConsoleCommandInterface_1.ConsoleCommandInterface.FAILURE;
        }
        if (rendererOption.toLowerCase().includes("ahformatter")) {
            renderer = new AHFormatter_1.AHFormatter(rendererOption);
        }
        else if (rendererOption.toLowerCase().includes("vivliostyle")) {
            renderer = new Vivliostyle_1.Vivliostyle(rendererOption);
        }
        var content = inputArgument;
        var message = "Reading content from stream.";
        if ((0, Helpers_1.fileCanBeUsed)(inputArgument)) {
            message = "Reading content from <info>\"".concat(inputArgument, "\"</info>.");
            content = fs.readFileSync(inputArgument);
        }
        output.writeln(message);
        var defaultStyle = path.join(__dirname, "../../dist/default-style.css");
        var css = "";
        if (null !== cssOption) {
            if (!(0, Helpers_1.fileCanBeUsed)(cssOption)) {
                output.writeln("<error>Error</error> Cannot use custom CSS file.");
                return ConsoleCommandInterface_1.ConsoleCommandInterface.FAILURE;
            }
            css = css + fs.readFileSync(cssOption).toString();
        }
        else {
            css = css + fs.readFileSync(defaultStyle).toString();
        }
        var backgroundImage = null;
        if (input.hasInputOption("background-image")) {
            backgroundImage = input.getInputOption("background-image");
            backgroundImage = path.resolve(backgroundImage);
        }
        if (null !== backgroundImage) {
            if (!(0, Helpers_1.fileCanBeUsed)(backgroundImage)) {
                output.writeln("<error>Error</error> Cannot use background image.");
                return ConsoleCommandInterface_1.ConsoleCommandInterface.FAILURE;
            }
            var marginTop = input.hasInputOption("margin-top")
                ? input.getInputOption("margin-top")
                : null;
            var marginRight = input.hasInputOption("margin-right")
                ? input.getInputOption("margin-right")
                : null;
            var marginBottom = input.hasInputOption("margin-bottom")
                ? input.getInputOption("margin-bottom")
                : null;
            var marginLeft = input.hasInputOption("margin-left")
                ? input.getInputOption("margin-left")
                : null;
            css = css + "@page { \n                background-image: url(\"".concat(backgroundImage, "\"); \n                background-repeat: no-repeat;\n                background-size: 100%;\n                background-position: center top;\n            ");
            if (null !== marginTop) {
                css = css + "\n                    margin-top: ".concat(marginTop, ";\n                ");
            }
            if (null !== marginRight) {
                css = css + "\n                    margin-right: ".concat(marginRight, ";\n                ");
            }
            if (null !== marginBottom) {
                css = css + "\n                    margin-bottom: ".concat(marginBottom, ";\n                ");
            }
            if (null !== marginLeft) {
                css = css + "\n                    margin-left: ".concat(marginLeft, ";\n                ");
            }
            css = css + "\n                }\n            ";
        }
        output.writeln("Using <info>\"".concat(renderer.getRendererName(), "\"</info> as PrintCSS renderer."));
        if (input.hasInputOption("fonts")) {
            renderer.useFontsFolder(input.getInputOption("fonts"));
        }
        var pdf = null;
        try {
            var htmlToPDFConverter = new HTMLToPDFConverter_1.HTMLToPDFConverter(content, css);
            pdf = htmlToPDFConverter.getPDF(renderer);
        }
        catch (error) {
            output.writeln("<error>Error while parsing content.</error>");
            output.writeln(error.message);
        }
        renderer.clearTempFolder();
        output.writeln("Renderer answered with: <comment>" + renderer.getLogContent() + "</comment>");
        if (null === pdf) {
            return ConsoleCommandInterface_1.ConsoleCommandInterface.FAILURE;
        }
        if (null !== outputArgument) {
            if (fs.existsSync(outputArgument)) {
                fs.rmSync(outputArgument);
            }
            fs.writeFileSync(outputArgument, pdf, { encoding: "utf16le" });
            output.writeln("Successfully written content to <info>\"".concat(outputArgument, "\"</info>."));
            return ConsoleCommandInterface_1.ConsoleCommandInterface.SUCCESS;
        }
        output.writeln(pdf);
        return ConsoleCommandInterface_1.ConsoleCommandInterface.SUCCESS;
    };
    return HTMLConvertCommand;
}(AbstractConsoleCommand_1.AbstractConsoleCommand));
exports.HTMLConvertCommand = HTMLConvertCommand;
