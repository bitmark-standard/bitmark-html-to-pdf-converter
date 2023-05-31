/*!
 * Get More Brain bitmark-JSON to HTML converter by Bit&Black
 * Officially under the umbrella of the bitmark Association
 */
import { AbstractRenderer } from "./AbstractRenderer";
import { RendererInterface } from "./RendererInterface";
declare class PagedJS extends AbstractRenderer implements RendererInterface {
    getRendererName(): string;
    getPDF(html: string, css: string): string;
}
export { PagedJS };
