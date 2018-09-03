<template>
    <div class="columns table-room is-mobile has-text-centered">
      <span :class="rows " class="has-text-centered">
        <span>{{room_items.name}}</span>
      </span>
        <span v-for="(status, index) in room_items.status"
              :class="[status ? 'busy' : 'empty', rows]"
              @click="handleGridClick($event)"
              :key="index"
              :roomIndex="roomIndex"
              :status_index="index">
          <span>{{ status ? '占用' : '空置'}}</span>
          <div v-if="status" class="modal">
            <div class="modal-background"></div>
            <div class="modal-content">
              <div class="box">
                <div class="content">
                  <p>课程： {{status.name}}</p>
                  <p>老师： {{status.teacher[0]}}</p>
                  <p>开课学院： {{status.department}}</p>
                </div>
              </div>
            </div>
            <button class="modal-close is-large" aria-label="close"></button>
          </div>
      </span>
    </div>
</template>

<script>
export default {
  name: 'row',
  props: {
    room_items: {
      type: Object
    },
    rows: {
      type: String
    },
    roomIndex: {
      type: Number
    }
  },
  methods: {
    handleGridClick (event) {
      this.$emit('displayDetail', event);
    },
    closeDetail (event) {
      this.$emit('closeDetail', event);
    }
  }
};
</script>

<style lang="scss" scoped>
  .empty {
    background-color: hsl(171, 100%, 41%);
    background-clip: content-box;
  }

  .busy {
    background-color: hsl(348, 100%, 61%);
    background-clip: content-box;
  }
  $padding-side: 0.45rem;
  $padding-height: 0.8rem;
  span.rows {
    padding: $padding-height $padding-side;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: nowrap;
    @media (min-width: 640px) and (max-width: 1600px){
      min-height: 4rem;
      padding: .8rem 1.8rem;
    }
    @media (max-width: 320px){
      padding: 1rem 0.3rem
    }
  }
  .modal {
    .modal-content {
      p {
        font-size: 1.2rem;
      }
    }
    .box {
      background-color: #efefef;
    }
  }

</style>
