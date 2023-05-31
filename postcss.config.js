const perfectionist = require("perfectionist");

module.exports = {
    plugins: [
        "autoprefixer",
        perfectionist({
            format: "expanded",
            indentSize: 4,
        }),
    ]
};
