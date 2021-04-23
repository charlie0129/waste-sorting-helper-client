import React, { Component } from 'react'
import { Map, View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { AtMessage } from 'taro-ui'
import { getGlobalData } from '@/utils/index'
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

    getMarkers() {
        Taro.request({
            url: getGlobalData('server') + '/api/dustbins',
            method: 'GET',
            data: {},
            dataType: 'json',
            success: (res) => {
                console.log('get-dustbin-list succeeded')
                console.log(res.data)
                const newMarkerList = []
                res.data._embedded.dustbinList.forEach((element, index, array) => {

                    newMarkerList.push({
                        id: element.id,
                        longitude: element.longitude,
                        latitude: element.latitude,
                        title: element.name,
                        alpha: element.full ? 0.5 : 1
                        // iconPath: 'https://3gimg.qq.com/lightmap/xcx/demoCenter/images/Marker1_Activated@3x.png'
                    })
                })

                this.setState((state) => ({
                    markers: newMarkerList
                }))

                this.getDistances()
            },
            fail: (res) => {
                console.log('request failed')
                console.log(res)
                Taro.atMessage({
                    message: '投放点信息获取出错',
                    type: 'error'
                })
            }
        })
    }


    getDistances() {
        let distances = []

        function Rad(d) {
            return d * Math.PI / 180.0//经纬度转换成三角函数中度分表形式。
        }

        //计算距离，参数分别为第一点的纬度，经度；第二点的纬度，经度
        function GetDistance(lat1, lng1, lat2, lng2) {
            var radLat1 = Rad(lat1)
            var radLat2 = Rad(lat2)
            var a = radLat1 - radLat2
            var b = Rad(lng1) - Rad(lng2)
            var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) +
                                            Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)))
            s = s * 6378.137// EARTH_RADIUS;
            s = Math.round(s * 10000) / 10000 //输出为公里
            //s=s.toFixed(4);
            return s
        }

        this.state.markers.forEach((element) => {
            distances.push(GetDistance(this.state.latitude, this.state.longitude, element.latitude, element.longitude))
        })

        console.log('Distances to current location: ' + distances)

        let haveNearbyStations = false

        distances.forEach((element) => {
            if (element <= 1) {
                haveNearbyStations = true
            }
        })

        if (!haveNearbyStations) {
            Taro.atMessage({
                message: '提醒：方圆 1km 内无可用的垃圾投放点',
                type: 'warning'
            })
        }
    }


    componentDidShow() {


        Taro.getLocation({
            type: 'wgs84',
            success: (res) => {
                console.log('get location succeed: lat=' + res.latitude + ',long=' + res.longitude)
                Taro.atMessage({
                    message: '已显示您附近的视图',
                    type: 'success'
                })
                this.setState({
                    longitude: res.longitude,
                    latitude: res.latitude
                })
                this.getMarkers()
            },
            fail: () => {
                Taro.atMessage({
                    message: '无法获取当前位置，视图可能与您所在位置不符',
                    type: 'error'
                })
                this.getMarkers()
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
