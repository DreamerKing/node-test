const fs = require('fs');
const profiler = require('v8-profiler');
const co = require('co');
const Promise = require('bluebird');

function* A() {
    return yield Promise.resolve("A");
}

function* B() {
    return yield * A();
}

co(function* asyncBluebirdWrap() {
    const start = Date.now();
    profiler.startProfiling();
    while (Date.now() - start < 10000) {
        yield * B();
    }
    const profile = profiler.stopProfiling();
    profile.export()
        .pipe(fs.createWriteStream('co-bluebird.json'))
        .on("finish", () => {
            profile.delete();
            console.log("co-bluebird.json export success.")
        })
})