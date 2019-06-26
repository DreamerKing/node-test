const fs = require('fs');
const profiler = require('v8-profiler');

async function A() {
    return await Promise.resolve("A");
}

async function B() {
    return await A();
}

(async function asyncWrap() {
    const start = Date.now();
    profiler.startProfiling();
    while (Date.now() - start < 10000) {
        await B();
    }
    const profile = profiler.stopProfiling();
    profile.export()
        .pipe(fs.createWriteStream('async.json'))
        .on("finish", () => {
            profile.delete();
            console.log("async.json export success.")
        })
})()