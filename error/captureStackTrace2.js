
/* function MyError(){
    Error.captureStackTrace(this, MyError);
    this.name = this.constructor.name;
    this.message = "You got MyError";
} */

function MyError() {
    Error.captureStackTrace(this);
    this.name = this.constructor.name;
    this.message = "You got MyError";
}

const merr = new MyError();
console.log(merr);
console.log(merr.stack);