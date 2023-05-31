/*!
 * Get More Brain bitmark-JSON to HTML converter by Bit&Black
 * Officially under the umbrella of the bitmark Association
 */
import { RendererInterface } from "./RendererInterface";
declare abstract class AbstractRenderer implements RendererInterface {
    protected readonly command: string;
    protected logContent: string;
    protected fontsFolder: string | null;
    private tempFolder;
    constructor(command: string);
    abstract getRendererName(): string;
    abstract getPDF(html: string, css: string): string;
    useFontsFolder(fontsFolder: string): this;
    getLogContent(): string;
    getTempFolder(): string;
    clearTempFolder(): this;
}
export { AbstractRenderer };
