<template>
<div class="room box" :class="[boxColor] ">
  <img src="/static/room.png" style="width: 4.5rem;height: 4.5rem;" alt="自习室">
  <div class="room-info is-size-5-touch is-size-3-widescreen">
    <span class="name">{{this.name}}</span>
    <div class="numbers">
      <span class="total">总共: {{this.total}}</span>
      <span class="empty">空闲: {{this.empty}}</span>
    </div>
  </div>

</div>
</template>

<script>
export default {
  name: 'libRoom',
  props: {
    name: {
      type: String
    },
    total: {
      type: Number
    },
    empty: {
      type: Number
    }
  },
  computed: {
    boxColor () {
      const precent = this.empty / this.total;
      let color;
      if (precent > 0.75) {
        color = 'primary';
      } else if (precent < 0.25) {
        color = 'danger';
      } else {
        color = 'warning';
      }
      return 'has-background-' + color;
    }
  }
};
</script>

<style lang="scss" scoped>
  .room {
    display: flex;
    margin: 1rem;
  }
  .room-info {
    margin-left: 2rem;
    /*margin-right: 5rem;*/
    align-self: center;
    color: #363636;
  }
  .numbers {
    display: flex;
    justify-content: flex-start;
    @media screen and (min-width: 768px) {
      span {
        margin-right: 3rem;
      }
    }
    @media screen and (max-width: 768px) {
      span {
        margin-right: .5rem;
      }
    }
    @media screen and (max-width: 320px) {
      span {
        margin-right: 3px;
      }
    }
  }
</style>
