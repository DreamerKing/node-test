const foo = function(){
    throw new Error("error!");
}

const bar = function(){
    setTimeout(foo);
}

bar();
// 异步回调错误栈丢失
