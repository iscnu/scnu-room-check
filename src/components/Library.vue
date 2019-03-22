<template>
<div id="lib-room">
  <group class="areaPopUp">
    <popup-picker @on-change="handleLibAreaChange" placeholder="请选择校区(南海暂无数据)" value-text-align="center" :data="options" ref="picker" :columns="1" v-model="libAreaSelected" show-name></popup-picker>
  </group>
  <div style="background-color: white;min-height: 25rem;">
    <div v-if="!libAreaSelected.length" class="newTip">请先点击上方按钮选择你所在的校区</div>
    <Room
      v-if="!loading"
      v-for="(room) in roomData"
      :name="room.name"
      :total="room.total"
      :empty="room.empty"
      :key="room.name"
    />
  </div>

</div>
</template>

<script>
import { PopupPicker, Cell, Group } from 'vux';
import axios from 'axios';
import Room from './libRoom';
export default {
  name: 'Library',
  components: {
    Group,
    Cell,
    PopupPicker,
    Room
  },
  data () {
    return {
      loading: true,
      options: [{ // popup-picker 选项
        name: '石牌校区',
        value: 'sp'
      }, {
        name: '大学城校区',
        value: 'dxc'
      }
      ],
      libAreaSelected: [],
      roomData: [],
      lastUpdateTime: ''
    };
  },
  created () {
    if (this.libAreaSelected[0]) {
      this.queryData();
    }
  },
  methods: {
    handleLibAreaChange () {
      this.queryData();
    },
    async queryData () {
      const url = `https://i.scnu.edu.cn/zixi/api/lib/${this.libAreaSelected[0]}`;
      try {
        const res = await axios.get(url);
        this.roomData = res.data.data;
        this.lastUpdateTime = res.data.lastUpdated;
        this.loading = false;
      } catch (e) {
        console.log(e);
        this.loading = false;
      }
    }
  }
};
</script>

<style scoped>

</style>
