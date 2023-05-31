/*!
 * Get More Brain bitmark-JSON to HTML converter by Bit&Black
 * Officially under the umbrella of the bitmark Association 
 */

import { RendererInterface } from "./RendererInterface";
import * as fs from "fs";
import * as temp from "temp";

abstract class AbstractRenderer implements RendererInterface
{
    protected readonly command: string;

    protected logContent: string;

    protected fontsFolder: string | null = null;

    private tempFolder: string | null = null;

    constructor(command: string) {
        this.command = command;
    }

    abstract getRendererName(): string;

    abstract getPDF(html: string, css: string): string;

    useFontsFolder(fontsFolder: string): this {
        this.fontsFolder = fontsFolder;
        return this;
    }

    getLogContent(): string
    {
        return this.logContent;
    }

    getTempFolder(): string {
        if (null === this.tempFolder) {
            this.tempFolder = temp.mkdirSync("bitmark");
        }

        return this.tempFolder;
    }

    clearTempFolder(): this {
        fs.rmSync(this.tempFolder, { recursive: true });
        return this;
    }
}

export { AbstractRenderer };