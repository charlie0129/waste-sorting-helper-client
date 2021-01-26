import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import Listof from '@/listof/listof'
import { setGlobalData, getGlobalData } from '@/utils/index'
import NavigationService from '@/nice-router/navigation-service'
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


  }

  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  logoutHandler() {
      setGlobalData('userName', '')
      setGlobalData('userId', '')
      setGlobalData('userCredit', '')
      NavigationService.navigate('/pages/home/home-page')
      // Taro.navigateBack({
      //     delta: 1
      // })
  }

  render() {
    return (
      <View className="me-page">
        {/*<view>*/}
        {/*  <Listof list={this.state.userCard} displayMode="big-card" />*/}
        {/*</view>*/}
        <View className="me-page-body">
          {/*{lineItemNavigatorList.map((it) => (*/}
          {/*  <NavigationLineItem key={`${it.id}_${it.code}`} {...it} />*/}
          {/*))}*/}
            <AtButton type="primary" onClick={this.logoutHandler}>
                退出登录
            </AtButton>
        </View>
      </View>
    )
  }
}
