module.exports = {
    "presets": [
        [
            "@babel/preset-env",
            // {
            //     targets: {
            //         node: 'current', // for jest use es6 import
            //     },
            // }
        ],
        [
            "@babel/preset-react",
            {
                "development": "true"
            }

        ],
        

    ],
    "sourceMaps": true,
    "plugins": [
        "@babel/plugin-proposal-class-properties",
        //"transform-es2015-modules-umd" //babel-plugin-transform-es2015-modules-umd
    ]
};