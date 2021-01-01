import React from 'react'
// import ServerImage from '@/server-image/server-image'
import Config from '@/utils/config'
import { Text, View } from '@tarojs/components'
// import loginLogo from '../../assets/login-logo.png'

import './login.scss'
import PasswordLoginForm from './password-login'

export default function LoginPage() {
  return (
    <View className='login-page'>
      <View className='login-page-header'>
        <View className='login-page-header-txt'>
          <Text>{Config.name}</Text>
        </View>
        {/* <ServerImage className='login-page-header-logo' src={loginLogo} /> */}
      </View>

      <View className='login-page-body'>
        <View className='login-form-brief'>WELCOME TO LOGIN</View>
        <View className='form-form-title'>欢迎登录</View>

        <PasswordLoginForm />
      </View>
    </View>
  )
}
