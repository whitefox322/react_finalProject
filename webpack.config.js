const webpack = require("webpack");
const path = require("path");
const ExtractTextPlugin = require ('extract-text-webpack-plugin');

module.exports = {
    entry: [
        "babel-polyfill",
        "react-hot-loader/patch",
        "./src/main.jsx"
    ],
    output: {
        filename: "assets/js/bundle.min.js",
        publicPath: "/",
        path: path.join(__dirname, "/public/")
    },

    devtool: "source-map",

    devServer: {
        hot: true,
        stats: {
            progress: true,
            colors: true
        },
        port: 8080,
        historyApiFallback: {
            index: 'index.html'
        },
        contentBase: path.join(__dirname, "public"),
        host: "localhost"
    },

    resolve: {
        extensions: [".js", ".jsx", ".json", ".scss"],
        modules: ["src", "node_modules"],
    },

    module: {
        rules: [
            {
                test: /\.(ttf|woff|woff2|eot)$/,
                loaders: ["file-loader"]
            },
            {
                test: /\.jsx?$/,
                loaders: ["react-hot-loader/webpack", "babel-loader"],
                include: path.resolve("src")
            },
            {
                test: /\.scss$/,
                use: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader?modules=true&sourceMap=true', 'sass-loader'],
                }))
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader?modules=false&sourceMap=false'],
                })
            },
            {
                test: /\.less$/,
                use: [{
                    loader: "style-loader"
                }, {
                    loader: "css-loader"
                }, {
                    loader: "less-loader"
                }]
            },
            {
                test: /\.(png|jpe?g|svg|gif)$/,

                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 15000,
                        name: '[name].[hash].[ext]',
                    },
                },
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new ExtractTextPlugin("assets/css/bundle.min.css"),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        })
    ]
};