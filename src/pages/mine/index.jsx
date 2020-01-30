import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import Layout from '../../components/Layout'
import { observer, inject } from '@tarojs/mobx'
import '../../scss/iconfont.scss'
import './index.scss'


@inject(stores => ({
  userInfo: stores.counterStore.userInfo
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
  render() {
    const { userInfo } = this.props;
    const { avatarUrl, nickName, gender } = userInfo.userInfo;
    return (
      <Layout isShowNavgate={true} isBack={true} isShowTab={true} title='个人中心'>
        <Image src='../../assets/image/mine-bg.png' className='mine-bg' />
        <View className='mine'>
          <View className='info'>
            <Image className='img' src={avatarUrl} />
            <View className='userinfo'>
              <Text><Text className='name'>{nickName}</Text>,欢迎您！</Text>
              <Text>性别: {gender === 1 ? '男' : '女'}</Text>
            </View>
          </View>

          <View className='count-info'>
            <View>
              <Text>积分</Text>
              <Text>0</Text>
            </View>
            <Text className='line' />
            <View>
              <Text>余额</Text>
              <Text>0.00</Text>
            </View>
          </View>

          <View className='list'>
            <View className='item'>
              <Text className='iconfont icon'>&#xe70b;</Text>
              <Text className='text'>我的订单</Text>
              <Text className='iconfont enter'>&#xe629;</Text>
            </View>
            <View className='item'>
              <Text className='iconfont icon'>&#xe66f;</Text>
              <Text className='text'>我的预约</Text>
              <Text className='iconfont enter'>&#xe629;</Text>
            </View>
            <View className='item'>
              <Text className='iconfont icon'>&#xe61f;</Text>
              <Text className='text'>优惠券</Text>
              <Text className='iconfont enter'>&#xe629;</Text>
            </View>
            <View open-type='contact' className='item'>
              <Text className='iconfont icon'>&#xe642;</Text>
              <Text className='text'>在线客服</Text>
              <Text className='iconfont enter'>&#xe629;</Text>
              <button open-type='contact' className='btn'/>
            </View>
            <View className='item'>
              <Text className='iconfont icon'>&#xe615;</Text>
              <Text className='text'>绑定手机</Text>
              <Text className='iconfont enter'>&#xe629;</Text>
            </View>
            <View className='item'>
              <Text className='iconfont icon'>&#xe619;</Text>
              <Text className='text'>意见反馈</Text>
              <Text className='iconfont enter'>&#xe629;</Text>
            </View>
          </View>
        </View>
      </Layout>

    )
  }
}

export default Index 
