<template>
<div id="app" class="container">
  <navbar
  :menu="menu"
  @toogleActive="toogleActive"
  />
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
    :updateTime="updateTime"
  />
</div>
</template>

<script>
import Select from './components/select'
import Table from './components/table'
import navbar from './components/navbar'
import axios from 'axios'
export default {
  name: 'App',
  components: {
    Table,
    Select,
    navbar
  },
  data () {
    return {
      areaOptions: ['石牌', '大学城', '南海'],
      areaSelected: 0,
      buildingSelected: 0,
      // headerList: ['教室', '1-2 节', '3-4 节', '5-6 节', '7-8 节', '9-11 节'],
      headerList: ['教室', '1-2', '3-4', '5-6', '7-8', '9-11'],
      rooms: [],
      time: '',
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
  created: function () {
    const path = window.location.pathname.substring(1)
    console.log(path)
    let url = ''
    switch (path) {
      case 'sp':
        url = ''
        break
      case 'dxc':
        url = ''
        break
      case 'nh':
        url = ''
        break
      default :
        url = ''
    }
    axios.get(url, {
      headers: {
      },
      responseType: 'json'
    })
      .then(res => {
        this.rooms = res.data.data
        this.time = res.data.time
      }).catch(err => {
        console.log(err)
      })
  },
  methods: {
    changeAreaOption (index) {
      this.areaSelected = index
      this.buildingSelected = 0
    },
    changeBuildingOption (index) { this.buildingSelected = index },
    toogleActive (event) { event.currentTarget.classList.toggle('is-active') }
  },
  computed: {
    buildingOptions () {
      switch (this.areaSelected) {
        case 0:
          return (['一课', '图书馆'])
        case 1:
          return (['教学楼', '图书馆'])
        case 2:
          return (['教学楼'])
      }
    },
    updateTime () {
      const now = new Date(this.time)
      return now
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
</style>
