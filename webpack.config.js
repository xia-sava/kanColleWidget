var path = require("path");
var webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = [
    {
        mode: process.env.NODE_ENV || "development",
        optimization: {
            minimize: process.env.NODE_ENV == "production",
        },
        entry: {
            background: "./src/js/entrypoints/background.ts",
            popup:      "./src/js/entrypoints/popup.ts",
            options:    "./src/js/entrypoints/options.ts",
            capture:    "./src/js/entrypoints/capture.ts",
            dmm:        "./src/js/entrypoints/dmm.ts",
            kcs2:       "./src/js/entrypoints/kcs2.ts",
            dsnapshot:  "./src/js/entrypoints/dsnapshot.ts",
        },
        output: {
            path: path.resolve(__dirname, "./dest/js"),
            filename: "[name].js"
        },
        module: {
            rules: [
                {
                    test: /\.ts$/,
                    loader: "ts-loader",
                    options: { appendTsSuffixTo: [/\.vue$/] }
                },
                {
                    test: /\.vue$/,
                    loader: "vue-loader",
                }
            ]
        },
        resolve: {
            extensions: [".ts", ".js", ".vue"]
        },
        plugins: [
            new VueLoaderPlugin(),
            new webpack.DefinePlugin({'NODE_ENV': JSON.stringify(process.env.NODE_ENV)}),
        ],
        performance: {
            hints: false,
        },
    },
    {
        mode: process.env.NODE_ENV || "development",
        entry: {
            common:    "./src/css/entrypoints/common.scss",
            options:   "./src/css/entrypoints/options.scss",
            popup:     "./src/css/entrypoints/popup.scss",
            dsnapshot: "./src/css/entrypoints/dsnapshot.scss",
        },
        output: {
            path: path.resolve(__dirname, "dest/css"),
        },
        module: {
            rules: [
                {
                    test: /\.s?css$/,
                    use: [
                        {loader: MiniCssExtractPlugin.loader},
                        // {loader: "style-loader"},
                        {loader: "css-loader"},
                        {loader: "sass-loader"},
                    ],
                },
                // {
                //     test: /\.(eot|woff|woff2|ttf|svg)$/,
                //     loaders: ['url-loader']
                // },
            ]
        },
        resolve: {
            extensions: [".scss", ".css"]
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: "[name].css",
                path: path.resolve(__dirname, "dest/css"),
            }),
        ],
    }
];

