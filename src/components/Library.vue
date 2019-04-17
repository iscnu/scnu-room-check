<template>
<div id="lib-room">
<!--  <group class="areaPopUp">-->
<!--    <popup-picker @on-change="handleLibAreaChange" placeholder="请选择校区(南海暂无数据)" value-text-align="center" :data="options" ref="picker" :columns="1" v-model="libAreaSelected" show-name></popup-picker>-->
<!--  </group>-->
  <div style="background-color: white;min-height: 25rem;">
    <Room
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
import Room from './libRoom';
export default {
  name: 'Library',
  components: {
    Group,
    Cell,
    PopupPicker,
    Room
  },
  props: {
    roomData: {
      type: Array
    }
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
      lastUpdateTime: ''
    };
  }
};
</script>

<style scoped>

</style>
