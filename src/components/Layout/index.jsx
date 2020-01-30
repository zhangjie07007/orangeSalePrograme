import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import NavgateBar from '../navgateBar'
import TabBar from '../TabBar'
import { observer, inject } from '@tarojs/mobx'
import './index.scss'

class Index extends Component {

  defaultProps = {
    isShowNavgate: true,
    isShowTab: true,
    opacity:0.4,
    page: 'index',
    title: 'index',isBack:true
  }

  constructor(props) {
    super(props)
    this.state = {
      height: 0,
      titleHeight: 0
    }
  }

  componentDidMount() {
    Taro.getSystemInfo().then(message => {
      this.setState({
        height: message.screenHeight,
        titleHeight: message.screenHeight * 0.075
      })
    })
  }



  render() {
    const { titleHeight, height} = this.state;
    const { children, isShowTab, isShowNavgate, page, title,isBack ,opacity} = this.props;

    return (
      <View className='layout'>
        {isShowNavgate ? <NavgateBar isBack={isBack} title={title} titleHeight={titleHeight} /> : ''}

        {isShowTab ? <TabBar opacity={opacity} page={page} /> : ''}

        {children}
      </View>
    )
  }
}

export default Index 
