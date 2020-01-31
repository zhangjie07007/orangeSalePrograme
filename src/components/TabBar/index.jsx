import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import { AtBadge } from 'taro-ui'
import { goToLink } from '../../utilities/public-mothod'
import '../../scss/iconfont.scss'
import './index.scss'


@inject(stores => ({
    shopCard: stores.counterStore.shopping
}))
@observer
class Index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tabParmas: [
                {
                    name: '首页',
                    src: 'pages/index/index',
                    id: 'home',
                    icon: `&#xe784;`,
                },
                {
                    name: '购物车',
                    src: 'pages/shopping/index',
                    id: 'shopping',
                    icon: `&#xe67d;`,
                },
                {
                    name: '个人中心',
                    src: 'pages/mine/index',
                    id: 'mine',
                    icon: `&#xe67d;`,
                }
            ],
            selected: 'home',
            isShowTab: false
        }
    }

    componentDidMount() {

        this.initTabBar()
        this.setState({
            isShowTab: true
        })
    }

    initTabBar = () => {
        const urlArr = Taro.getCurrentPages();
        const { tabParmas } = this.state;
        tabParmas.forEach(item => {
            if (item.src === urlArr[urlArr.length - 1].route) {
                this.setState({
                    selected: item.id
                })
            }
        })
    }

    toTabBar = e => {
        this.setState({
            isShowTab: false
        })
        this.setState({
            selected: e.currentTarget.id
        }, () => {
            const { selected } = this.state;
            if (selected === 'mine') {
                goToLink({
                    url: 'pages/mine/index'
                })
            } else if (selected === 'home') {
                goToLink({ url: 'pages/index/index' })
            } else if (selected === 'shopping') {
                goToLink({ url: 'pages/shopping/index' })
            }

        })
    }

    componentDidShow() {
        this.initTabBar()
        this.setState({
            isShowTab: true
        })
    }

    render() {
        const { opacity = 0.4,shopCard } = this.props;
        const {shoppingCard} = shopCard ;
        const {count,card} = shoppingCard;
        const { tabParmas, selected, isShowTab } = this.state
        return (
            <View className={`tab-bar ${isShowTab ? 'show' : 'hide'}`} style={{ backgroundColor: `rgba(255, 255, 255, ${opacity})` }}>
                <View className={`tab-bar__items ${selected === 'home' ? 'active' : ''}`} id='home' onClick={this.toTabBar}>
                    <Text className='iconfont icon'>&#xe60d;</Text>
                    <Text>首页</Text>
                </View>
                <AtBadge value={count} maxValue={99}>
                    <View className={`tab-bar__items ${selected === 'shopping' ? 'active' : ''}`} id='shopping' onClick={this.toTabBar}>
                        <Text className='iconfont icon'>&#xe613;</Text>
                        <Text className='text'>购物车</Text>
                    </View>
                </AtBadge>

                <View className={`tab-bar__items ${selected === 'mine' ? 'active' : ''}`} id='mine' onClick={this.toTabBar}>
                    <Text className='iconfont icon'>&#xe6ae;</Text>
                    <Text className='text'>个人中心</Text>
                </View>
            </View>
        )
    }
}

export default Index 
