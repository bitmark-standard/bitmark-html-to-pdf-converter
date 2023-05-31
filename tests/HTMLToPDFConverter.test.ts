/*!
 * Get More Brain bitmark-JSON to HTML converter by Bit&Black
 * Officially under the umbrella of the bitmark Association 
 */

import { HTMLToPDFConverter } from "../src/HTMLToPDFConverter";
import { TestRenderer } from "./TestRenderer";

it("Can render HTML to PDF", async () => {
    const html = "<p>Hello world.</p>";
    const css = "p { color: red; }";
    const htmlToPDFConverter = new HTMLToPDFConverter(html, css);
    const renderer = new TestRenderer();
    const pdf = htmlToPDFConverter.getPDF(renderer);

    expect(pdf)
        .toEqual("Function \"getPDF\" is not implemented.")
    ;
});