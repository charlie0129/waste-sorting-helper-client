import React, { Component } from 'react'
import { AtButton, AtIcon, AtMessage, AtList, AtListItem } from 'taro-ui'
import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import ActionFloor from '@/components/navigation/action-floor'
import NavigationService from '@/nice-router/navigation-service'
import SectionBar from '@/components/section-bar/section-bar'
import { setGlobalData, getGlobalData } from '@/utils/index'
import Listof from '@/listof/listof'
import userImage from '../../assets/icons/md-person.png'
import cameraImage from '../../assets/icons/ios-camera.png'
import statsImage from '../../assets/icons/ios-stats.png'
import trashImage from '../../assets/icons/md-trash.png'
import listImage from '../../assets/icons/ios-list.png'
import 'taro-ui/dist/style/components/button.scss'
import './home-page.scss'

export default class HomePage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userCard: []
        }
    }

    componentWillMount() {
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    componentDidShow() {
        console.log('home page shown')
        // this.state.userId = getGlobalData('userId');
        // this.setState(state => ({
        //   userId: getGlobalData('userId')
        // }));
        if (getGlobalData('userId') === '') {
            Taro.atMessage({
                message: '您还没登录，请先登录',
                type: 'warning'
            })
        }

        const newUserCard = [
            {
                id: 1,
                title: getGlobalData('userName'),
                brief:
                    '学号：' +
                    getGlobalData('userId') +
                    '\n积分：' +
                    getGlobalData('userCredit'),
                status: '已登录',
                imageUrl: userImage,
                mode: ['circle'],
                linkToUrl: 'page://pages/about-me/about-me-page'
            }
        ]
        console.log(newUserCard)

        this.setState((state) => ({
            userCard: newUserCard
        }))
    }

    componentDidHide() {
        if (getGlobalData('userId') !== '') {
            Taro.request({
                url: getGlobalData('server') + '/api/users/'+getGlobalData('userId'),
                method: 'GET',
                data: {
                },
                dataType: 'json',
                success: (res) => {
                    if (res.statusCode !== 200) {
                    } else {
                        setGlobalData('userCredit', res.data.credit)
                        console.log('successfully refreshed credit')
                    }
                },
                fail: (res) => {
                    Taro.atMessage({
                        message: '刷新积分错误',
                        type: 'error'
                    })

                    console.log('get-credit failed')
                }
            })
        }
    }

    loginHandler = () => {
        NavigationService.navigate('/pages/login/login-page')
    }

    render() {
        return (
            <View className='home-page'>
                <AtMessage />
                <view>
                    {getGlobalData('userId') === '' && (
                        <AtButton type='primary' onClick={this.loginHandler} className='login-button'>
                            登录
                        </AtButton>
                    )}
                    {getGlobalData('userId') !== '' && (
                        <Listof list={this.state.userCard} displayMode='big-card' />
                    )}
                </view>
                {/* <view>
          <AtIcon value="clock" size="30" color="#976bff" />
        </view> */}

                {getGlobalData('userId') !== '' && (
                    <view>
                        <AtList>
                            <AtListItem
                                title='扫码扔垃圾'
                                arrow='right'
                                thumb={cameraImage}
                                onClick={() => {
                                    NavigationService.navigate('/pages/about-me/about-me-page')
                                }}
                            />
                            <AtListItem
                                title='查询垃圾投放点'
                                arrow='right'
                                thumb={trashImage}
                                onClick={() => {
                                    NavigationService.navigate('/pages/map/map-page')
                                }}
                            />
                            <AtListItem
                                title='查询垃圾投放记录'
                                arrow='right'
                                thumb={statsImage}
                                onClick={() => {
                                    NavigationService.navigate('/pages/history/history-page')
                                }}
                            />
                            <AtListItem
                                title='查询分类知识'
                                arrow='right'
                                thumb={listImage}
                                onClick={() => {
                                    NavigationService.navigate('/pages/category-data/category-data-page')
                                }}
                            />
                        </AtList>
                    </view>

                )}
                {/* <view>
            <Listof list={this.state.actionList} displayMode="h-card" />
        </view> */}
            </View>
        )
    }
}
