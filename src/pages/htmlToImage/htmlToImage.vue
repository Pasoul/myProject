<template>
    <div class="htmlToImage container">
        <div class="row">
            <div class="col-sm-12">
                <h3 style="text-align: left">本地生成图片上传</h3>
            </div>
            <ul class="nav nav-tabs" role="tablist">
                <li class="demoTabs active">
                    <a href="#meterManDetailForm" role="tab" data-toggle="tab" aria-expanded="false">生成图片</a></li>
                <li class="demoTabs" id="taggle" style="">
                    <a href="#fundsAccountForm" id="lookPhont" role="tab" data-toggle="tab" aria-expanded="true">查看下载图片</a>
                </li>
            </ul>
        </div>
        <div class="tab-content">
            <div class="tab-pane active" id="meterManDetailForm">
                <div class="row">
                    <div class="col-sm-6">
                        <div class="form-group">
                            <label for="userName" class="col-md-12 control-label">姓名</label>
                            <div class="col-sm-12">
                                <input type="text" v-model="userName" class="form-control" id="userName" name="userName" placeholder="姓名">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="works" class="col-md-12 control-label">作品</label>
                            <div class="col-sm-12">
                                <input type="text" class="form-control" id="works" name="works" placeholder="作品" v-model="opus">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="bussenissName" class="col-md-12 control-label">比赛名称</label>
                            <div class="col-sm-12">
                                <input type="text" class="form-control" id="bussenissName" name="bussenissName" placeholder="比赛名称" v-model="matchName">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="grad" class="col-md-12 control-label">奖状等级</label>
                            <div class="col-sm-12">
                                <input type="text" class="form-control" id="grad" name="grad" placeholder="奖状等级" v-model="level">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="datetimepicker" class="col-md-12 control-label">获奖时间</label>
                            <div class="col-sm-12">
                                <input type="date" class="form-control" id="datetimepicker" name="datetimepicker" placeholder="获奖时间" v-model="time">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="avatar" class="col-md-12 control-label">头像</label>
                            <div class="col-sm-12">
                                <div></div>
                                <a class="a-upload">
                                    <input multiple="" type="file" name="" id="avatar" @change="chooseImage">头像上传
                                </a>
                            </div>
                        </div>
                        <div class="row" style="text-align: right" @click="domToImage">
                            <span class="btn-inter" id="config">生成</span>
                        </div>
                    </div>
                    <div class="col-sm-6" style="min-height: 398px">
                        <div id="diploma" ref="diploma">
                            <span class="useName">{{userName}}</span>
                            <span class="works">{{opus}}</span>
                            <span class="bussiness">{{matchName}}</span>
                            <span class="grade">{{level}}</span>
                            <span class="yelar">{{time.split('-')[0]}}</span>
                            <span class="month">{{time.split('-')[1]}}</span>
                            <span class="data">{{time.split('-')[2]}}</span>
                            <div class="avatar">
                                <img :src="imgBase64Url" v-if="imgBase64Url" alt="">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="tab-pane" id="fundsAccountForm">
                <div id="view" style="width: 547px;height: 398px;margin: 0 auto;">
                </div>
                <div class="row" style="margin-top: 20px;">
                    <span class="btn-inter" id="downLoad" @click="download">下载</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    /**
     * 时间: 2017/12/26
     * 作者: pengy
     * 功能: 1.前端添加管理员信息包括（姓名，年龄，头像等） 2.将管理员信息显示在具体背景图片上，将其生成图片的形式上传后台服务器（base64格式或者文件的格式）
     * 思路: 1.将管理员信息使用定位将其设置在指定背景图片上。 2.使用html2canvas将指定div生成canvas 3.将生成的canvas用toDataUrl()进行base64编码 或者生成文件 上传（建议base64上传
     * 附加功能: 本地上传图片 进行base64编码之后回显 生成canvas之后支持本地下载
     * 压缩图片: 使用canvas API quality 值越小，所绘制出的图像越模糊 对应图片越小 根据需求设置相对应的数值
     * 依赖: https://github.com/niklasvh/html2canvas
     * @param { data } { type } { description }
     */
    import html2canvas from 'html2canvas';
    export default {
        name: '',
        extends: {},
        props: {},
        data() {
            return {
                userName: '',
                opus: '',
                matchName: '',
                level: '',
                time: '',
                imgBase64Url: ''
            }
        },
        computed: {
        },
        components: {
        },
        watch: {},
        methods: {
            chooseImage(e) {
                var file = e.target.files[0];
                var reader = new FileReader();
                reader.onload = (e) => {
                    this.imgBase64Url = e.target.result;
                }
                reader.readAsDataURL(file)
                e.target.value = '';
            },
            domToImage(){
                html2canvas(document.getElementById('diploma')).then(function(canvas) {
                    var oldCanvas = document.getElementsByTagName('canvas')[0];
                    if (oldCanvas) {
                        $(oldCanvas).remove();
                    }
                    document.getElementById('view').appendChild(canvas);
                });
            },
            download() {
                // 1.确定图片的类型  获取到的图片格式 data:image/Png;base64,......
                var type = 'image/png';
                var canvas = document.querySelector('#view canvas');
                if (!canvas){
                    return false;
                }
                // toDataUrl(type, quality) type: image/png image/jpeg image/webp quality: 图片质量，默认 0.92
                var imgData = canvas.toDataURL(type);
                // 2.如果希望浏览器自动下载图片，需要改type
                imgData = imgData.replace(type, 'image/octet-stream');
                // 3.创建a标签并下载
                var filename = new Date();
                this.saveFile(imgData, filename);

            },
            saveFile(data, filename) {
                var oA = document.createElement('a');
                oA.href = data;
                oA.download = filename;
                oA.click();
            }
        },
        created() {
        },
        mounted() {

        },
        activated() {
        }
    }

</script>

<style scoped lang="scss">
.htmlToImage{
    .a-upload{
        padding: 4px 10px;
        height: 30px;
        line-height: 20px;
        position: relative;
        cursor: pointer;
        color: #fff;
        background: #019241;
        border: 1px solid #ddd;
        border-radius: 4px;
        overflow: hidden;
        display: inline-block;
        vertical-align: middle;
    }
    .a-upload input{
        position: absolute;
        font-size: 100px;
        right: 0;
        top: 0;
        opacity: 0;
        filter: alpha(opacity=0);
        cursor: pointer;
    }
    #diploma{
        position: relative;
        width: 547px;
        min-height: 398px;
        background: url('./b.png');
        background-size: 100%;
    }
    #diploma span{
        display: inline-block;
        text-align: center;
        color: #000;
        font-weight: 600;
        font-size: 16px;
        position: absolute;
        overflow: hidden;
    }
    /**图片信息定位**/
    .useName{
        top: 136px;
        width: 64px;
        left: 52px;
    }
    .works{
        top: 177px;
        width: 112px;
        left: 181px;
    }
    .bussiness{
        top: 207px;
        left: 57px;
        width: 243px;
    }
    .grade{
        top: 205px;
        left: 426px;
    }
    .yelar{
        top: 274px;
        left: 186px;
    }
    .month{
        top: 274px;
        left: 240px;
    }
    .data{
        top: 274px;
        left: 270px;
    }
    .avatar{
        display: inline-block;
        width: 81px;
        height: 99px;
        position: absolute;
        top: 68px;
        left: 394px;
    }
    .avatar img{
        width: 100%;
        height: 100%;
    }
    .nav-tabs {
        border-bottom: 1px solid #ddd;
        margin-bottom: 20px;
    }
    .form-group{
        overflow: hidden;
        text-align: left;
    }

    .btn-inter {
        cursor: pointer;
    }
    .btn-inter {
        color: #fff;
        background-color: #01bb54;
        font-size: 12px;
        padding: 6px 15px 6px 15px;
        outline: none;
        border: none;
        border-radius: 3px;
        margin: 0 10px;
        white-space: nowrap;
    }
}

</style>