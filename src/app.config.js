export default {
    pages: [
        'pages/home/home-page',
        'pages/about-me/about-me-page',
        'pages/login/login-page',
        'pages/history/history-page',
        'pages/map/map-page',
        'pages/register/register-page',
        'pages/category-data/category-data-page',
        'pages/search/search-page'
    ],
    window: {
        backgroundTextStyle: 'light',
        navigationBarBackgroundColor: '#fff',
        navigationBarTitleText: 'WeChat',
        navigationBarTextStyle: 'black',
        enablePullDownRefresh: true
    },
    tabBar: {
        color: '#666',
        selectedColor: '#6e44cc',
        backgroundColor: '#fafafa',
        borderStyle: 'black',
        list: [
            {
                pagePath: 'pages/home/home-page',
                iconPath: './assets/icons/ios-home.png',
                selectedIconPath: './assets/icons/ios-home.png',
                text: '首页'
            },
            {
                pagePath: 'pages/search/search-page',
                iconPath: './assets/icons/ios-search.png',
                selectedIconPath: './assets/icons/ios-search.png',
                text: '查询'
            }
        ]
    },
    "permission": {
        "scope.userLocation": {
            "desc": "你的位置信息仅用于展示附近的垃圾投放点，并且不会被上传至任何位置"
        }
    }
}
