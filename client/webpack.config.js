let path = require('path');
let MiniCssExtractPlugin = require('mini-css-extract-plugin');

let conf = {
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, './dist/'),
        filename: 'main.js',
        publicPath: 'dist/'
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'styles.css',
        }),
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: [
                            "@babel/plugin-transform-react-jsx",
                            ["@babel/plugin-proposal-decorators", { "legacy": true }],
                            ["@babel/plugin-proposal-class-properties", { "loose": true }]
                        ]
                    }
                }
            },
            {
                test: /\.module\.css$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: process.env.NODE_ENV === 'development'
                        }
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            modules: {
                                localIdentName: '[local]__[sha1:hash:hex:7]'
                            }
                        }
                    }
                ]
            },
            {
                test: /^((?!\.module).)*css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: process.env.NODE_ENV === 'development',
                        }
                    }, 
                    'css-loader'
                ]
            }
        ]
    },
    devServer: {
        port: 3000,
        historyApiFallback: true,
        overlay: true,
        proxy: {
            '/api/**': {
                target: 'http://localhost:5000',
                secure: false,
                changeOrigin: true
            }
        }
    }
};

module.exports = conf;