import React, { Component } from 'react'
import { AtInput } from 'taro-ui'
import Listof from '@/listof/listof'
import searchWasteDatabase from '../../utils/category-data/garbage-search'
import imgFoodWaste from '../../assets/icons/food-waste.png'
import imgHazardousWaste from '../../assets/icons/hazardous-waste.png'
import imgResidualWaste from '../../assets/icons/residual-waste.png'
import imgRecyclableWaste from '../../assets/icons/recyclable-waste.png'
import imgHelp from '../../assets/icons/ios-help.png'
import './search-page.scss'


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
        let searchResult_ = []
        if (textFieldValue !== '') {
            console.log('Searching for: ' + textFieldValue)
            searchWasteDatabase(textFieldValue, (res) => {
                console.log('Search result: ' + res)
                searchResult_ = res
            })
        }
        let searchResultFormatted = []
        if (searchResult_.length !== 0) {
            searchResult_.forEach((element, index, array) => {
                // RECYCLEABLE: 1, // 可回收物
                // HAZARDOUS: 2, // 有害垃圾
                // HOUSEHOLD_FOOD: 3, // 湿垃圾
                // RESIDUAL: 4, // 干垃圾
                // ZX_GARBAGE: 5, // 装修垃圾
                // BIG_GARBAGE: 6, // 大件垃圾
                // NON_LIFE_GARBAGE: 7, // 非生活垃圾
                let itemImg = undefined
                let category = ''
                if (element.categoryId === 1) { // 可回收垃圾
                    itemImg = imgRecyclableWaste
                    category = '可回收垃圾'
                } else if (element.categoryId === 2) { // 有害垃圾
                    itemImg = imgHazardousWaste
                    category = '有害垃圾'
                } else if (element.categoryId === 3) { // 厨余垃圾
                    itemImg = imgFoodWaste
                    category = '厨余垃圾'
                } else { // 干垃圾、装修垃圾、大件垃圾、非生活垃圾全算其他垃圾
                    itemImg = imgResidualWaste
                    category = '其他垃圾'
                }

                searchResultFormatted.push({
                    id: index,
                    title: element.garbageName, // + '  ' + '【'+element.categoryName+'】',
                    // TODO: linkToUrl: 'page:///pages/map/map-page',
                    brief: category,
                    mode: ['circle'],
                    imageUrl: itemImg
                })
            })
        } else {
            if (textFieldValue !== '') {
                searchResultFormatted.push({
                    id: 0,
                    title: '没有查到结果，换个词试试',
                    brief: '',
                    mode: ['small'],
                    imageUrl: imgHelp
                })
            }

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
                <Listof list={this.state.searchResult} displayMode='h-card' />
            </view>
        )
    }
}
