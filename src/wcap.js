#!/usr/bin/env node

const argv = require('yargs').argv;

if(argv.timeout) {
    setTimeout(() => {
        console.error(`Timing out after --timeout=${argv.timeout}`);
        process.exit(0);
    }, +argv.timeout);
}

const Nightmare = require('nightmare');
const path = require('path');

var nightmare = new Nightmare({
    show: false,
    width: 1024,
    height: 768
});

nightmare.goto(argv._[0])
    .wait('body')
    .wait(5000)
    .evaluate(function() {
        var body = document.querySelector('body');
        return { 
            height: body.scrollHeight,
            width:body.scrollWidth
        }
    })
    .then(dimensions => {
        nightmare.viewport(argv.width ? +argv.width : dimensions.width, argv.height ? +argv.height : dimensions.height)
            .wait(5000)
            .screenshot(path.join(process.cwd(), argv.output))
            .then(() => process.exit(0));
    });
