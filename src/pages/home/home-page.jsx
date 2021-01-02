import React, { Component } from 'react'
import { AtButton } from 'taro-ui'
import { View } from '@tarojs/components'
import ActionFloor from '@/components/navigation/action-floor'
import NavigationService from '@/nice-router/navigation-service'
import SectionBar from '@/components/section-bar/section-bar'
import { setGlobalData, getGlobalData } from '@/utils/index'
import Listof from '@/listof/listof'
import 'taro-ui/dist/style/components/button.scss'
import './home-page.scss'

export default class HomePage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      actionList: [
        {
          id: 1,
          title: '扫码扔垃圾',
          linkToUrl: 'page:///pages/about-me/about-me-page',
        },
        {
          id: 2,
          title: '查询垃圾投放点',
          linkToUrl: 'page:///pages/about-me/about-me-page',
        },
        {
          id: 3,
          title: '查询垃圾投放记录',
        },
      ],
      // userCard: [
      //   {
      //     id: 1,
      //     title: '（用户名）',
      //     brief: '',
      //     status: '已登录',
      //     imageUrl:
      //       'https://nice-router.oss-cn-chengdu.aliyuncs.com/avatar-1.png',
      //   },
      // ],
      // userId: ''
      userCard: {},
    }
  }
  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {
    console.log('home page shown')
    // this.state.userId = getGlobalData('userId');
    // this.setState(state => ({
    //   userId: getGlobalData('userId')
    // }));

    const newUserCard = [
      {
        id: 1,
        title: '（用户名）',
        brief: '学号：' + getGlobalData('userId') + '\n积分：' + 666,
        status: '已登录',
        imageUrl:
          'https://nice-router.oss-cn-chengdu.aliyuncs.com/avatar-1.png',
      },
    ]
    console.log(newUserCard)

    this.setState((state) => ({
      userCard: newUserCard,
    }))
  }

  componentDidHide() {}

  loginHandler = () => {
    NavigationService.navigate('/pages/login/login-page')
  }

  render() {
    return (
      <View className="home-page">
        <view>
          {getGlobalData('userId') === '' && (
            <AtButton className="primary" onClick={this.loginHandler}>
              登录
            </AtButton>
          )}
          {getGlobalData('userId') !== '' && (
            <Listof
              list={this.state.userCard}
              displayMode="big-card"
            />
          )}
        </view>
        <view>
          <ActionFloor actions={this.state.actionList} />
        </view>
      </View>
    )
  }
}
