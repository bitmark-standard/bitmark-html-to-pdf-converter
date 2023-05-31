/*!
 * Get More Brain bitmark-JSON to HTML converter by Bit&Black
 * Officially under the umbrella of the bitmark Association 
 */

import * as fs from "fs";
import * as path from "path";
import { AbstractRenderer } from "./AbstractRenderer";
import { execSync } from "child_process";
import { RendererInterface } from "./RendererInterface";

const fsExtra = require("fs-extra");

class Vivliostyle extends AbstractRenderer implements RendererInterface
{
    getRendererName(): string {
        return "Vivliostyle";
    }

    getPDF(html: string, css: string): string {
        const htmlFileContent = `<!DOCTYPE html>
            <html lang="de">
                <head>
                    <meta charset="utf8">
                    <style>${css}</style>
                </head>
                <body>${html}</body>
            </html>
        `;

        const inputPath = path.join(this.getTempFolder(), "input.html");
        const outputPath = path.join(this.getTempFolder(), "output.pdf");
        const logPath = path.join(this.getTempFolder(), "log.txt");

        fs.writeFileSync(inputPath, htmlFileContent);

        if (null !== this.fontsFolder) {
            const srcDir = this.fontsFolder;
            const destDir = path.join(this.getTempFolder(), path.basename(this.fontsFolder));

            try {
                fsExtra.copySync(srcDir, destDir)
            } catch (error) {
                throw new Error(`Failed copying font folder: ${error}`);
            }
        }

        let hasError: boolean = false;

        try {
            execSync(`${this.command} build -d ${inputPath} -o ${outputPath} &>${logPath}`);
        } catch (error) {
            hasError = true;
        }

        this.logContent = fs.readFileSync(logPath).toString();

        if (true === hasError) {
            throw new Error(`Command failed: ${this.logContent}`);
        }

        return fs.readFileSync(outputPath, {encoding: "utf16le"});
    }
}

export { Vivliostyle };