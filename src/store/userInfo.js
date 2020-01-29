import { observable,action,toJS } from 'mobx'
import Taro from '@tarojs/taro'


class userInfo {
  @observable userInfo = {}

  @action.bound
  getUserInfo = () => {
    Taro.getUserInfo().then(info=>{
      const {userInfo} = info;
      this.userInfo = userInfo;
    })
  }
}

export default new userInfo()