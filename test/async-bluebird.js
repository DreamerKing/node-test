const fs = require('fs');
const profiler = require('v8-profiler');
const Promise = require('bluebird');

async function A() {
    return await Promise.resolve("A");
}

async function B() {
    return await A();
}

(async function asyncBluebirdWrap() {
    const start = Date.now();
    profiler.startProfiling();
    while (Date.now() - start < 10000) {
        await B();
    }
    const profile = profiler.stopProfiling();
    profile.export()
        .pipe(fs.createWriteStream('async-bluebird.json'))
        .on("finish", () => {
            profile.delete();
            console.log("async-bluebird.json export success.")
        })
})()