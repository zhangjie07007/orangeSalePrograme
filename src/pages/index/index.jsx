import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text, ScrollView } from '@tarojs/components'
import TabBar from '../../components/TabBar'
import NavgateBar from '../../components/navgateBar'
import Layout from '../../components/Layout'
import { observer, inject } from '@tarojs/mobx'
import '../../scss/iconfont.scss'
import './index.scss'

import data from '../../utilities/data'

console.log(data)
@inject((stores) => ({
  userInfo: stores.counterStore.userInfo,
  shopping: stores.counterStore.shopping,
}))
@observer
class Index extends Component {
  constructor(props) {
    super(props)
    const { shopping } = props;
    const { setAllData, setSelect } = shopping;
    this.state = {
      index: 0,
    }
  }
  config = {
    navigationBarTitleText: '个人中心',
    navigationStyle: 'custom',
  };
  componentDidMount() {
    const { userInfo } = this.props;
    const { getUserInfo } = userInfo;
    getUserInfo()
    Taro.getSystemInfo().then(message => {
      this.setState({
        height: message.screenHeight,
      })
    })
    // Taro.navigateTo({
    //   url:'/pages/shopping/index'
    // })
    // Taro.getUserInfo().then(res=>{
    //   console.log(res)
    // })
  }
  selectRightList = (item, index) => {
    const { shopping } = this.props;
    const { setSelect } = shopping;
    this.setState({
      index
    })
    setSelect(item)
    console.log(item)

  }

  addShopToCard = (item, type, selected) => {
    const { shopping } = this.props;
    const { changeShopCard } = shopping
    changeShopCard(item, type, selected)
    setTimeout(() => {
      this.forceUpdate();
    }, 500)
  }



  render() {
    const { height = 0, index } = this.state;
    const { shopping } = this.props;
    const { allData, selected } = shopping;
    console.log(height)
    console.log(shopping)
    return (
      <Layout opacity={1} isShowTab={true} isShowNavgate={true} title='卖橘子的小菇凉'>
        <View className='index'>
          {/* <Image className='bg' src='../../assets/image/background-img.png' /> */}
          <Input placeholder='输入商品名称' className='input' />
          <View className='store'>
            <View className='store__left' style={{height:`${height-150}px`}}>
              {allData.map((item, index) => (
                <View onClick={() => { this.selectRightList(item, index) }} className={`store__left__item ${selected.id == item.id ? 'left-active' : ''}`}>{item.name}</View>
              ))}
              <Text className='line' style={{ transform: `translateY(${index * 69}rpx)` }} />
            </View>
            <View className='store__right' style={{height:`${height-150}px`}}>
              <ScrollView>
                {selected.data.map(list => (
                  <View className='store__right__item' >
                    <Image src={list.imgPath} className='img' />
                    <View className='content'>
                      <View className='title'>{list.name}</View>
                      <View className='desc'>{list.desc}</View>
                      <View className='price'>¥{(list.price * list.discount).toFixed(2)}</View>
                      <View className='original'>¥{list.price.toFixed(2)}</View>
                    </View>
                    <View className='count'>
                      <Text className='iconfont count_icon' onClick={() => { this.addShopToCard(list, 'sub', selected) }}>&#xe60e;</Text>
                      <Text className='count_text'>{list.count}</Text>
                      <Text className='iconfont count_icon' onClick={() => { this.addShopToCard(list, 'add', selected) }}>&#xe621;</Text>
                    </View>
                  </View>
                ))}
              </ScrollView>

            </View>
          </View>
        </View>
      </Layout>
    )
  }
}

export default Index
