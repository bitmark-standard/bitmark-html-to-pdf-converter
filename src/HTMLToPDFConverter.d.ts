/*!
 * Get More Brain bitmark-JSON to HTML converter by Bit&Black
 * Officially under the umbrella of the bitmark Association
 */
import { RendererInterface } from "./Renderer/RendererInterface";
declare class HTMLToPDFConverter {
    private readonly html;
    private readonly css;
    constructor(html: string, css: string);
    /**
     * An instance of the Renderer, that should be used to convert the HTML and CSS into PDF.
     *
     * @param renderer
     */
    getPDF(renderer: RendererInterface): string;
}
export { HTMLToPDFConverter };
