import Taro, {Component} from '@tarojs/taro'
import {View, Button, Text} from '@tarojs/components'
import {observer, inject} from '@tarojs/mobx'


@inject('counterStore')
@observer
class Index extends Component {

  config = {
    navigationBarTitleText: '个人中心'
  };


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
      <View className='index'>
        center
      </View>
    )
  }
}

export default Index 
