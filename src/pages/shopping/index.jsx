import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text, Checkbox } from '@tarojs/components'
import Layout from '../../components/Layout'
import { AtCheckbox } from 'taro-ui'
import { observer, inject } from '@tarojs/mobx'
import '../../scss/iconfont.scss'
import './index.scss'


@inject(stores => ({
  userInfo: stores.counterStore.userInfo,
  shopCard: stores.counterStore.shopping
}))
@observer
class Index extends Component {

  config = {
    navigationBarTitleText: '个人中心',
    navigationStyle: 'custom',
  };



  addShopToCard = (item, type, selected) => {
    const { shopCard } = this.props;
    const { changeShopCard } = shopCard
    changeShopCard(item, type, selected)
    setTimeout(() => {
      this.forceUpdate();
    }, 500)
  }

  checkItem = (item, e) => {
    const { shopCard } = this.props;
    // console.log(shopCard)
    const { setBuyList } = shopCard;
    setBuyList(item)
    setTimeout(() => {
      this.forceUpdate();
    }, 500)
  }

  render() {
    const { userInfo, shopCard } = this.props;
    const { shoppingCard, selected, buyList } = shopCard;
    const { count, card = [] } = shoppingCard;
    const { price = 0, carriage = 0, wrapFree = 0, all = 0 } = buyList;
    console.log(buyList)
    return (
      <Layout isShowChat={true} isShowNavgate={true} isBack={true} isShowTab={true} title='购物车'>
        <Image src='../../assets/image/shopping-bg.png' className='mine-bg' />
        <View className='checkbox'>
          {card.map(item => (
            <View className='items'>
              <Checkbox checked={item.checked} id={item.id} className='check' onClick={(e) => { this.checkItem(item, e) }} />
              {/* <AtCheckbox value={item.id} onClick={(e)=>{this.checkItem(item,e)}} /> */}
              <View className='item'>
                <Image src={item.imgPath} className='image' />
                <View className='content'>
                  <Text className='title'>{item.name}</Text>
                  <View className='price'>
                    <Text>¥{(item.price * item.discount).toFixed(2)}</Text>
                    <Text>{item.price.toFixed(2)}</Text>
                  </View>
                  {/* <View className='count'>
                    <Text className='iconfont count_icon' onClick={() => { this.addShopToCard(item, 'sub', selected) }}>&#xe60e;</Text>
                    <Text className='count_text'>{item.count}</Text>
                    <Text className='iconfont count_icon' onClick={() => { this.addShopToCard(item, 'add', selected) }}>&#xe621;</Text>
                  </View> */}
                  <View className='number'>
                    <Text>数量: </Text>
                    <Text>{item.count}</Text>
                  </View>
                </View>
              </View>
            </View>

          ))}
        </View>
        <View className='result'>
          <View className='result_item'>
            <Text>商品总价</Text>
            <Text>¥{price.toFixed(2)}</Text>
          </View>
          <View className='result_item'>
            <Text>运费</Text>
            <Text>¥{carriage.toFixed(2)}</Text>
          </View>
          <View className='result_item'>
            <Text>包装费</Text>
            <Text>¥{wrapFree.toFixed(2)}</Text>
          </View>
          <View className='result_all'>
            <Text>总计： </Text>
            <Text>¥{all.toFixed(2)}</Text>
          </View>
        </View>
        <View className='jiesuan'>
          
        </View>
      </Layout>

    )
  }
}

export default Index 
