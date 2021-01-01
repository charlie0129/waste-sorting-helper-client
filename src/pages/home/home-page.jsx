import React, { Component } from 'react'
import { View } from '@tarojs/components'
import ActionFloor from '@/components/navigation/action-floor'
import { AtButton } from 'taro-ui'
import NavigationService from '@/nice-router/navigation-service'
import { setGlobalData, getGlobalData } from '@/utils/index'
import Listof from '@/listof/listof'
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
      ],
      userCard: [
        {
          id: 1,
          title: '姜洪烨',
          brief: '学号：' + '2019211915' + '\n积分：' + '34',
          status: '已登录',
          imageUrl:
            'https://nice-router.oss-cn-chengdu.aliyuncs.com/avatar-1.png',
        },
      ],
      userId: ''
    }
  }
  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {

    this.setState(state => ({
      userId: getGlobalData('userId')
    }));
  }

  componentDidHide() {}

  loginHandler = () => {
    NavigationService.navigate('/pages/login/login-page')
  }

  render() {
    return (
      <View className='home-page'>
        <view>
          {this.state.userId === '' && (
            <AtButton className='login-button' onClick={this.loginHandler}>
              登录
            </AtButton>
          )}
          {this.state.userId !== '' && (
            <Listof list={this.state.userCard} displayMode='big-card' />
          )}
        </view>
        <view>
          <ActionFloor actions={this.state.actionList} />
        </view>
      </View>
    )
  }
}
