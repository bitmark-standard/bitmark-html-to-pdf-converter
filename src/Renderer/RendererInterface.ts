/*!
 * Get More Brain bitmark-JSON to HTML converter by Bit&Black
 * Officially under the umbrella of the bitmark Association 
 */

interface RendererInterface {
    getPDF(html: string, css: string): string;

    getLogContent(): string;

    useFontsFolder(fontsFolder: string): this;

    getTempFolder(): string;

    clearTempFolder(): this;

    getRendererName(): string;
}

export { RendererInterface };