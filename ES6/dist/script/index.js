require.config({
    baseUrl: '',
    paths: {
        'jquery': ['https://cdn.bootcdn.net/ajax/libs/jquery/3.5.1/jquery', './lib/jquery-1.8.3'],
        'main': './script/main',
        'common': './script/common',
        'mePublic': './script/mePublic'
    }
})

require(['main']);