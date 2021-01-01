import React from 'react'
import _ from 'lodash'
import { View } from '@tarojs/components'
import NumberInput from './ele-number-input'
import './styles.scss'

function EleMoney(props) {
  const { value } = props
  const theValue = _.isString(value) ? _.toNumber(value) : value
  return (
    <View className='ele-money'>
      <View className='ele-money-icon'>￥</View>
      <NumberInput {...props} value={theValue} />
    </View>
  )
}

export default EleMoney
