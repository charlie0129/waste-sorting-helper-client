import React, { Component } from 'react'
import { View, Map } from '@tarojs/components'
import './map-page.scss'

export default class MapPage extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.data = {
        longitude: 116.283188,
        latitude: 40.1564221,
        showScale: true,
        showCompass: true,
        markers: [
            {
                id: 1,
                longitude: 116.283188,
                latitude: 40.1564221,
                title: '北京邮电大学雁南',
                iconPath: 'https://3gimg.qq.com/lightmap/xcx/demoCenter/images/Marker1_Activated@3x.png',
            }
        ]
    }
  }

  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    return (
      <View className="map-page">
        <Map
          longitude={this.data.longitude}
          latitude={this.data.latitude}
          showScale={this.data.showScale}
          showCompass={this.data.showCompass}
          markers={this.data.markers}
        />
      </View>
    )
  }
}
