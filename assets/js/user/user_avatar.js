$(function () {
    // <1> 定义裁剪区 图片
    var $image = $('#image')
    const options = {
        aspectRatio: 1,
        preview: '.img-preview'
    }
    $image.cropper(options);
    // <2> 上传文件
    $("#btnChooseImage").on("click", function () {
        $("#iptAvatar").click();
    })
    $("#iptAvatar").on("change", function (e) {
        //获取用户上传的照片
        var files = e.target.files;
        // console.log(files[0]);
        if (files.length === 0) {
            return layui.layer.msg('请选择照片');
        }
        //把用户图片转化为url路径
        var file = files[0];
        var imgUrl = URL.createObjectURL(file);
        // console.log(imgUrl);
        //重新定义剪裁区
        $image.cropper('destroy').attr('src', imgUrl).cropper(options);
    })
    // <3> 发起请求
    // Canvas 画布
    $("#btnUpload").on("click", function () {
        //得到base64格式的字符串
        var baseIMG = $image.cropper('getCroppedCanvas', {
            // 创建一个 Canvas 画布
            width: 100,
            height: 100
        }).toDataURL('image/png');
        $.ajax({
            type: 'post',
            url: '/my/update/avatar',
            data: {
                avatar: baseIMG
            },
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layui.layer.msg(res.message);
                }
                layui.layer.msg(res.message);
                //渲染页面
                window.parent.gitUserInfo();
            }
        })
    })
})