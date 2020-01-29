import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import Layout from '../../components/Layout'
import { observer, inject } from '@tarojs/mobx'

import './index.scss'


@inject('counterStore')
@observer
class Index extends Component {

  config = {
    navigationBarTitleText: '个人中心',
    navigationStyle: 'custom',
  };


  render() {
    const { counterStore: { counter } } = this.props;
    return (
      <Layout isShowNavgate={true} isBack={true} isShowTab={true} title='个人中心'>
        <Image src='../../assets/image/mine-bg.png' className='mine-bg' />
        <View className='mine'>
          
      </View>
      </Layout>

    )
  }
}

export default Index 
