const Encore = require("@symfony/webpack-encore");

if (!Encore.isRuntimeEnvironmentConfigured()) {
    Encore.configureRuntimeEnvironment(process.env.NODE_ENV || "dev");
}

Encore
    .setOutputPath("dist/")
    .setPublicPath("./")
    .setManifestKeyPrefix("/")
    .addStyleEntry("default-style", "./src/scss/default-style.scss")
    .cleanupOutputBeforeBuild()
    .disableSingleRuntimeChunk()
    .enableBuildNotifications()
    .enableSourceMaps(false)
    .enableVersioning(false)
    .enableSassLoader()
    .enablePostCssLoader()
;

const config = Encore.getWebpackConfig();

config.optimization = {
    minimize: false
};

module.exports = config;