import EleInput from '@/components/form/field/ele-input'
import { Block, View } from '@tarojs/components'
import { getGlobalData, setGlobalData } from '@/utils/index'
import React, { useState } from 'react'
import Taro from '@tarojs/taro'
import { AtButton, AtMessage, AtToast } from 'taro-ui'
import NavigationService from '@/nice-router/navigation-service'

import './login.scss'

export default function PasswordForm() {
    const [login, setLogin] = useState()
    const [isLoading, setLoading] = useState(false)
    // const [password, setPassword] = useState()


    const handleSubmit = () => {
        setLoading(true)
        Taro.request({
            url: getGlobalData('server') + '/api/users/' + login,
            method: 'GET',
            data: {},
            dataType: 'json',
            success: (res) => {
                if (res.statusCode !== 200) {
                    console.log('get-user failed')
                    console.log(res)
                    Taro.atMessage({
                        message: '用户不存在',
                        type: 'error'
                    })
                } else {
                    Taro.request({
                        url: getGlobalData('server') + '/api/users/' + login + '/credit',
                        method: 'GET',
                        success: (res) => {
                            if (res.statusCode !== 200) {
                            } else {
                                setGlobalData('userCredit', res.data)
                                console.log('successfully refreshed credit: ' + res.data)
                            }
                            Taro.atMessage({
                                message: '登录成功',
                                type: 'success'
                            })
                            setLoading(false)
                            NavigationService.back({}, this)
                        },
                        fail: () => {
                            setLoading(false)
                            Taro.atMessage({
                                message: '刷新积分错误',
                                type: 'error'
                            })

                            console.log('get-credit failed')
                        }
                    })
                    setGlobalData('userId', login)
                    setGlobalData('userName', res.data.name)
                    console.log('get-user succeed')
                    console.log(res)
                    console.log(getGlobalData('userId'))
                    console.log(getGlobalData('userName'))
                }
            },
            fail: (res) => {
                setLoading(false)
                Taro.atMessage({
                    message: '登录错误',
                    type: 'error'
                })

                console.log('get-user failed')
            }
        })

    }

    const handleRegister = () => {
        NavigationService.navigate('/pages/register/register-page')
    }

    return (
        <Block>
            <AtToast isOpened={isLoading} text='请稍等' status='loading' duration={0} />
            <View className='login-form-fields'>
                <AtMessage />
                <EleInput
                    className='login-form-fields-input'
                    placeholder='请输入学号'
                    type='number'
                    name='login'
                    value={login}
                    onChange={setLogin}
                />
            </View>
            <AtButton className='login-button' onClick={handleSubmit}>
                登录
            </AtButton>
            <AtButton className='register-button' onClick={handleRegister}>
                注册
            </AtButton>
        </Block>
    )
}
