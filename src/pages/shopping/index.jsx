import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text, Checkbox } from '@tarojs/components'
import Layout from '../../components/Layout'
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

  componentDidMount() {
    console.log(this.props)
  }

  addShopToCard = (item, type, selected) => {
    const { shopCard } = this.props;
    const { changeShopCard } = shopCard
    changeShopCard(item, type, selected)
    setTimeout(() => {
      this.forceUpdate();
    }, 500)
  }

  render() {
    const { userInfo, shopCard } = this.props;
    const { shoppingCard,selected } = shopCard;
    const { count, card=[] } = shoppingCard;
    console.log(card)
    return (
      <Layout isShowChat={true} isShowNavgate={true} isBack={true} isShowTab={true} title='购物车'>
        <Image src='../../assets/image/shopping-bg.png' className='mine-bg' />
        <View className='checkbox'>
          {card.map(item => (
            <Checkbox>
              <View className='item'>
                <Image src={item.imgPath} className='image' />
                <View className='content'>
                  <Text className='title'>{item.name}</Text>
                  <View className='price'>
                    <Text>¥{(item.price * item.discount).toFixed(2)}</Text>
                    <Text>{item.price.toFixed(2)}</Text>
                  </View>
                  <View className='count'>
                      <Text className='iconfont count_icon' onClick={() => { this.addShopToCard(item, 'sub', selected) }}>&#xe60e;</Text>
                      <Text className='count_text'>{item.count}</Text>
                      <Text className='iconfont count_icon' onClick={() => { this.addShopToCard(item, 'add', selected) }}>&#xe621;</Text>
                    </View>
                </View>
              </View>
            </Checkbox>
          ))}
        </View>

      </Layout>

    )
  }
}

export default Index 
