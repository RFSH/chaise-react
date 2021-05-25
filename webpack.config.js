const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");


function getAppConfig (appName, folderName) {
    folderName = folderName || appName;
    return {
        name: appName,
        entry: path.join(__dirname, "src", "apps", folderName , "index.tsx"),
        output: {
            path: path.join(__dirname, "dist", folderName),
            filename: "recordset.bundle.js"
        },
        mode: process.env.NODE_ENV || "development",
        resolve: {
            extensions: [".tsx", ".ts", ".js"],
            modules: [
                path.resolve(__dirname, "src"),
                "node_modules"
            ],
            alias: {
                Components: path.resolve(__dirname, "src", "components")
            }
        },
        devServer: {
            contentBase: path.join(__dirname, "src")
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: ["babel-loader"]
                },{
                    test: /\.(ts|tsx)$/,
                    exclude: /node_modules/,
                    use: ["ts-loader"],
                },
                {
                    test: /\.(css|scss)$/,
                    use: ["style-loader", "css-loader"],
                },
                {
                    test: /\.(jpg|jpeg|png|gif|mp3|svg)$/,
                    use: ["file-loader"]
                },
            ],
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: path.join(__dirname, "src", "apps", folderName, "index.html"),
            }),
        ],
    }
}

module.exports = [
    getAppConfig("recordset"),
    getAppConfig("record")
]