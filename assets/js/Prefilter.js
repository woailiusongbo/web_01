$.ajaxPrefilter(function (value) {
    //把发送请求过来的数据以对象的形式传递过来   执行以下代码后才发给后台
    // 1 添加用户权限
    // 判断如果对象属性url的值开头以 /my 开头 
    if (value.url.startsWith('/my')) {
        // 在此对象中添加属性 headers
        value.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }
    // // 添加用户权限
    // if (value.url.indexOf('/my') !== -1) {
    //     value.headers = {
    //         Authorization: localStorage.getItem('token') || ''
    //     }
    // }
    // 2 添加根目录
    // 把此对象的url属性修改为 = 'http://ajax.frontend.itheima.net' + 原属性值 
    value.url = 'http://ajax.frontend.itheima.net' + value.url;
    //  3 强制退出
    //在此对象中添加 complete 属性
    value.complete = function (res) {
        console.log(res);
        //利用res的responseJSON 去判断用户登录是否合法
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            // 不合法
            //1 清空本地存储的用户信息
            localStorage.removeItem('token');
            //2 跳转到登录页面
            window.location = '/login.html';
        }
    }
})

