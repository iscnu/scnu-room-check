<template>
<div v-if="!loading" id="app">
  <!--<navbar-->
  <!--:menu="menu"-->
  <!--@toggleActive="toggleActive"-->
  <!--/>-->
  <group class="areaPopUp">
    <popup-picker @on-change="handleAreaChange" placeholder="请选择地点" value-text-align="center" :data="options" ref="picker" :columns="2" v-model="areaSelected" show-name></popup-picker>
  </group>
  <Table
    :rooms="rooms"
    :headerList="headerList"
  />
  <p class="updateTime">数据更新于
    <span>
      {{updateDay}}
    </span>
  </p>
 </div>
</template>

<script>
import { PopupPicker, Cell, Group } from 'vux';
import Table from './components/table';
// import navbar from './components/navbar';
import axios from 'axios';
export default {
  name: 'App',
  components: {
    Table,
    Group,
    // navbar,
    Cell,
    PopupPicker
  },
  data () {
    return {
      loading: '',
      options: [{
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
      areaSelected: [],
      headerList: ['教室', '1-2节', '3-4节', '5-6节', '7-8节', '9-11节'],
      rooms: [],
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
      ],
      updateDay: ''
    };
  },
  created () {
    if (window.localStorage.areaSelected) {
      this.areaSelected = window.localStorage.areaSelected.split(',');
    }
    if (this.areaSelected[1]) {
      this.queryData();
    }
  },
  mounted () {
    if (!window.localStorage.areaSelected) {
      document.querySelector('.areaPopUp').querySelector('.vux-tap-active').click();
    }
  },
  methods: {
    queryData () {
      this.loading = true;
      const url = `https://ci.fengkx.top/api2/${this.areaSelected[1]}`;
      // const url = `https://localhost:3000/${this.areaSelected[1]}`;
      console.log(url);
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
    toggleActive (event) { event.currentTarget.classList.toggle('is-active'); },
    handleAreaChange () {
      window.localStorage.areaSelected = this.areaSelected;
      this.queryData();
    }
  },
  computed: {
    updateTime () {
      const now = new Date(this.time);
      const ret = {};
      ret.year = now.getFullYear();
      ret.month = (now.getMonth() + 1);
      ret.date = now.getDate();
      ret.string = now.toUTCString();
      ret.hour = now.getHours() < 10 ? '0' + now.getHours() : now.getHours();
      ret.min = now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes();
      return ret;
    }
  }
};
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
</style>
<style lang="less">
  @import '~vux/src/styles/reset.less';
</style>
