$(function () {
    //// 1 获取用户信息
    gitUserInfo();
    function gitUserInfo() {
        var url = '/my/userinfo';
        $.ajax({
            type: 'get',
            url: url,
            headers: {
                Authorization: localStorage.getItem('token') || '',
            },
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg('获取用户信息失败')
                }
                renderAvatar(res.data);
            }
        })
    }
    //// 2 渲染用户名称/头像
    function renderAvatar(value) {
        // console.log(value);
        //获取用户名称
        var name = value.nickname || value.username;
        //设置欢迎文本
        $("#welcome").html("欢迎&nbsp&nbsp" + name);
        //获取头像图片
        if (value.user_pic !== null) {
            //渲染头像
            $(".layui-nav-img").attr("src", value.user_pic).show();
            $(".text-avatar").hide();
        } else {
            // 渲染文本
            $(".layui-nav-img").hide();
            var arr = name[0].toUpperCase();
            $(".text-avatar").html(arr).show();
        }
    }
    //// 3 实现退出
    $("#out").on("click", function () {
        layui.layer.confirm("确定退出登录?", { icon: 3, title: '提示' }, function (value) {
            localStorage.removeItem('token');
            window.location = '/login.html';
            layui.layer.close(value);
        })
    })
})