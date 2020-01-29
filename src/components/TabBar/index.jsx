import Taro, {Component} from '@tarojs/taro'
import {View, Button, Text} from '@tarojs/components'
import {observer, inject} from '@tarojs/mobx'
import {goToLink} from '../../utilities/public-mothod'
import '../../scss/iconfont.scss'
import './index.scss'


@inject('counterStore')
@observer
class Index extends Component {

constructor(props){
    super(props)
    this.state={
        tabParmas:[
            {
                name:'首页',
                src:'pages/index/index',
                id:'home',
                icon:`&#xe784;`,
            },
            {
                name:'个人中心',
                src:'pages/mine/index',
                id:'mine',
                icon:`&#xe67d;`,
            }
        ],
        selected:'home',
        isShowTab:false
    }
}

componentDidMount(){
   this.initTabBar()
    this.setState({
        isShowTab:true
    })
}

initTabBar= () => {
    const urlArr = Taro.getCurrentPages();
    const {tabParmas} = this.state;
    tabParmas.forEach(item=>{
        if(item.src === urlArr[urlArr.length - 1].route){
            this.setState({
                selected :item.id
            })
        }
    })
}


toTabBar =e=>{
    this.setState({
        isShowTab:false
    })
    this.setState({
        selected:e.currentTarget.id
    },()=>{
        const {selected} = this.state;
        if(selected==='mine'){
            goToLink({
                url:'pages/mine/index'
            })
        }else if(selected==='home'){
            goToLink({url:'pages/index/index'})
        }
        
    })
}

componentDidShow() {
    this.initTabBar()
    this.setState({
        isShowTab:true
    })
}

  render() {
    const {counterStore: {counter}} = this.props;
    const {tabParmas,selected,isShowTab} = this.state
    return (
      <View className={`tab-bar ${isShowTab?'show':'hide'}`}>
       <View className={`tab-bar__items ${selected==='home'?'active':''}`} id='home' onClick={this.toTabBar}>
            <Text className='iconfont icon'>&#xe60d;</Text>
            <Text>首页</Text>
        </View>
        <View className={`tab-bar__items ${selected==='mine'?'active':''}`} id='mine' onClick={this.toTabBar}>
            <Text className='iconfont icon'>&#xe6ae;</Text>
            <Text className='text'>个人中心</Text>
        </View>
       </View>
    )
  }
}

export default Index 
