import Taro, {Component} from '@tarojs/taro'
import {View, Button, Text} from '@tarojs/components'
import TabBar from '../../components/TabBar'
import NavgateBar from '../../components/navgateBar'
import Layout from '../../components/Layout'
import {observer, inject} from '@tarojs/mobx'
import './index.scss'


@inject((stores)=>({
  userInfo:stores.counterStore.userInfo
}))
@observer
class Index extends Component {

  componentWillMount() {
  }

  componentDidMount() {
    const {userInfo} = this.props;
    const {getUserInfo} = userInfo;
    getUserInfo()
    Taro.navigateTo({
      url:'/pages/mine/index'
    })
    // Taro.getUserInfo().then(res=>{
    //   console.log(res)
    // })
  }

  config = {
    navigationBarTitleText: '卖橙子的小菇凉',
    navigationStyle:'custom',
  };

  
  render() {
    const {} = this.props;
    return (
      <Layout isShowTab={true}  isShowNavgate={true} title='卖橘子的小菇凉'>
      <View className='index'>
        <Image className='bg' src='../../assets/image/background-img.png' />
      </View>
      </Layout>
      
    )
  }
}

export default Index 
