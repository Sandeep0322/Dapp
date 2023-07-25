
path = require('path');
webpack = require('webpack');


module.exports = {
    mode: "development",
    devtool: "inline-source-map",
    entry: {
        main: "./src/index.ts",
    },
    plugins: [
        new webpack.ProvidePlugin({
            process: 'process/browser',
        }),
    ],
    output: {
        path: path.resolve(__dirname, './build'),
        filename: "build.js" // <--- Will be compiled to this single file
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"],
    },
    module: {
        rules: [
            {
                test: /\.(jpg|jpeg|png)$/,
                use: {
                 loader: 'url-loader'
                }
            }
        ]
    }
};