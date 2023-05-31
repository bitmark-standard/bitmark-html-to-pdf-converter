/*!
 * Get More Brain bitmark-JSON to HTML converter by Bit&Black
 * Officially under the umbrella of the bitmark Association 
 */

import * as fs from "fs";
import * as path from "path";
import { AHFormatter } from "../Renderer/AHFormatter";
import { AbstractConsoleCommand } from "bitandblack-console/src/Commands/AbstractConsoleCommand";
import { ArgumentModeEnum } from "bitandblack-console/src/Commands/ArgumentModeEnum";
import { ConsoleCommandInterface } from "bitandblack-console/src/Commands/ConsoleCommandInterface";
import { fileCanBeUsed, isCommandAvailable } from "../Helpers";
import { InputInterface } from "bitandblack-console/src/Console/InputInterface";
import { InputModeEnum } from "bitandblack-console/src/Commands/InputModeEnum";
import { HTMLToPDFConverter } from "../HTMLToPDFConverter";
import { OutputInterface } from "bitandblack-console/src/Console/OutputInterface";
import { PagedJS } from "../Renderer/PagedJS";
import { RendererInterface } from "../Renderer/RendererInterface";
import { Vivliostyle } from "../Renderer/Vivliostyle";

class HTMLConvertCommand extends AbstractConsoleCommand {
    configure(): void {
        const optionMarginDescription = "This option is an addition the the "
            + "<comment>background-image</comment> option and will only be active, "
            + "when the <comment>background-image</comment> option is in use. "
        ;

        this
            .setName("html:convert")
            .setDescription("This command converts HTML into PDF. ")
            .addInputArgument(
                "input",
                ArgumentModeEnum.REQUIRED,
                "The HTML input. This may be the path to a file or a stream with the HTML content. "
            )
            .addInputArgument(
                "output",
                ArgumentModeEnum.OPTIONAL,
                "The PDF input."
            )
            .addInputOption(
                "css",
                InputModeEnum.VALUE_REQUIRED,
                "Path to a custom CSS file. If not set, the default stylesheet of this library will be used. "
            )
            .addInputOption(
                "fonts",
                InputModeEnum.VALUE_REQUIRED,
                "Path to a folder with fonts that are referenced in the CSS. "
            )
            .addInputOption(
                "renderer",
                InputModeEnum.VALUE_REQUIRED,
                "Name or path to a custom HTML to PDF renderer. "
                    + "This can be for example <comment>vivliostyle</comment> if this binary is available on your system, "
                    + "or <comment>/usr/local/AHFormatterV72/run.sh</comment>. If not set, the default renderer will be used. "
                    + "Currently supported renderers are: AH Formatter, PagedJS and Vivliostyle. "
            )
            .addInputOption(
                "background-image",
                InputModeEnum.VALUE_REQUIRED,
                "The path to an image, that will appear in the background, for example a Letterhead. "
                    + "This may be a <comment>JPEG</comment>, <comment>PNG</comment> or <comment>TIFF</comment>. "
                    + "Some renderers also support <comment>PDF</comment> and <comment>EPS</comment>. "
                    + "This is a simple way to customize the design without writing a custom stylesheet. "
                    + "The <comment>margin</comment> options can be used to fit the page content better into "
                    + "the layout of the background image."
            )
            .addInputOption(
                "margin-top",
                InputModeEnum.VALUE_REQUIRED,
                "The space at the top of the page, for example <comment>25mm</comment>. " + optionMarginDescription
            )
            .addInputOption(
                "margin-right",
                InputModeEnum.VALUE_REQUIRED,
                "The space to the right of the page, for example <comment>25mm</comment>. " + optionMarginDescription
            )
            .addInputOption(
                "margin-bottom",
                InputModeEnum.VALUE_REQUIRED,
                "The space at the bottom of the page, for example <comment>25mm</comment>. " + optionMarginDescription
            )
            .addInputOption(
                "margin-left",
                InputModeEnum.VALUE_REQUIRED,
                "The space to the left of the page, for example <comment>25mm</comment>. " + optionMarginDescription
            )
        ;
    }

    execute(input: InputInterface, output: OutputInterface): number {
        output.writeln("Starting conversion now.");

        const inputArgument = input.getInputArgument("input");
        const outputArgument = input.getInputArgument("output");

        let cssOption = null;

        if (input.hasInputOption("css")) {
            cssOption = input.getInputOption("css");
        }

        let rendererOption: string = "./node_modules/.bin/pagedjs-cli";

        if (input.hasInputOption("renderer")) {
            rendererOption = input.getInputOption("renderer");
        }

        let renderer: RendererInterface = new PagedJS(rendererOption);

        let isAvailable = isCommandAvailable(rendererOption);

        if (false === isAvailable) {
            output.writeln(`<error>Error</error> A renderer "${rendererOption}" seems not to be available.`);
            return ConsoleCommandInterface.FAILURE;
        }

        if (rendererOption.toLowerCase().includes("ahformatter")) {
            renderer = new AHFormatter(rendererOption);
        } else if (rendererOption.toLowerCase().includes("vivliostyle")) {
            renderer = new Vivliostyle(rendererOption);
        }

        let content: any = inputArgument;
        let message = "Reading content from stream.";

        if (fileCanBeUsed(inputArgument)) {
            message = `Reading content from <info>"${inputArgument}"</info>.`;
            content = fs.readFileSync(inputArgument);
        }

        output.writeln(message);

        const defaultStyle = path.join(__dirname, "../../dist/default-style.css");

        let css: string = "";

        if (null !== cssOption) {
            if (!fileCanBeUsed(cssOption)) {
                output.writeln("<error>Error</error> Cannot use custom CSS file.");
                return ConsoleCommandInterface.FAILURE;
            }

            css = css + fs.readFileSync(cssOption).toString();
        } else {
            css = css + fs.readFileSync(defaultStyle).toString();
        }

        let backgroundImage: string | null = null;

        if (input.hasInputOption("background-image")) {
            backgroundImage = input.getInputOption("background-image");
            backgroundImage = path.resolve(backgroundImage);
        }

        if (null !== backgroundImage) {
            if (!fileCanBeUsed(backgroundImage)) {
                output.writeln("<error>Error</error> Cannot use background image.");
                return ConsoleCommandInterface.FAILURE;
            }

            const marginTop: string | null = input.hasInputOption("margin-top")
                ? input.getInputOption("margin-top")
                : null
            ;

            const marginRight: string | null = input.hasInputOption("margin-right")
                ? input.getInputOption("margin-right")
                : null
            ;

            const marginBottom: string | null = input.hasInputOption("margin-bottom")
                ? input.getInputOption("margin-bottom")
                : null
            ;

            const marginLeft: string | null = input.hasInputOption("margin-left")
                ? input.getInputOption("margin-left")
                : null
            ;

            css = css + `@page { 
                background-image: url("${backgroundImage}"); 
                background-repeat: no-repeat;
                background-size: 100%;
                background-position: center top;
            `;

            if (null !== marginTop) {
                css = css + `
                    margin-top: ${marginTop};
                `;
            }

            if (null !== marginRight) {
                css = css + `
                    margin-right: ${marginRight};
                `;
            }

            if (null !== marginBottom) {
                css = css + `
                    margin-bottom: ${marginBottom};
                `;
            }

            if (null !== marginLeft) {
                css = css + `
                    margin-left: ${marginLeft};
                `;
            }

            css = css + `
                }
            `;
        }

        output.writeln(`Using <info>"${renderer.getRendererName()}"</info> as PrintCSS renderer.`);

        if (input.hasInputOption("fonts")) {
            renderer.useFontsFolder(
                input.getInputOption("fonts")
            );
        }

        let pdf = null;

        try {
            const htmlToPDFConverter = new HTMLToPDFConverter(content, css);
            pdf = htmlToPDFConverter.getPDF(renderer);
        } catch (error) {
            output.writeln("<error>Error while parsing content.</error>");
            output.writeln(error.message);
        }

        renderer.clearTempFolder();

        output.writeln("Renderer answered with: <comment>" + renderer.getLogContent() + "</comment>");

        if (null === pdf) {
            return ConsoleCommandInterface.FAILURE;
        }

        if (null !== outputArgument) {
            if (fs.existsSync(outputArgument)) {
                fs.rmSync(outputArgument);
            }

            fs.writeFileSync(outputArgument, pdf, { encoding: "utf16le" });
            output.writeln(`Successfully written content to <info>"${outputArgument}"</info>.`);
            return ConsoleCommandInterface.SUCCESS;
        }

        output.writeln(pdf);
        return ConsoleCommandInterface.SUCCESS;
    }
}

export { HTMLConvertCommand }