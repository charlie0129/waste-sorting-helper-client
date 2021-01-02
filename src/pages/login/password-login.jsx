import EleInput from '@/components/form/field/ele-input'
import { Block, View } from '@tarojs/components'
import { setGlobalData, getGlobalData } from '@/utils/index'
import React, { useState } from 'react'

import { AtButton } from 'taro-ui'
import NavigationService from '@/nice-router/navigation-service'

import './login.scss'

export default function PasswordForm() {
  const [login, setLogin] = useState()
  // const [password, setPassword] = useState()

  const handleSubmit = () => {
    setGlobalData('userId', login);
    console.log(getGlobalData('userId'));
    NavigationService.back({}, this);
    NavigationService.dispatch('app/login', {
      loginMethod: 'account_password',
      login
    });
    
  }

  return (
    <Block>
      <View className='login-form-fields'>
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
