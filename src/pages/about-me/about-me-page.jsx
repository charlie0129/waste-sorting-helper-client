import React, { Component } from 'react'
import { View } from '@tarojs/components'
import Listof from '@/listof/listof'
import NavigationLineItem from '@/components/navigation/navigation-line-item'
import './about-me-page.scss'

export default class AboutMe extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // userCredit: 23,
      // userId: 34,
      userCard: [
        {
          id: 1,
          title: '姜洪烨',
          brief: '学号：' + '2019211915' + '\n积分：' + '34',
          status: '已登录',
          imageUrl: 'https://nice-router.oss-cn-chengdu.aliyuncs.com/avatar-1.png'
        }
      ],
      otherOptions: [
        {
          id: 2,
          title: '查询详细垃圾投放记录'
        }
      ]
    };
    
  }

  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    return (
      <View className="me-page">
        <view>
          <Listof list={this.state.userCard} displayMode='big-card' />
        </view>
        <view>
          <NavigationLineItem title='查询详细垃圾投放记录' />
        </view>
      </View>
    )
  }
}
