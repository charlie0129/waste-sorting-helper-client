import React, { Component } from 'react'
import { View } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import { setGlobalData } from '@/utils/index'
import NavigationService from '@/nice-router/navigation-service'
import './about-me-page.scss'

export default class AboutMe extends Component {
    constructor(props) {
        super(props)
    }

    componentWillMount() {
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    componentDidShow() {
    }

    componentDidHide() {
    }

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
            <View className='me-page'>
                {/*<view>*/}
                {/*  <Listof list={this.state.userCard} displayMode="big-card" />*/}
                {/*</view>*/}
                <View className='me-page-body'>
                    {/*{lineItemNavigatorList.map((it) => (*/}
                    {/*  <NavigationLineItem key={`${it.id}_${it.code}`} {...it} />*/}
                    {/*))}*/}
                    <AtButton type='primary' onClick={this.logoutHandler}>
                        退出登录
                    </AtButton>
                </View>
            </View>
        )
    }
}
