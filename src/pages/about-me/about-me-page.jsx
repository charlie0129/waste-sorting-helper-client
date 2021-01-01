import React, { Component } from 'react'
import { View } from '@tarojs/components'
import Listof from '@/listof/listof'
import NavigationLineItem from '@/components/navigation/navigation-line-item'
import './about-me-page.scss'

const lineItemNavigatorList = [
  {
    title: '查询详细垃圾投放记录',
    icon: 'image://../../assets/icons/history@2x.png',
  },
]

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
          imageUrl:
            'https://nice-router.oss-cn-chengdu.aliyuncs.com/avatar-1.png',
        },
      ],
    }
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
          <Listof list={this.state.userCard} displayMode="big-card" />
        </view>
        <View className="me-page-body">
          {lineItemNavigatorList.map((it) => (
            <NavigationLineItem key={`${it.id}_${it.code}`} {...it} />
          ))}
        </View>
      </View>
    )
  }
}
