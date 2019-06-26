const fs = require('fs');
const profiler = require('v8-profiler');
const co = require('co');

function * A() {
    return yield Promise.resolve("A");
}

function * B() {
    return yield * A();
}

co(function * coWrap() {
    const start = Date.now();
    profiler.startProfiling();
    while (Date.now() - start < 10000) {
        yield * B();
    }
    const profile = profiler.stopProfiling();
    profile.export()
        .pipe(fs.createWriteStream('co2.json'))
        .on("finish", () => {
            profile.delete();
            console.log("co2.json export success.")
        })
})