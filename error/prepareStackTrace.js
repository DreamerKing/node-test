Error.prepareStackTrace = function(error, callSites){
    return error.toString() + "\n" +
    callSites.map(cs => {
        return ' -> ' + cs.getFunctionName() + " ( " +
        + cs.getFileName()+ ":" +
        + cs.getLineNumber() + ":" +
        + cs.getColumnNumber() + ")"
    }).join("\n");
}

function c(){
    throw new Error();
}

function b() {
    c();
}

function a() {
    b();
}

try {
    a()
} catch(err){
    console.log(err.stack);
}