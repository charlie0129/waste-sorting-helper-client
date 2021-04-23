import React, { Component } from 'react'
import { View } from '@tarojs/components'
import { AtIndexes, AtSegmentedControl } from 'taro-ui'
import SectionBar from '@/components/section-bar/section-bar'
import imgFoodWaste from '../../assets/icons/food-waste.png'
import imgHazardousWaste from '../../assets/icons/hazardous-waste.png'
import imgResidualWaste from '../../assets/icons/residual-waste.png'
import imgRecyclableWaste from '../../assets/icons/recyclable-waste.png'
import './category-data-page.scss'
import garbage_sort_data from '../../utils/category-data/garbage-sort-data'

export default class CategoryData extends Component {
    constructor(props) {
        super(props)
        this.categories = [
            {
                logo: imgRecyclableWaste,
                name: '可回收物',
                content: '适宜回收利用和资源化利用的，如：玻、金、塑、 纸、衣',
                desc: '酱油瓶、玻璃杯、平板玻璃、易拉罐、饮料瓶、 洗发水瓶、塑料玩具、书本、报纸、广告单、 纸板箱、衣服、床上用品等',
                action: ['轻投轻放', '清洁干燥，避免污染', '废纸尽量平整', '立体包装物请清空内容物，清洁后压扁投放', '有尖锐边角的，应包裹后投放']
            },
            {
                logo: imgHazardousWaste,
                name: '有害垃圾',
                content: '对人体健康或者自然环境造成直接或潜在危害的废弃物',
                desc: '废电池、油漆桶、荧光灯管、废药品及其包装物等',
                action: ['投放时请注意轻放', '易破损的请连带包装或包裹后轻放', '如易挥发，请密封后投放']
            },
            {
                logo: imgFoodWaste,
                name: '厨余垃圾',
                content: '日常生活垃圾产生的容易腐烂的生物质废弃物',
                desc: '剩菜剩饭、瓜皮果核、花卉绿植、过期食品等',
                action: ['纯流质的食物垃圾，如牛奶等，应直接倒进下水口', '有包装物的湿垃圾应将包装物去除后分类投放，包装物请投放到对应的可回收物或干垃圾容器']
            }, {
                logo: imgResidualWaste,
                name: '其他垃圾',
                content: '除有害垃圾、厨余垃圾、可回收物以外的其他生活废弃物',
                desc: '餐盒、餐巾纸、湿纸巾、卫生间用纸、塑料袋、食品包装袋、污染严重的纸、烟蒂、纸尿裤、 一次性杯子、大骨头、贝壳、花盆、陶瓷等',
                action: ['尽量沥干水分', '难以辨识类别的生活垃圾投入干垃圾容器内']

            }
        ]
        this.state = {
            currentSegment: 0
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

    // RECYCLEABLE: 1, // 可回收物
    // HAZARDOUS: 2, // 有害垃圾
    // HOUSEHOLD_FOOD: 3, // 湿垃圾
    // RESIDUAL: 4, // 干垃圾
    // ZX_GARBAGE: 5, // 装修垃圾
    // BIG_GARBAGE: 6, // 大件垃圾
    // NON_LIFE_GARBAGE: 7, // 非生活垃圾

    // 1, // 可回收垃圾
    // 2, // 有害垃圾
    // 3, // 厨余垃圾
    // 4, // 其他垃圾
    prepareWasteList() {
        let indexList = []
        garbage_sort_data.garbage_sort_data.forEach(categoryInData => {
            if (categoryInData.categroy === this.state.currentSegment + 1) {
                console.log('iterated: ' + categoryInData.categroy)
                categoryInData.data.forEach(item => {
                    let itemList = []
                    item.garbageItem.forEach(name => {
                        itemList.push({
                            'name': name
                        })
                    })
                    indexList.push({
                        title: item.letter,
                        key: item.letter,
                        items: itemList
                    })
                })
            }
        })
        return indexList
    }

    onListClick(item) {
        console.log(item)
    }

    handleSegmentClick(value) {
        this.setState({
            currentSegment: value
        })
        console.log('Switched to segment: ' + value)
    }

    render() {
        let renderedActionList = ''
        this.categories[this.state.currentSegment].action.forEach((item, idx, arr) => {
            renderedActionList += '・' + item + '\n'
        })

        let list = this.prepareWasteList()
        console.log(list)


        return (
            <view>
                <view className='segment'>
                    <AtSegmentedControl
                        current={this.state.currentSegment}
                        values={['可回收垃圾', '有害垃圾', '厨余垃圾', '其他垃圾']}
                        onClick={this.handleSegmentClick.bind(this)}
                    />
                </view>

                <view className='container' style='background-color:#e9e8e6'>
                    <view className='view-header'>
                        <image className='logo' src={this.categories[this.state.currentSegment].logo} />
                        <view className='header-name-view'>
                            <text className='one-view'>{this.categories[this.state.currentSegment].name}</text>
                            <text className='two-view'>{this.categories[this.state.currentSegment].content}</text>
                        </view>
                    </view>
                    <SectionBar title='主要包括' className='sectionBar' />
                    {/*<view className="title" style="background-color:#e9e8e6">主要包括</view>*/}
                    <view className='description'>{this.categories[this.state.currentSegment].desc}</view>
                    <SectionBar title='投放要求' className='sectionBar' />
                    {/*<view className="title" style="background-color:#e9e8e6">投放要求</view>*/}

                    <text className='description'>
                        {renderedActionList}
                    </text>

                </view>

                <View style='height:100vh'>
                    <AtIndexes
                        list={list}
                        onClick={this.onListClick.bind(this)}
                    >
                    </AtIndexes>
                </View>
            </view>
        )
    }
}
