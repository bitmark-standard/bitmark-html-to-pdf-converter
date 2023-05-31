#!/usr/bin/env node

/*!
 * Get More Brain bitmark-JSON to HTML converter by Bit&Black
 * Officially under the umbrella of the bitmark Association 
 */

const { Application } = require("bitandblack-console/src/Application");
const { HTMLConvertCommand } = require("../src/Commands/HTMLConvertCommand");

const application = new Application("<info>bitmark HTML</info> to <info>PDF</info> converter.");
application
    .addCommand(new HTMLConvertCommand())
    .run()
;