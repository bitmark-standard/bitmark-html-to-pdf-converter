/*!
 * Get More Brain bitmark-JSON to HTML converter by Bit&Black
 * Officially under the umbrella of the bitmark Association 
 */

import { RendererInterface } from "../src/Renderer/RendererInterface";

class TestRenderer implements RendererInterface {
    getPDF(html: string, css: string): string {
        return "Function \"getPDF\" is not implemented.";
    }

    clearTempFolder(): this {
        return this;
    }

    getLogContent(): string {
        return "Function \"getLogContent\" is not implemented.";
    }

    getRendererName(): string {
        return "TestRenderer";
    }

    getTempFolder(): string {
        return "Function \"getTempFolder\" is not implemented.";
    }

    useFontsFolder(fontsFolder: string): this {
        return this;
    }
}

export { TestRenderer };