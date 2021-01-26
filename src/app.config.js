export default {
  pages: [
    'pages/home/home-page',
    'pages/about-me/about-me-page',
    'pages/login/login-page',
    'pages/history/history-page',
    'pages/map/map-page',
    'pages/register/register-page'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black',
    enablePullDownRefresh: true,
  },
  tabBar: {
    color: '#666',
    selectedColor: '#6e44cc',
    backgroundColor: '#fafafa',
    borderStyle: 'black',
    list: [
      {
        pagePath: 'pages/home/home-page',
        iconPath: './assets/icons/icon_home_n@2x.png',
        selectedIconPath: './assets/icons/icon_home_s@2x.png',
        text: '首页',
      },
      {
        pagePath: 'pages/about-me/about-me-page',
        iconPath: './assets/icons/icon_me_n@2x.png',
        selectedIconPath: './assets/icons/icon_me_s@2x.png',
        text: '我的',
      },
    ],
  }
}
