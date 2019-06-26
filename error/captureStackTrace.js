const mObj = {};
Error.captureStackTrace(mObj);
console.log(mObj.stack);