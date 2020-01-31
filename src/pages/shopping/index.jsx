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

  constructor(props) {
    super(props)
    this.state = {
      resultData: {
        list: [],
        carriage: 0,
        wrapFree: 0,
        price: 0,
        all: 0
      }
    }
  }


  addShopToCard = (item, type, selected) => {
    const { shopCard } = this.props;
    const { changeShopCard } = shopCard
    changeShopCard(item, type, selected)
    setTimeout(() => {
      this.forceUpdate();
    }, 500)
  }

  checkItem = (item1, e) => {
    // const { shopCard } = this.props;
    // // console.log(shopCard)
    // const { setBuyList } = shopCard;
    // setBuyList(item)
    // setTimeout(() => {
    //   this.forceUpdate();
    // }, 500)
    const { resultData } = this.state;
    const { list } = resultData;
    let isPush = true;
    let index = 0;
    let price = 0;
    let wrapFree = 0;
    let carriage = 0;
    list.forEach((item, i) => {
      if (item.id === item1.id) {
        isPush = false;
        index = i;
      }
    })
    if (isPush) {
      list.push(item1)
    } else {
      list.splice(index, 1)
    }
    list.forEach(list => {
      price += list.price * list.discount * list.count;
      wrapFree += list.wrapFree;
      carriage += list.carriage
    })
    this.setState({
      resultData: {
        list,
        carriage,
        wrapFree,
        price,
        all: (price + wrapFree + carriage)
      }
    })
  }

  render() {
    const { userInfo, shopCard } = this.props;
    const { resultData } = this.state;
    const { price = 0, carriage = 0, wrapFree = 0, all = 0 } = resultData;
    const { shoppingCard, selected, buyList } = shopCard;
    const { count, card = [] } = shoppingCard;
    // const { price = 0, carriage = 0, wrapFree = 0, all = 0 } = buyList;
    console.log(buyList)
    return (
      <Layout isShowChat={true} isShowNavgate={true} isBack={true} isShowTab={true} title='购物车'>
        <Image src='../../assets/image/shopping-bg.png' className='mine-bg' />
        {card.length ? <View>
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
        </View> :
          <View className='nodata'>
            <Image className='image' src='../../assets/image/none.png' />
            <Text className='text'>还木有添加商品!</Text>
          </View>
        }



        <View className='jiesuan'>
          <View className='heji'>
            <View className='p'>
              <Text>合计:</Text>
              <Text>¥{all.toFixed(2)}</Text>
            </View>
            <View className='t'>全场包邮</View>
          </View>
          <View className='jiesuan-bth'>去结算</View>
        </View>
      </Layout>

    )
  }
}

export default Index 
