/* eslint-disable */
<template>
<div id="app" class="container">
  <navbar
  :menu="menu"
  @toggleActive="toggleActive"
  />
  <group class="areaPopUp">
    <popup-picker @on-change="handleAreaChange" placeholder="请选择地点" value-text-align="center" :data="options" ref="picker" :columns="2" v-model="areaSelected" show-name></popup-picker>
  </group>
  <!--<div class="columns is-mobile Select">-->
    <!--<Select-->
      <!--:options="areaOptions"-->
      <!--:selected="areaSelected"-->
      <!--@toogleActive="toogleActive"-->
      <!--@changeOption="changeAreaOption"-->
    <!--/>-->
    <!--<Select-->
      <!--:options="buildingOptions"-->
      <!--:selected="buildingSelected"-->
      <!--@toogleActive="toogleActive"-->
      <!--@changeOption="changeBuildingOption"-->
    <!--/>-->
  <!--</div>-->
  <Table
    :rooms="rooms"
    :headerList="headerList"
  />
  <!--<p class="updateTime">数据更新于-->
    <!--<time :datetime="updateTime.string">-->
      <!--{{updateTime.year}}年{{updateTime.month}}月{{updateTime.date}}日{{updateTime.hour}}:{{updateTime.min}}-->
    <!--</time>-->
  <!--</p>-->
</div>
</template>

<script>
import { PopupPicker, Cell, Group } from 'vux'
// import Select from './components/select'
import Table from './components/table'
import navbar from './components/navbar'
import axios from 'axios'
export default {
  name: 'App',
  components: {
    Table,
    Group,
    // Select,
    navbar,
    Cell,
    PopupPicker
  },
  data () {
    return {
      options: [{
        name: '石牌校区',
        value: 'sp',
        parent: 0
      }, {
        name: '大学城',
        value: 'dxc',
        parent: 0
      }, {
        name: '南海校区',
        value: 'nh',
        parent: 0
      }, {
        name: '一课北座',
        value: '1',
        parent: 'sp'
      }, {
        name: '一课南座',
        value: '2',
        parent: 'sp'
      }, {
        name: '一课东西座',
        value: '3',
        parent: 'sp'
      }, {
        name: '教1栋',
        value: '4',
        parent: 'dxc'
      }, {
        name: '教2栋',
        value: '5',
        parent: 'dxc'
      }, {
        name: '教3栋',
        value: '6',
        parent: 'dxc'
      }, {
        name: '教4栋',
        value: '7',
        parent: 'dxc'
      }, {
        name: '教5栋',
        value: '8',
        parent: 'dxc'
      }, {
        name: '教6栋',
        value: '9',
        parent: 'dxc'
      }, {
        name: '教A栋',
        value: '10',
        parent: 'nh'
      }, {
        name: '教B栋',
        value: '11',
        parent: 'nh'
      }, {
        name: '教C栋',
        value: '12',
        parent: 'nh'
      }],
      // areaOptions: [{id: 'sp', text: '石牌'}, {id: 'dxc', text: '大学城'}, {id: 'nh', text: '南海'}],
      areaSelected: [],
      // buildingSelected: 0,
      headerList: ['教室', '1-2节', '3-4节', '5-6节', '7-8节', '9-11节'],
      // headerList: ['教室', '1-2', '3-4', '5-6', '7-8', '9-11'],
      rooms: [],
      // time: 0,
      // menu: [
      //   {
      //     text: '石牌校区',
      //     url: '/sp'
      //   },
      //   {
      //     text: '大学城',
      //     url: '/dxc'
      //   },
      //   {
      //     text: '南海校区',
      //     url: '/nh'
      //   }
      // ],
      // pulldownMenu: [
      menu: [
        {
          text: '网络协会 ISCNU',
          url: 'https://i.scnu.edu.cn'
        },
        {
          text: '新陶园BBS',
          url: 'http://bbs.scnu.edu.cn'
        },
        {
          text: '华师百科',
          url: 'http://wiki.scnu.edu.cn'
        },
        {
          text: '陶园PT',
          url: 'http://bbs.scnu.edu.cn'
        }
      ]
    }
  },
  created () {
    if (window.localStorage.areaSelected) {
      this.areaSelected = window.localStorage.areaSelected.split(',')
    }
    if (this.areaSelected[1]) {
      this.qureyData()
    }
  },
  methods: {
    qureyData () {
      const url = `https://ci.fengkx.top/api2/${this.areaSelected[1]}`
      console.log(url)
      axios.get(url, {
        headers: {},
        responseType: 'json'
      })
        .then(res => {
          this.rooms = res.data
        }).catch(err => {
          console.log(err)
        })
    },
    // changeAreaOption (index) {
    //   this.areaSelected = index
    //   this.buildingSelected = 0
    // },
    // changeBuildingOption (index) { this.buildingSelected = index },
    toggleActive (event) { event.currentTarget.classList.toggle('is-active') },
    handleAreaChange () {
      window.localStorage.areaSelected = this.areaSelected
      this.qureyData()
    }
  },
  computed: {
    // buildingOptions () {
    //   switch (this.areaSelected) {
    //     case 0:
    //       return (['一课', '图书馆'])
    //     case 1:
    //       return (['教学楼', '图书馆'])
    //     case 2:
    //       return (['教学楼'])
    //   }
    // },
    updateTime () {
      const now = new Date(this.time)
      const ret = {}
      ret.year = now.getFullYear()
      ret.month = (now.getMonth() + 1)
      ret.date = now.getDate()
      ret.string = now.toUTCString()
      ret.hour = now.getHours() < 10 ? '0' + now.getHours() : now.getHours()
      ret.min = now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes()
      return ret
    }
  }
}
</script>

<style lang="scss">
  body {
    line-height: 1.8;
  }
  $side-margin: 0.1rem;
  .Select {
    margin: $side-margin;
  }

  .Table {
    margin-top: 1rem;
  }
  .updateTime {
    margin-top: 1rem;
    color: #999;
    text-align: center;
    font-size: smaller;
  }
  .areaPopUp {
    .weui-cells {
      margin-top: 0 !important;
    }
    .weui-cells::before {
      border-top: 1px solid #EEE;
    }
    .weui-cell__ft {
      display: none;
    }
  }
  .vux-popup-header-right {
    color: hsl(171, 100%, 41%) !important;
  }
  .vux-popup-header-left {
    color: hsl(0, 0%, 29%)  !important;
  }
</style>
<style lang="less">
  @import '~vux/src/styles/reset.less';
</style>
