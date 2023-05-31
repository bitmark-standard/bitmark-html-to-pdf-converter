/*!
 * Bit&Black bitmark JSON to HTML converter.
 *
 * @copyright Copyright (c) Bit&Black on behalf of Get More Brain Ltd
 * @author Tobias Köngeter <hello@bitandblack.com>
 * @link https://www.bitandblack.com
 */

import { ConsoleInput } from "bitandblack-console/src/Console/ConsoleInput";
import { ConsoleOutput } from "bitandblack-console/src/Console/ConsoleOutput";
import { HTMLConvertCommand } from "../../src/Commands/HTMLConvertCommand";

it("Throws error message", async () => {
    const htmlConvertCommand = new HTMLConvertCommand();
    let message = null;
    const output = process.stdout.write = jest.fn();

    try {
        htmlConvertCommand.execute(
            new ConsoleInput(),
            new ConsoleOutput()
        );
    } catch (error: unknown) {
        if (error instanceof Error) {
            message = error.message;
        }
    }

    expect(message)
        .toEqual(`The "input" argument does not exist.`)
    ;

    expect(output.mock.calls[0][0])
        .toBe("Starting conversion now.\n")
    ;
});