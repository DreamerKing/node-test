const crypto = require('crypto');
const Bluebird = require('bluebird');
const profiler = require('v8-profiler');
const fs = require('fs');
const Paloma = require('paloma');
const app = new Paloma();

app.route({ method: 'GET', path: '/encrypt', controller(ctx){
    const pwd = ctx.query.password || '';
    if(!pwd ){
        ctx.throw(400);
    }
    const salt = crypto.randomBytes(128).toString('base64');
    const hash = crypto.pbkdf2Sync(pwd, salt, 10000, 64, 'sha512').toString('hex');
    ctx.body = hash;
}});

app.route({ method: 'GET', path: '/cpuprofiler', async controller(ctx) {
    profiler.startProfiling('CPU profile');
    await Bluebird.delay(30000);
    const profile = profiler.stopProfiling();
        profile.export()
        .pipe(fs.createWriteStream(`cpuprofiler-${Date.now()}.json`))
        .on('finish', () => profile.delete());
    ctx.status = 204;
    }
});

app.listen(3001);
