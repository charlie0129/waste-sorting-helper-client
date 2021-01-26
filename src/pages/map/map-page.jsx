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
        Taro.getLocation({
            type: 'wgs84',
            success: (res) => {
                Taro.atMessage({
                    message: '已显示您附近的视图',
                    type: 'error'
                })
                this.setState({
                    longitude: res.longitude,
                    latitude: res.latitude
                })
            },
            fail: () => {
                Taro.atMessage({
                    message: '无法获取当前位置，视图可能与您所在位置不符',
                    type: 'error'
                })
            }

        })

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
                        // iconPath: 'https://3gimg.qq.com/lightmap/xcx/demoCenter/images/Marker1_Activated@3x.png'
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
                    message: '投放点信息出错',
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
