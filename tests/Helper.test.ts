/*!
 * Get More Brain bitmark-JSON to HTML converter by Bit&Black
 * Officially under the umbrella of the bitmark Association 
 */

import { fileCanBeUsed, isCommandAvailable } from "../src/Helpers";

it("Can read files", async () => {
    const file1 = "./tests/Helper.test.ts";
    const fileCanBeUsed1 = fileCanBeUsed(file1);

    expect(fileCanBeUsed1)
        .toBe(true)
    ;

    const file2 = "./tests/Helper.test.ts_MISSING";
    const fileCanBeUsed2 = fileCanBeUsed(file2);

    expect(fileCanBeUsed2)
        .toBe(false)
    ;
});

it("Can detect commands", async () => {
    const command1 = "ls";
    const isCommandAvailable1 = isCommandAvailable(command1);

    expect(isCommandAvailable1)
        .toBe(true)
    ;

    const command2 = "command_not_existing";
    const isCommandAvailable2 = isCommandAvailable(command2);

    expect(isCommandAvailable2)
        .toBe(false)
    ;
});