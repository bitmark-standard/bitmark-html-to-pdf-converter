# Get More Brain bitmark-JSON to HTML converter

Converting bitmark HTML into PDF.

## Installation

This library is made for the use with Node. Add it to your project by running `$ npm install getmorebrain-bitmark-html-pdf-converter` or `$ yarn add getmorebrain-bitmark-html-pdf-converter`. If you want to use this library as a standalone, simple download the repository. Run `$ npm install` or `$ yarn install` then to load the projects' dependencies.

## Usage

The converter can be used via CLI by running `$ bin/bitmark-json-to-html.js html:convert`.

It expects two arguments:

1. The **input** file or stream with the bitmark HTML content.
2. The **output** file where the PDF should be written to. If this argument is missing, the PDF will be displayed in the console.

So a conversion call could look like that:

```text
$ bin/bitmark-json-to-html.js html:convert /path/to/input.html /path/to/output.pdf
```

### Options

### Custom style / CSS

The `--css` option allows to add a custom stylesheet. This should be the path to an existing `css` file. If not set, the [default stylesheet](./dist/default-style.css) will be used.

### PDF Renderer

In case you want to use a custom HTML to PDF renderer, you can add its name or path with the `--renderer` option. This can be for example `vivliostyle` if this binary is available on your system, or a path like `/usr/local/AHFormatterV72/run.sh`. Per default, the converter will use PagedJS, which is included with this library.

Currently supported renderers are:

-   AH Formatter
-   PagedJS
-   Vivliostyle

### There is even more

Add the `--help` option to see all available arguments and options.

## Help

If you have any questions, feel free to contact us under `hello@bitandblack.com`.

Further information about Bit&Black can be found under [www.bitandblack.com](https://www.bitandblack.com).