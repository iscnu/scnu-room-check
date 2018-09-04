<template>
    <div class="columns table-room is-mobile has-text-centered">
      <span :class="rows " class="has-text-centered">
        <span>{{room_items.name}}</span>
      </span>
        <span v-for="(status, index) in statuses"
              :class="[status ? 'busy' : 'empty', rows]"
              @click="handleGridClick($event)"
              :key="index"
              :roomIndex="roomIndex"
              :status_index="index">
          <span>{{ status ? '有课' : '无课'}}</span>
          <div v-if="status" class="modal">
            <div class="modal-background"></div>
              <div class="modal-card">
              <header class="modal-card-head">
                <p class="modal-card-title">{{status.place}} - {{classMap[index]}}</p>
              </header>
              <section class="modal-card-body is-flex">
                <table class="table">
                  <tbody>
                    <tr>
                      <th>课程</th>
                      <td>{{status.name}}</td>
                    </tr>
                    <tr>
                    <th>老师</th>
                    <td>{{status.teacher.join(', ')}}</td>
                  </tr>
                  <tr>
                    <th>开课学院</th>
                    <td>{{status.department}}</td>
                  </tr>
                  <tr>
                    <th>节次</th>
                    <td>{{classList[index]}}</td>
                  </tr>
                  </tbody>
                </table>
              </section>
              <footer class="modal-card-foot">
                <button class="button is-primary" aria-label="close">关闭</button>
              </footer>
            </div>
          </div>
          <div v-else class="modal">
              <div class="modal-background"></div>
              <div class="modal-card">
              <header class="modal-card-head">
                <p class="modal-card-title">{{room_items.name}} - {{classMap[index]}}</p>
              </header>
              <div class="modal-card-body is-flex" style="padding: 0">
                <section class="section">
                  无课情况暂不包括课室借用等上课以外的情况
                </section>
              </div>
              <footer class="modal-card-foot">
                <button class="button is-primary" aria-label="close">关闭</button>
              </footer>
            </div>
          </div>
      </span>
    </div>
</template>

<script>
import Table from './table';
export default {
  name: 'row',
  components: { Table },
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
    },
    processOrder (arr) {
      let out = [];
      let first = arr[0];
      let end = arr[0];
      for (let i = 1; i < arr.length; i++) {
        if (arr[i] === end + 1) {
          end = arr[i];
          if (i + 1 === arr.length) {
            out.push(`${first}-${end}`);
          }
        } else {
          out.push(`${first}-${end}`);
          first = arr[i];
          end = arr[i];
        }
      }
      return out;
    }
  },
  data () {
    return {
      classMap: ['第1-2节', '第3-4节', '第5-6节', '第7-8节', '第9-11节'],
      statuses: this.room_items.status
    };
  },
  computed: {
    classList () {
      let out = [];
      const statuses = this.room_items.status;
      for (let item of statuses) {
        if (item.order) {
          const order = item.order;
          if (order.length === 1) { out.push(order[0]); }
          let beg = order[0];
          let ending = order[0];
          for (let i = 1; i < order.length; i++) {
            if (order[i] === ending + 1) {
              ending = order[i];
              if (i + 1 === order.length) {
                out.push(`${beg}-${ending}`);
              }
            } else {
              out.push(`${beg}-${ending}`);
              beg = order[i];
              ending = order[i];
            }
          }
        } else {
          out.push(false);
        }
      }
      return out;
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
    /*.modal-content {*/
      /*p {*/
        /*!*font-size: 1.2rem;*!*/
      /*}*/
    /*}*/
    /*.box {*/
      /*background-color: #efefef;*/
    /*}*/
    .modal-card-head {
      p {
        font-size: 1.1rem;
      }
    }
    .modal-card-body {
      justify-content: center;
      .table {
        /*color: red;*/
        justify-self: center;
        th {
          text-align: right;
          min-width: 5em;
          padding: 0.3em 0.3em !important;
        }
        th, td {
          font-size: 1rem;
          border: 0;
          padding: 0.3em 0.5em;
        }
      }
      .section {
        font-size: 1rem;
        min-height: 5rem;
      }
    }
  }
  .modal-card-foot {
    justify-content: center;
    .button.is-primary {
      width: 5.5rem;
    }
    padding: 12px;
  }
</style>
