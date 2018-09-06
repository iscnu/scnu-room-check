<template>
<div id="app">
  <group class="areaPopUp">
    <popup-picker @on-change="handleAreaChange" placeholder="请选择地点" value-text-align="center" :data="options" ref="picker" :columns="2" v-model="areaSelected" show-name></popup-picker>
  </group>
  <div style="min-height: 400px;">
    <div v-if="!areaSelected.length" class="newTip">请先点击上方按钮选择你所在的教学楼</div>
    <Table
      v-if="!loading"
      :rooms="rooms"
      :headerList="headerList"
    />
  </div>
  <p v-if="areaSelected.length" class="updateTime">数据更新于
    <span>
      {{updateDay}}
    </span>
  </p>
 </div>
</template>

<script>
import { PopupPicker, Cell, Group } from 'vux';
import Table from './components/table';
import axios from 'axios';
export default {
  name: 'App',
  components: {
    Table,
    Group,
    Cell,
    PopupPicker
  },
  data () {
    return {
      loading: '', // 是否正在请求数据 boolean
      areaSelected: [],
      options: [{ // popup-picker 选项
        name: '石牌校区',
        value: 'sp',
        parent: 0
      }, {
        name: '大学城校区',
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
      headerList: ['教室', '1-2节', '3-4节', '5-6节', '7-8节', '9-11节'], // 表头
      rooms: [], // API得到的各个课室的信息 Array
      updateDay: '' // API得到的数据更新的星期 String 如 本周一
    };
  },
  created () {
    // 若有选择过区域，尽早开始API请求
    if (window.localStorage.areaSelected) {
      this.areaSelected = window.localStorage.areaSelected.split(',');
    }
    if (this.areaSelected[1]) {
      this.queryData();
    }
  },
  methods: {
    queryData () {
      this.loading = true;
      // API: /part/week/day
      const url = `https://i.scnu.edu.cn/ixi/api/${this.areaSelected[1]}`;
      axios.get(url, {
        headers: {},
        responseType: 'json'
      })
        .then(res => {
          this.rooms = res.data.data;
          this.updateDay = res.data.day;
          this.loading = false;
        }).catch(err => {
          console.log(err);
          this.loading = false;
        });
    },
    handleAreaChange () {
      // 选择区域时缓存并请求数据
      window.localStorage.areaSelected = this.areaSelected;
      this.queryData();
    }
  }
};
</script>

<style lang="scss">
  body {
    line-height: 1.8;
  }
  $side-margin: 0.1rem;
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
    border: 1px solid #eee;
    margin: 0.2rem;
    .weui-cells {
      margin-top: 0 !important;
    }
    .weui-cells::before {
      border-top: 0 !important;
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
  .newTip {
    position: absolute;
    top: 200px;
    width: 100%;
    font-size: smaller;
    text-align: center;
    color: rgb(85, 85, 85);
    z-index: 0;
  }
</style>
<style lang="less">
  @import '~vux/src/styles/reset.less';
</style>
