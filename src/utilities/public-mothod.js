import Taro from '@tarojs/taro';


export const goToLink = option => {
    const { params = {}, url = '' } = option;
    let urlStr = '/' + url;
    if (Object.keys(params).length) {
        const arrTemp = Object.keys(params);
        for (let i = 0, len = arrTemp.length; i < len; i++) {
            if (i === (len - 1)) {
                urlStr += `?${arrTemp[i]}=${params[arrTemp[i]]}`
            } else {
                urlStr += `?${arrTemp[i]}=${params[arrTemp[i]]}&`
            }
        }
    }
    const urlArr = Taro.getCurrentPages();
    if (urlArr[urlArr.length - 1].route === url) {
        return
    }

    Taro.navigateTo({
        url: urlStr,
    })
}