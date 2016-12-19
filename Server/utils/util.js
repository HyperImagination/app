var multer = require('multer');

var util = {
    upload: function() {
        //存储配置
        var storage = multer.diskStorage({
            //设置上传后文件路径，手动创建"public/uploads/"
            destination: function(req, file, cb) {
                cb(null, '/public/uploads/')
            },
            //给上传文件重命名，获取添加后缀名
            filename: function(req, file, cb) {
                var fileFormat = (file.originalname).split(".");
                cb(null, file.fieldname + '-' + Date.now() + "." + fileFormat[fileFormat.length - 1]);
            }
        });
        //添加配置文件到muler对象。
        var uploadFile = multer({ storage: storage });
        return uploadFile;
    }
};

// util.upload = function(options) {
//     //存储配置
//     var storage = multer.diskStorage({
//         //设置上传后文件路径，手动创建"public/uploads/"
//         destination: function(req, file, cb) {
//             cb(null, '/public/uploads/')
//         },
//         //给上传文件重命名，获取添加后缀名
//         filename: function(req, file, cb) {
//             var fileFormat = (file.originalname).split(".");
//             cb(null, file.fieldname + '-' + Date.now() + "." + fileFormat[fileFormat.length - 1]);
//         }
//     });
//     //添加配置文件到muler对象。
//     var uploadFile = multer({ storage: storage });

//     console.log('==', uploadFile);

//     return uploadFile;
// };

module.exports = util;

/**
 * app.post('/profile', upload.single('avatar'), function (req, res, next) {
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
})

app.post('/photos/upload', upload.array('photos', 12), function (req, res, next) {
  // req.files is array of `photos` files
  // req.body will contain the text fields, if there were any
})

var cpUpload = upload.fields([{ name: 'avatar', maxCount: 1 }, { name: 'gallery', maxCount: 8 }])
app.post('/cool-profile', cpUpload, function (req, res, next) {
  // req.files is an object (String -> Array) where fieldname is the key, and the value is array of files
  //
  // e.g.
  //  req.files['avatar'][0] -> File
  //  req.files['gallery'] -> Array
  //
  // req.body will contain the text fields, if there were any
})
 */
