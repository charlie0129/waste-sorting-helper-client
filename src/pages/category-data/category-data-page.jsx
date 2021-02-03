import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtButton, AtInput, AtForm } from 'taro-ui'
import Listof from '@/listof/listof'
import { setGlobalData, getGlobalData } from '@/utils/index'
import NavigationService from '@/nice-router/navigation-service'
import NavigationLineItem from '@/components/navigation/navigation-line-item'
import searchWasteDatabase from '../../utils/category-data/garbage-search'
import imgFoodWaste from '../../assets/icons/food-waste.png'
import imgHazardousWaste from '../../assets/icons/hazardous-waste.png'
import imgResidualWaste from '../../assets/icons/residual-waste.png'
import imgRecyclableWaste from '../../assets/icons/recyclable-waste.png'
import imgHelp from '../../assets/icons/ios-help.png'
import './category-data-page.scss'
import trashImage from '../../assets/icons/md-trash.png'


export default class CategoryData extends Component {
    constructor(props) {
        super(props)
        this.state = {
            textFieldValue: '',
            searchResult: []
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

    handleChange(textFieldValue) {
        this.setState({
            textFieldValue
        })
        let searchResult_ = undefined
        if (textFieldValue !== '') {
            console.log('Searching for: ' + textFieldValue)
            searchWasteDatabase(textFieldValue, (res) => {
                console.log('Search result: ' + res)
                searchResult_ = res
            })
        }
        let searchResultFormatted = []
        if(searchResult_!==undefined){
            searchResult_.forEach((element, index, array) => {
                // RECYCLEABLE: 1, // 可回收物
                // HAZARDOUS: 2, // 有害垃圾
                // HOUSEHOLD_FOOD: 3, // 湿垃圾
                // RESIDUAL: 4, // 干垃圾
                // ZX_GARBAGE: 5, // 装修垃圾
                // BIG_GARBAGE: 6, // 大件垃圾
                // NON_LIFE_GARBAGE: 7, // 非生活垃圾
                let itemImg = undefined
                if (element.categoryId === 1) {
                    itemImg = imgRecyclableWaste
                } else if (element.categoryId === 2) {
                    itemImg = imgHazardousWaste
                } else if (element.categoryId === 3) {
                    itemImg = imgFoodWaste
                } else {
                    itemImg = imgResidualWaste
                }

                searchResultFormatted.push({
                    id: index,
                    title: element.garbageName, // + '  ' + '【'+element.categoryName+'】',
                    // TODO: linkToUrl: 'page:///pages/map/map-page',
                    brief: element.categoryName,
                    mode: ['circle'],
                    imageUrl: itemImg
                })
            })
        }else{
            searchResultFormatted.push({
                id: 0,
                title: '没有查到结果，换个词试试',
                // TODO: linkToUrl: 'page:///pages/map/map-page',
                brief: '',
                mode: ['small'],
                imageUrl: imgHelp
            })
        }

        this.setState({
            searchResult: searchResultFormatted
        })
        // 在小程序中，如果想改变 value 的值，需要 `return value` 从而改变输入框的当前值
        return textFieldValue
    }


    render() {
        return (
            <view>
                <AtInput
                    name='value'
                    title='搜索'
                    type='text'
                    placeholder='查询垃圾的类别'
                    value={this.state.textFieldValue}
                    onChange={this.handleChange.bind(this)}
                />
                {
                    this.state.textFieldValue !== '' && (<Listof list={this.state.searchResult} displayMode='h-card' />)
                }
            </view>
    )
    }
}
