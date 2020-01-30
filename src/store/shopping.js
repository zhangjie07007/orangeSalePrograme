import { observable, action, toJS } from 'mobx'
import Taro from '@tarojs/taro'
import lodash from 'lodash'
import data from '../utilities/data'


class Shopping {
    @observable shoppingCard = {}
    @observable allData = []
    @observable selected = {}
    constructor() {
        let allData = [];
        data.forEach(item => {
            item.data.forEach(data => {
                allData.push(data)
            })
        })
        let sourseData = [
            {
                id: '1000',
                name: '全部果品',
                data: allData
            },
            ...data
        ];
        this.allData = sourseData;
        this.selected = {
            id: '1000',
            name: '全部果品',
            data: allData
        }
    }

    @action.bound
    setAllData = (data) => {
        this.allData = data
    }

    @action.bound
    setSelect = (selected) => {
        this.selected = selected
    }

    @action.bound
    changeShopCard = (item, type, selected) => {
        // console.log(item)
        // console.log(type)
        // console.log(this.allData)
        let newData = this.allData;
        let parentIndex = 0;
        let childIndex = 0;
        let i = 0

        newData.forEach((items, index) => {
            console.log(item.parentId)
            if (items.id == item.parentId) {
                console.log(items)
                parentIndex = index
                items.data.forEach((data, i) => {
                    if (data.id === item.id) {
                        childIndex = i;
                    }
                })
            }
        })
        newData[0].data.forEach((all, index) => {
            if (all.id === item.id) {
                i = index
            }
        })
        console.log(selected);
        newData[parentIndex].data[childIndex].count += 1;
        newData[0].data[i].count += 1
        this.allData = newData
        this.allData.forEach(select=>{
            if(select.id === selected.id){
                this.selected = select;
            }
        })

    }

}

export default new Shopping()