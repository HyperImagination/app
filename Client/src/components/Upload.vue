<template>
    <div class="up-box">
        <span>{{ title }}</span>
        <div class="up-fd" :style="{ backgroundImage: 'url(' + dataURL + ')' }">
            <!-- <input @change="change" type="file" accept="image/gif, image/png, image/jpg, image/jpeg" class="up-file"> -->
            <input @change="change" type="file" class="up-file">
        </div>
    </div>
</template>
<script>
export default {
    name: 'my-upload',
    data() {
        return {
            dataURL: ''
        }
    },
    props: {
        name: {
            type: String,
            required: true
        },
        title: {
            type: String,
            default: ''
        }
    },
    methods: {
        change(e) {
            //判断浏览器是否支持FileReader接口  
            if (typeof FileReader == 'undefined') {
                alert("您的设备不支持【FileReader API】");
                return false
            }
            const file = e.target.files[0]
            // console.log('-------选择的文件对象[<input>]------', e.target);
            // console.log('-------选择的文件列表[FileList]------', e.target.files); //FileList {0: File, length: 1}
            // console.log('-------选择的文件[File]------', file);
            //读取
            readFile(file);
            let that = this;
            //自定义方法
            function readFile(file) {
                //检验是否为图像文件  
                if (!/image\/\w+/.test(file.type)) {
                    alert("请上传 【图片】文件！");
                    return false;
                }
                var reader = new FileReader();
                //将文件以DataURL形式读入页面  
                reader.readAsDataURL(file);
                //将文件以BinaryString形式读入页面  
                // reader.readAsBinaryString(file);
                //将文件以Text形式读入页面  
                // reader.readAsText(file);
                //读取成功
                reader.onload = e => {
                    console.log('-------读取的文件[FileReader]------', e.target); //result:"data:image/jpeg;base64,/9j/4A.....
                    // console.log('-------读取的文件[result]------', e.target.result);
                    that.dataURL = e.target.result
                    // that.dataURL = this.result(注意：错误)
                    that.$emit('change', {
                        name: that.name,
                        file
                    })
                }
            }
        }
    }
}
</script>
<style>
.up-box {
    box-sizing: border-box;
    margin: 2px 2%;
    display: inline-block;
    height: 150px;
    width: 46%;
    border-radius: 2px;
    float: left;
    display: flex;
    flex-direction: column;
    background-color: #fff;
}

.up-fd {
    flex: 1;
    height: 1px;
    position: relative;
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
    background-color: #E4E4E4;
}

.up-file {
    display: block;
    height: 100%;
    width: 100%;
    opacity: 0;
}
</style>
