import Taro, {Component} from '@tarojs/taro'
import {View, Button, Text} from '@tarojs/components'
import TabBar from '../../components/TabBar'
import NavgateBar from '../../components/navgateBar'
import Layout from '../../components/Layout'
import {observer, inject} from '@tarojs/mobx'

import './index.scss'


@inject('counterStore')
@observer
class Index extends Component {



  componentWillMount() {
  }




  componentDidMount() {
  }

  componentWillUnmount() {
  }

  config = {
    navigationBarTitleText: '卖橙子的小菇凉',
    navigationStyle:'custom',
  };

  componentDidShow() {
  }

  componentDidHide() {
  }

  increment = () => {
    const {counterStore} = this.props;
    counterStore.increment()
  };

  decrement = () => {
    const {counterStore} = this.props;
    counterStore.decrement()
  };

  incrementAsync = () => {
    const {counterStore} = this.props;
    counterStore.incrementAsync()
  };

  render() {
    const {counterStore: {counter}} = this.props;
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
