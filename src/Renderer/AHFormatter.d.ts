/*!
 * Get More Brain bitmark-JSON to HTML converter by Bit&Black
 * Officially under the umbrella of the bitmark Association
 */
import { AbstractRenderer } from "./AbstractRenderer";
import { RendererInterface } from "./RendererInterface";
declare class AHFormatter extends AbstractRenderer implements RendererInterface {
    getRendererName(): string;
    getPDF(html: string, css: string): string;
}
export { AHFormatter };
