import React, { Component } from 'react'
import { AtButton, AtIcon, AtMessage, AtList, AtListItem, AtToast } from 'taro-ui'
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
            userCard: [],
            isLoading: false,
            didShowAtMessage: true
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

        // make <AtMessage /> show up
        this.setState(() => ({
            didShowAtMessage: false
        }))
        this.setState(() => ({
            didShowAtMessage: true
        }))

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
    }

    loginHandler = () => {
        NavigationService.navigate('/pages/login/login-page')
    }

    setToast(isOn) {
        this.setState(() => ({
            isLoading: isOn
        }))
    }

    scanQRCode() {
        Taro.scanCode({
            success: (scres) => {
                console.log('scan result:')
                console.log(scres)
                this.setToast(true)

                Taro.request({
                    url: getGlobalData('server') + '/api/dustbins/' + scres.result + '/requests',
                    method: 'POST',
                    data: {
                        userId: getGlobalData('userId'),
                        dustbinId: scres.result
                    },
                    success: (res) => {
                        if (res.statusCode === 201) {
                            console.log('ready to check result')

                            let round = -1
                            const ROUND_LIMIT = 4
                            let interval = setInterval(() => {
                                if(++round>=1){
                                    console.log('checking result, round=' + round)

                                    if (round >= ROUND_LIMIT) {
                                        console.log('checking done, result=failed')
                                        Taro.atMessage({
                                            message: '开盖失败，垃圾桶未及时响应',
                                            type: 'error'
                                        })
                                        this.setToast(false)
                                        clearInterval(interval)
                                    }

                                    Taro.request({
                                        url: getGlobalData('server') + '/api/dustbins/' + scres.result + '/requests/' + res.data.requestId,
                                        method: 'GET',
                                        success: (res_) => {
                                            console.log(res_)
                                            if (res_.statusCode === 200 && res_.data.type === 0) {
                                                console.log('checking done, result=succeed')
                                                Taro.atMessage({
                                                    message: '开盖成功',
                                                    type: 'success'
                                                })
                                                this.setToast(false)
                                                clearInterval(interval)
                                            }
                                        }
                                    })
                                }
                            }, 2000)


                        } else {
                            console.log('error: return code not 201')
                            this.setToast(false)
                            Taro.atMessage({
                                message: '开盖过程中发生错误，垃圾桶无法被连接',
                                type: 'error'
                            })
                        }
                    },
                    fail: () => {
                        this.setToast(false)
                        Taro.atMessage({
                            message: '网络错误',
                            type: 'error'
                        })

                    },
                    complete: (res) => {
                        console.log('completed')
                        console.log(res)
                    }
                })


            },
            fail: () => {
                Taro.atMessage({
                    message: '发生错误',
                    type: 'error'
                })
            }
        })

    }

    render() {
        return (
            <View className='home-page'>
                {this.state.didShowAtMessage && (<AtMessage />)}

                <AtToast isOpened={this.state.isLoading} text='正在开盖' status='loading' duration={0} />

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

                <view>
                    <AtList>
                        <AtListItem
                            title='扫码扔垃圾'
                            arrow='right'
                            thumb={cameraImage}
                            disabled={getGlobalData('userId') === ''}
                            onClick={() => {
                                this.scanQRCode()
                            }}
                        />
                        <AtListItem
                            title='查询垃圾投放点'
                            arrow='right'
                            thumb={trashImage}
                            disabled={getGlobalData('userId') === ''}
                            onClick={() => {
                                NavigationService.navigate('/pages/map/map-page')
                            }}
                        />
                        <AtListItem
                            title='查询垃圾投放记录'
                            arrow='right'
                            thumb={statsImage}
                            disabled={getGlobalData('userId') === ''}
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
                {/* <view>
            <Listof list={this.state.actionList} displayMode="h-card" />
        </view> */}
            </View>
        )
    }
}
