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
      <Layout isShowNavgate={true} isBack={true} isShowTab={true} title='购物车'>
        <Image src='../../assets/image/shopping-bg.png' className='mine-bg' />
      </Layout>

    )
  }
}

export default Index 
