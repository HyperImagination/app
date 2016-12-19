var express = require('express')
var router = express.Router()
var multer = require('multer');

//存储配置
var storage = multer.diskStorage({
    //设置上传后文件路径，手动创建"public/uploads/"
    destination: function(req, file, cb) {
        cb(null, 'public/uploads/')
    },
    //给上传文件重命名，获取添加后缀名
    filename: function(req, file, cb) {
        var fileFormat = (file.originalname).split(".");
        cb(null, file.fieldname + '-' + Date.now() + "." + fileFormat[fileFormat.length - 1]);
    }
});

//添加配置文件到muler对象。
var uploadFile = multer({ storage: storage });

var fieldsUpload = uploadFile.fields([{ name: 'jszz', maxCount: 1 }, { name: 'jszf', maxCount: 1 }]);

//权限验证（未在指定路由的请求，服务器会直接404）
const URL_POOL = ['/', '/fields']
router.all(URL_POOL, function(req, res, next) {
    if (req.method !== 'OPTIONS') {
        if (1) {
            next();
        } else {
            res.sendStatus(401);
        }
    } else {
        next();
    }
});

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('This is a get requset!')
})

router.post('/fields', fieldsUpload, function(req, res, next) {
    console.log('files:::', req.files)
    res.json(req.files);
})

module.exports = router;


// var express = require('express');
// var router = express.Router();
// var util = require('../utils/util.js');

// var uploadFile = util.upload();

// var singleUpload = uploadFile.single('sfsz');

// var arrayUpload = uploadFile.array('sfzz', 1);

// var fieldsUpload = uploadFile.fields([{ name: 'jszz', maxCount: 1 }, { name: 'jszf', maxCount: 1 }]);

// //权限验证（未在指定路由的请求，服务器会直接返回404）
// const URL_POOL = ['/', '/single', '/array', '/fields']
// router.all(URL_POOL, function(req, res, next) {
//     if (req.method !== 'OPTIONS') {
//         if (1) {
//             next();
//         } else {
//             res.sendStatus(401);
//         }
//     } else {  
//         next();
//     }
// });

// router.get('/', function(req, res, next) {
//     res.send('This is a get requset')
// })

// router.post('/single', singleUpload, function(req, res, next) {
//     console.log('======req.file======', req.file)
//     res.json(req.files);
// })

// router.post('/array', arrayUpload, function(req, res, next) {
//     console.log('======req.files======', req.files)
//     res.json(req.files);
// })

// router.post('/fields',fieldsUpload, function(req, res, next) {
//     console.log('======req.files======')
//     res.json(req.files);
// })

// module.exports = router;
