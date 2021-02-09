// 模块引入
require.config({
    baseUrl: '',
    paths: {
        "mePublic": './script/mePublic',
        "common": './script/common',
        "main": './script/main',
        "jquery": ['https://cdn.bootcdn.net/ajax/libs/jquery/3.5.1/jquery', './lib/jquery-1.8.3']
    }
});
require(['main']);