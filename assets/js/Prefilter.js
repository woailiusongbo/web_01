$.ajaxPrefilter(function (value) {
    value.url = 'http://ajax.frontend.itheima.net' + value.url;
    // 强制退出
    value.complete = function (res) {
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份验证失败!') {
            localStorage.removeItem('token');
            window.location = '/login.html'
        }
    }
})

