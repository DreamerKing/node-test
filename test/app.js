const crypto = require('crypto');
const Paloma = require('paloma');
const app = new Paloma();
const users = {};

app.route({ method: 'GET', path: '/newUser', controller(ctx){
    let userName = ctx.query.userName || '';
    userName = userName.replace(/[!@#$%^&*]/g, '')
    const pwd = ctx.query.password || '';
    if(!userName || !pwd ){
        ctx.throw(400);
    }
    const salt = crypto.randomBytes(128).toString('base64');
    const hash = crypto.pbkdf2Sync(pwd, salt, 10000, 64, 'sha512').toString('hex');
    users[userName] = { salt, hash};
    ctx.status = 204;
}});

app.route({ method: 'GET', path: '/auth', controller(ctx) {
        let userName = ctx.query || '';
        userName = userName.replace(/[!@#%&^*]/g, '');
        const pwd = ctx.query.password || '';
        if(!userName && !pwd && !users[userName]){
            ctx.throw(400);
        }
        const hash = crypto.pbkdf2Sync(pwd, users[userName].salt, 10000, 64, 'sha512').toString('hex');
        if(users[userName].hash === hash){
            ctx.status = 204;
        } else {
            ctx.throw(403);
        }
    }
});

app.listen(3000);
