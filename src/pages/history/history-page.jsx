import React, { Component } from 'react'
import { AtButton, AtIcon } from 'taro-ui'
import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import ActionFloor from '@/components/navigation/action-floor'
import NavigationService from '@/nice-router/navigation-service'
import SectionBar from '@/components/section-bar/section-bar'
import { setGlobalData, getGlobalData } from '@/utils/index'
import Listof from '@/listof/listof'
import 'taro-ui/dist/style/components/button.scss'
import './history-page.scss'
import imgFoodWaste from '../../assets/icons/food-waste.png'
import imgHazardousWaste from '../../assets/icons/hazardous-waste.png'
import imgResidualWaste from '../../assets/icons/residual-waste.png'
import imgRecyclableWaste from '../../assets/icons/recyclable-waste.png'



export default class HistoryPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      wasteList: [
        {
          id: 1,
          title: '正在查询',
        },
      ],
    }
  }
  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  //   getHistoryPageInstance() {
  //     return this
  //   }

  componentDidShow() {
    console.log('history page shown')

    Taro.request({
      url: getGlobalData('server') + '/get-waste-list-top20',
      method: 'GET',
      data: {
        id: getGlobalData('userId'),
      },
      dataType: 'json',
      success: (res) => {
        console.log('request succeeded')
        console.log(res.data)
        const newWasteListItem = []
        res.data.forEach((element, index, array) => {
          var categoryNameChs = ''
          var wasteImage = ''
          if (element.category === 'HAZARDOUS_WASTE') {
            categoryNameChs = '有害垃圾'
            wasteImage = imgHazardousWaste
          } else if (element.category === 'RESIDUAL_WASTE') {
            categoryNameChs = '其他垃圾'
            wasteImage = imgResidualWaste
          } else if (element.category === 'RECYCLABLE_WASTE') {
            categoryNameChs = '可回收垃圾'
            wasteImage = imgRecyclableWaste
          } else if (element.category === 'FOOD_WASTE') {
            categoryNameChs = '厨余垃圾'
            wasteImage = imgFoodWaste
          }

          var dateFormatted = ''
          dateFormatted = element.time.substring(0, 19).replace('T', ' ')

          newWasteListItem.push({
            id: element.id,
            title:
              dateFormatted.substring(5, 7) + '月' + dateFormatted.substring(8, 10) + '日 ' + categoryNameChs + ' ' + '0kg',
            brief: dateFormatted + ', ' + '北京邮电大学雁南',
            imageUrl: wasteImage,
            mode: ['circle']
          })
        })
        this.setState((state) => ({
          wasteList: newWasteListItem,
        }))
      },
      fail: (res) => {
        console.log('request failed')
        console.log(res)
        const newWasteListItem = [
          {
            id: 1,
            title: '请求失败',
          },
        ]
        this.setState((state) => ({
          wasteList: newWasteListItem,
        }))
      },
    })
  }

  componentDidHide() {}

  render() {
    return (
      <View className="home-page">
        <Listof list={this.state.wasteList} displayMode="h-card">
        </Listof>
      </View>
    )
  }
}
