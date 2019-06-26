Node.js内置错误类型
+ Error 
+ SyntaxError 
+ ReferenceError
+ TypeError
+ URIErrror
+ AssertError
Error对象的常见属性：
+ name
+ message 
+ statck
+ constructor

V8
+ captrueStackTrace()
+ prepareStackTrace()
+ stackTraceLimit // 设置stack行数


Long Stack Trace
[trace](https://github.com/AndreasMadsen/trace)
[longjohn](https://github.com/mattinsler/longjohn)
+ setTimeout setInterval setImmediate
+ nextTick nextDoomainTick
+ EventEmitter.addEventListener
+ EventEmitter.on
+ Ajax XHR

[V8的Turbofan的性能特点将如何对我们优化的方式产生影响](https://www.cnblogs.com/jaxu/p/8413241.html)

优化
+ try 里面少写代码，多用函数代替
+ 少用delete
+ 少用arguments
