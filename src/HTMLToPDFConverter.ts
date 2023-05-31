/*!
 * Get More Brain bitmark-JSON to HTML converter by Bit&Black
 * Officially under the umbrella of the bitmark Association 
 */

import { RendererInterface } from "./Renderer/RendererInterface";

class HTMLToPDFConverter {
    private readonly html: string;
    private readonly css: string;

    constructor(html: string, css: string) {
        this.html = html;
        this.css = css;
    }

    /**
     * An instance of the Renderer, that should be used to convert the HTML and CSS into PDF.
     *
     * @param renderer
     */
    getPDF(renderer: RendererInterface): string {
        return renderer.getPDF(this.html, this.css);
    }
}

export { HTMLToPDFConverter };