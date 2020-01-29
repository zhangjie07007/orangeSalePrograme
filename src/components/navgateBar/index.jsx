import Taro, {Component} from '@tarojs/taro'
import {View, Button, Text} from '@tarojs/components'
import {observer, inject} from '@tarojs/mobx'
import './index.scss'
import '../../scss/iconfont.scss'

@inject('counterStore')
@observer
class Index extends Component {

  defaultProps= {
    isBack:true,
    height:200,
    titleHeight:0,
    title:''
  }

  constructor(props){
    super(props)
    const {bottom,height} = wx.getMenuButtonBoundingClientRect();
    this.state={
      titleHeight:bottom,
      lineHeight:height
    }
  }

  

  render() {
    const {isBack,title} = this.props;
    const {titleHeight,lineHeight} = this.state;
    return (
      <View className='navgate'>
          <Text onClick={()=>{
              Taro.navigateBack();
          }} className='icon iconfont back' style={isBack?{top:titleHeight+'rpx'}:{top:titleHeight+'rpx',display:'none'}}>&#xe602;</Text>
  <Text className='title' style={{top:titleHeight+'rpx'}}>{title}</Text>
      </View>
    )
  }
}

export default Index 
