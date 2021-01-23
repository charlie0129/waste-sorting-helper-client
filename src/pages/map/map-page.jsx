import React, { Component } from 'react'
import { View, Map } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { AtMessage } from 'taro-ui'
import { setGlobalData, getGlobalData } from '@/utils/index'
import './map-page.scss'

export default class MapPage extends Component {
    constructor(props) {
        super(props)
        // this.state = {}
        this.state = {
            // TODO: Update this with user's location
            longitude: 116.283188,
            latitude: 40.1564221,
            showScale: true,
            showCompass: true,
            markers: []
        }
    }

    componentWillMount() {
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    componentDidShow() {
        Taro.request({
            url: getGlobalData('server') + '/get-dustbin-list',
            method: 'GET',
            data: {},
            dataType: 'json',
            success: (res) => {
                console.log('get-dustbin-list succeeded')
                console.log(res.data)
                const newMarkerList = []
                res.data.forEach((element, index, array) => {

                    newMarkerList.push({
                        id: element.id,
                        longitude: element.longitude,
                        latitude: element.latitude,
                        title: element.name,
                        iconPath: 'https://3gimg.qq.com/lightmap/xcx/demoCenter/images/Marker1_Activated@3x.png'
                    })
                })

                this.setState((state) => ({
                    markers: newMarkerList
                }))
            },
            fail: (res) => {
                console.log('request failed')
                console.log(res)
                Taro.atMessage({
                    message: '获取积分出错',
                    type: 'error'
                })
            }
        })
    }

    componentDidHide() {
    }

    render() {
        return (
            <View className='map-page'>
                <AtMessage />
                <Map
                    className='dustbin-map'
                    longitude={this.state.longitude}
                    latitude={this.state.latitude}
                    showScale={this.state.showScale}
                    showCompass={this.state.showCompass}
                    markers={this.state.markers}
                />
            </View>
        )
    }
}
