import EleInput from '@/components/form/field/ele-input'
import { Block, View } from '@tarojs/components'
import { setGlobalData, getGlobalData } from '@/utils/index'
import React, { useState } from 'react'
import Taro from '@tarojs/taro'
import { AtButton, AtMessage } from 'taro-ui'
import NavigationService from '@/nice-router/navigation-service'

import './login.scss'


export default function PasswordForm() {
  const [login, setLogin] = useState()
  // const [password, setPassword] = useState()

  const handleSubmit = () => {


    Taro.request({
      url: getGlobalData('server') + '/get-user',
      method: 'GET',
      data: {
        id: login,
      },
      dataType: 'json',
      success: (res) => {
        if (res.data == '') {
          console.log('get-user failed');
          Taro.atMessage({
            'message': '用户不存在',
            'type': 'error',
          })
        } else {
          setGlobalData('userId', login);
          setGlobalData('userName', res.data);
          console.log('get-user succeed');
          console.log(getGlobalData('userId'));
          console.log(getGlobalData('userName'));

          Taro.request({
            url: getGlobalData('server') + '/get-credit',
            method: 'GET',
            data: {
              id: getGlobalData('userId'),
            },
            dataType: 'json',
            success: (res) => {
              if (res.data == '') {
                Taro.atMessage({
                  'message': '获取积分出错',
                  'type': 'error',
                })
              } else {
                setGlobalData('userCredit', res.data);
                Taro.atMessage({
                  'message': '登录成功',
                  'type': 'success',
                });
                NavigationService.back({}, this);
              }
            },
            fail: (res) => {
              Taro.atMessage({
                'message': '获取积分出错',
                'type': 'error',
              })
            }
          })
      
          
        }
      },
      fail: (res) => {
        Taro.atMessage({
          'message': '网络错误',
          'type': 'error',
        })
        console.log('get-user failed');
      }
    })

    
  }

  return (
    <Block>
      <View className='login-form-fields'>
        <AtMessage />
        <EleInput
          className='login-form-fields-input'
          placeholder='请输入学号'
          name='login'
          value={login}
          onChange={setLogin}
        />

      </View>
      <AtButton className='login-button' onClick={handleSubmit}>
        登录
      </AtButton>
    </Block>
  )
}
