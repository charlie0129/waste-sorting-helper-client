import Taro from '@tarojs/taro'
import { Block, Text, View } from '@tarojs/components'
import React, { Component } from 'react'
import { getGlobalData } from '@/utils/index'
import { AtButton, AtInput, AtMessage, AtToast } from 'taro-ui'

import './register-page.scss'


export default class RegisterPage extends Component {
    constructor(props) {
        super(props)
        console.log('register page constructed')
        this.state = {
            enteredId: undefined,
            enteredName: undefined,
            isLoading: false
        }
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

    setToast(isOn) {
        this.setState(() => ({
            isLoading: isOn
        }))
    }

    setEnteredId(enteredId) {
        this.setState({
            enteredId: enteredId
        })
        return enteredId
    }

    setEnteredName(enteredName) {
        this.setState({
            enteredName: enteredName
        })
        return enteredName
    }

    handleSubmit() {
        console.log('Register button clicked!')
        console.log('User entered ID: ' + this.state.enteredId)
        console.log('User entered name: ' + this.state.enteredName)
        this.setToast(true)

        Taro.request({
            url: getGlobalData('server') + '/api/users',
            method: 'POST',
            data: {
                id: this.state.enteredId,
                name: this.state.enteredName,
                credit: 0
            },
            success: (res) => {
                if (res.statusCode == 409) {
                    console.log('add-user: duplicated user')
                    console.log(res)
                    this.setToast(false)
                    Taro.atMessage({
                        message: '学号已被注册',
                        type: 'error'
                    })
                } else if (res.statusCode == 201) {
                    console.log('add-user: succeed')
                    console.log(res)
                    this.setToast(false)
                    Taro.atMessage({
                        message: '注册成功',
                        type: 'success'
                    })
                    Taro.navigateBack({
                        delta: 1
                    })
                } else {
                    console.log('add-user: failed')
                    console.log(res)
                    this.setToast(false)
                    Taro.atMessage({
                        message: '发生错误',
                        type: 'error'
                    })
                }
            },
            fail: (res) => {
                this.setToast(false)
                Taro.atMessage({
                    message: '网络错误',
                    type: 'error'
                })

                console.log('get-user failed')
            }
        })
    }

    render() {
        return (
            <View className='login-page'>
                <AtToast isOpened={this.state.isLoading} text='请稍等' status='loading' duration={0} />
                <View className='login-page-header'>
                    <View className='login-page-header-txt'>
                        <Text>注册</Text>
                    </View>
                    {/* <ServerImage className='login-page-header-logo' src={loginLogo} /> */}
                </View>

                <View className='login-page-body'>
                    {/*<View className='form-form-title'>欢迎登录</View>*/}

                    <Block>
                        <View className='login-form-fields'>
                            <AtMessage />

                            <AtInput
                                className='login-form-fields-input'
                                placeholder='请输入学号'
                                name='enteredId'
                                type='number'
                                value={this.state.enteredId}
                                onChange={this.setEnteredId.bind(this)}
                            />
                            <AtInput
                                className='login-form-fields-input'
                                placeholder='请输入姓名'
                                name='enteredName'
                                type='text'
                                value={this.state.enteredName}
                                onChange={this.setEnteredName.bind(this)}
                            />
                        </View>
                        <AtButton className='login-button' onClick={this.handleSubmit.bind(this)}>
                            注册
                        </AtButton>
                    </Block>
                </View>
            </View>

        )
    }
}

