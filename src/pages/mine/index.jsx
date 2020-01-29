import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import Layout from '../../components/Layout'
import { observer, inject } from '@tarojs/mobx'

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
        </View>
      </Layout>

    )
  }
}

export default Index 
