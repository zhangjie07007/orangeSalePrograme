import { observable, action, toJS } from 'mobx'
import Taro from '@tarojs/taro'
import lodash from 'lodash'
import data from '../utilities/data'


class Shopping {
    @observable shoppingCard = {}
    @observable allData = []
    @observable selected = {}
    @observable buyList = { list: [] }
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
    setBuyList = (data) => {
        let isPush = true;
        let index = 0;
        let price = 0;
        let wrapFree = 0;
        let carriage = 0;
        let list = this.buyList.list
        list.forEach((item, i) => {
            if (item.id === data.id) {
                isPush = false;
                index = i;
            }
        })
        // wrapFree:0,
        //     carriage:0,
        if (isPush) {
            list.push(data)
        } else {
            list.splice(index, 1)
        }
        list.forEach(list => {
            price += list.price * list.discount * list.count;
            wrapFree += list.wrapFree;
            carriage += list.carriage;
        })


        this.buyList = {
            list, 
            carriage, 
            wrapFree, 
            price, 
            all: (price + wrapFree + carriage)
        }
    }

    @action.bound
    setSelect = (selected) => {
        this.selected = selected
    }

    @action.bound
    changeShopCard = (item, type, selected) => {
        let newData = this.allData;
        let parentIndex = 0;
        let childIndex = 0;
        let i = 0

        newData.forEach((items, index) => {
            if (items.id == item.parentId) {
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
        if (type === 'sub') {
            if (newData[parentIndex].data[childIndex].count < 1 || newData[parentIndex].data[childIndex].count < 1) {
                return
            }
            newData[parentIndex].data[childIndex].count -= 1;
            newData[0].data[i].count -= 1
        } else if (type === 'add') {
            newData[parentIndex].data[childIndex].count += 1;
            newData[0].data[i].count += 1
        }

        this.allData = newData
        this.allData.forEach(select => {
            if (select.id === selected.id) {
                this.selected = select;
            }
        })
        this.getShoppingCard(newData)
    }

    getShoppingCard = data => {
        let count = 0;
        let card = [];
        data[0].data.forEach(item => {
            if (item.count > 0) {
                card.push({checked:false,...item})
                count += item.count
            }
        })
        this.shoppingCard = {
            count, card
        }
    }

}

export default new Shopping()