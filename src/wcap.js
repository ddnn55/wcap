#!/usr/bin/env node

var Nightmare = require('nightmare'),
    vo = require('vo');
const argv = require('yargs').argv;

function * run() {
    var nightmare = new Nightmare({
        show: false,
        width: 1024,
        height: 768
    });
    var dimensions = yield nightmare.goto(argv._[0])
        .wait('body')
        .evaluate(function() {
            var body = document.querySelector('body');
            return { 
                height: body.scrollHeight,
                width:body.scrollWidth
            }
        });

    console.dir(dimensions);
    yield nightmare.viewport(dimensions.width, dimensions.height)
        .wait(1000)
        .screenshot(require('path')
            .join(process.cwd(), argv.output));

    yield nightmare.end();
}   

vo(run)(function() {
    console.log('done');
});
