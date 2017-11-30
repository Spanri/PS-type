var webpack = require('webpack');
const path = require('path');
const fs = require('fs');

var nodeModules = {};
fs.readdirSync('node_modules')
	.filter(function(x) {
		return ['.bin'].indexOf(x) === -1;
	})
	.forEach(function(mod) {
		nodeModules[mod] = 'commonjs ' + mod;
    });
    
module.exports = {
    entry: {
        "www": "./src/www.js",
        "app": "./src/app.js",
        "helpers": "./src/helpers.js",
        "routes/index": "./src/routes/index.js",
        "routes/api/index": "./src/routes/api/index.js",
        "routes/api/v1/index": "./src/routes/api/v1/index.js",
        "routes/api/v1/auth": "./src/routes/api/v1/auth.js",
        "routes/api/v1/data": "./src/routes/api/v1/data.js",
        "routes/api/v1/map": "./src/routes/api/v1/map.js",
        "models/user": "./src/models/user.js"
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
    },
    externals: nodeModules,
    target: 'node',
    node: {
        console: false,
        global: false,
        process: false,
        Buffer: false,
        __filename: true,
        __dirname: true
    },
    // resolve: {
    //     extensions: [
    //         ".js",
    //         ".json",
    //         ".css"
    //     ],
    // },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude:/(node_modules)/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015','stage-0']
                }
            },
            {
                test: /\.json$/,
                loader: "json"
            }
        ]
    }
};
