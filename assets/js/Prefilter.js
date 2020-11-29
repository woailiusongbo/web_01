$.ajaxPrefilter(function (value) {
    value.url = 'http://ajax.frontend.itheima.net' + value.url;
})