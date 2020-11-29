$(function () {
    // 点击转换为登录/注册
    $("#reg").on('click', function () {
        $(".login_box").hide();
        $(".reg_box").show();
    })
    $("#login").on('click', function () {
        $(".login_box").show();
        $(".reg_box").hide();
    })
    // 验证用户输入的密码
    var form = layui.form;
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        repwd: function (value) {
            var pwd = $("#pwd").val();
            if (value !== pwd) {
                return '两次密码不一致';
            }
        }
    })
    //注册功能
    $('#form_reg').on('submit', function (e) {
        e.preventDefault();
        var data = {
            username: $('.reg_box [name=title]').val(),
            password: $('.reg_box [name=password]').val()
        }
        var url = '/api/reguser';
        $.post(url, data, function (res) {
            if (res.status !== 0) {
                return layui.layer.msg(res.message);
            }
            layui.layer.msg('注册成功,请登录');
            setInterval(function () {
                $("#login").click();
            }, 1500);
        })
    })
    //登录功能
    $("#form_login").on('submit', function (e) {
        e.preventDefault();
        console.log($(this).serialize());
        var url = '/api/login';
        $.ajax({
            url: url,
            data: $(this).serialize(),
            method: 'post',
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg('登录失败！');
                }
                layui.layer.msg('登录成功!');
                localStorage.setItem('token', res.token);
                setInterval(function () {
                    window.location = '/index.html';
                }, 800);
            }
        })
    })
})