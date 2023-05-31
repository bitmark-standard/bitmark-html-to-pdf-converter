"use strict";
/*!
 * Get More Brain bitmark-JSON to HTML converter by Bit&Black
 * Officially under the umbrella of the bitmark Association
 */
exports.__esModule = true;
exports.HTMLToPDFConverter = void 0;
var HTMLToPDFConverter = /** @class */ (function () {
    function HTMLToPDFConverter(html, css) {
        this.html = html;
        this.css = css;
    }
    /**
     * An instance of the Renderer, that should be used to convert the HTML and CSS into PDF.
     *
     * @param renderer
     */
    HTMLToPDFConverter.prototype.getPDF = function (renderer) {
        return renderer.getPDF(this.html, this.css);
    };
    return HTMLToPDFConverter;
}());
exports.HTMLToPDFConverter = HTMLToPDFConverter;
