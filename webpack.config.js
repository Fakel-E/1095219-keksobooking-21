const path = require("path");

module.exports = {
    entry: [
        "./js/const.js",
        "./js/util.js",
        "./js/debounce.js",
        "./js/upload.js",
        "./js/pin.js",
        "./js/advert.js",
        "./js/map.js",
        "./js/form.js",
        "./js/load.js",
        "./js/movepin.js",
        "./js/filter.js",
        "./js/main.js"
    ],
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname),
        iife: true
    },
    devtool: false
}
