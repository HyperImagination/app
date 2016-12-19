var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var upload = require('./routes/upload');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false })); //这只支持【form-urlencoded】而没有支持【form-data】,得用上multer处理文件上传
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 设置跨域访问（注：也可安装一个cors包解决）
app.all('*', function(req, res, next) {
    //允许带Cookie(默认情况下，Cookie不包括在CORS请求之中;另外，开发者必须在AJAX请求中打开withCredentials属性。)
    res.header("Access-Control-Allow-Credentials", true);
    //req.headers.origin
    res.header("Access-Control-Allow-Origin", '*');
    //如果浏览器请求包括Access-Control-Request-Headers字段，则Access-Control-Allow-Headers字段是必需的。
    //它也是一个逗号分隔的字符串，表明/设置 服务器支持的所有头信息字段，不限于浏览器在"预检"中请求的字段。
    res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type,Accept");
    //设置文本类型
    res.header("Content-Type", "application/json;charset=utf-8"); //text/html(上传轮播图时，结果是json字符串!)
    //定义跨域允许的http动词
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    //预检请求(Options)有效期20天（期间不用再次发出预检请求）
    res.header("Access-Control-Max-Age", 1728000);
    //服务端返回，告知网站是用何种语言或框架编写的。
    res.header("X-Powered-By", 'Nodejs Express 4.13.4');
    next();
});

/**
 * JSONP只支持GET请求，CORS支持所有类型的HTTP请求。JSONP的优势在于支持老式浏览器（比如IE10以下），以及可以向不支持CORS的网站请求数据。
 */

app.use('/upload', upload);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
