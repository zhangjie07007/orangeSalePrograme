import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import '../../scss/iconfont.scss'
import './index.scss'


class Index extends Component {



    render() {
        return (
            <View className='float'>
                <button open-type='contact'/>
                
                <Text className='iconfont icon'>&#xe622;</Text>
      </View>
        )
    }
}

export default Index 
