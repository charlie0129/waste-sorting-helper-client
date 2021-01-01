import React, { Component } from 'react'
import { View, Text } from '@tarojs/components'
import ActionFloor from '@/components/navigation/action-floor'
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
    }
  }
  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    return (
      <View className="home-page">
        <view>
          <ActionFloor actions={this.state.actionList} />
        </view>
      </View>
    )
  }
}
