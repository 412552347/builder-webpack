const path = require('path');
const webpack = require('webpack');
// 清除template中的dist
const rimraf = require('rimraf');
const Mocha = require('mocha');

const mocha = new Mocha({
    timeout: '10000ms'
});

// 进入template目录
process.chdir(path.join(__dirname, './template'));

rimraf('./dist', () => {
    const prodConfig = require('../../lib/webpack.prod');

    webpack(prodConfig, (err, stats) => {
        if(err) {
            console.log(err);
            process.exit(2);
        }

        console.log(stats.toString({
            color: true,
            modules: false,
            children: false,
        }));

        console.log('webpack build success, begin run test.')

        mocha.addFile(path.join(__dirname, 'html-test.js'));
        mocha.addFile(path.join(__dirname, 'css-js-test.js'));

        mocha.run();
    })
});
