$(function () {
    // 1 校验用户输入的密码
    layui.form.verify({
        // 匹配密码必须在1~6之间
        pwd: [/^[\S]{6,12}$/, '密码必须在1~6之间'],
        // 匹配当前的新密码 与 原密码是否相等
        samePwd: function (value) {
            if (value === $('[name=oldPwd]').val()) {
                return ('新旧密码不能相同');
            }
        },
        // 匹配当前确认密码 与 新密码是否一致
        oldPwd: function (value) {
            if (value !== $('[name=newPwd]').val()) {
                return ('两次密码不一致');
            }
        }
    })
    // 2 发起请求 更改用户密码
    $(".layui-form").on("submit", function (e) {
        e.preventDefault();
        var data = $(this).serialize();
        var url = '/my/updatepwd';
        $.ajax({
            type: 'post',
            url: url,
            data: data,
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    return layui.layer.msg(res.message);
                }
                layui.layer.msg('更新密码成功！');
                $(".layui-form")[0].reset();
            }
        })
    })

})