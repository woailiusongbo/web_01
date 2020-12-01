$(function () {
    layui.form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '请输入1~6之间的字符!'
            }
        }
    })
    //获取数据
    initUserInfo()
    function initUserInfo(cb) {
        var url = '/my/userinfo';
        $.ajax({
            url: url,
            type: 'get',
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg('获取信息失败');
                }
                console.log(res.data);
                //利用 layui.form 渲染数据 注意name名字要和data数据属性相同
                layui.form.val('formUserInfo', res.data);
                //如果没有修改用户信息就不调用cb函数
                //修改了用户信息后把最新的用户信息渲染的页面
                cb && cb(res.data);
            }
        })
    }
    //重置用户信息
    $("#btnReset").on("click", function (e) {
        e.preventDefault();
        initUserInfo();
    })
    //提交用户修改的信息
    $(".layui-form").on("submit", function (e) {
        e.preventDefault();
        var data = $(this).serialize();
        var url = '/my/userinfo';
        $.ajax({
            url: url,
            type: 'post',
            data: data,
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layui.layer.msg('更新用户信息失败！');
                }
                layui.layer.msg('更新用户信息成功！');
                // 调用修改后的用户信息函数 传入一个回调函数 此回调函数调用了渲染页面头像的函数
                initUserInfo(function (a) {
                    window.parent.renderAvatar(a);
                })
                // window.parent.gitUserInfo();
            }
        })
    })
})