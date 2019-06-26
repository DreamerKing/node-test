const obj = {};
function c() {
    console.log("c");
    Error.captureStackTrace(obj, b);//隐藏错误细节，优化错误栈
   // console.trace();
}

function b() {
    console.log("b");
    c();
    //console.trace();
}

function a() {
    console.log("a");
    b();
}

a();

console.log(obj.stack)

