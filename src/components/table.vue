<template>
    <div class="Table table">
      <div class="columns table-header is-mobile has-text-centered">
        <span :class="rows" v-for="item in headerList" :key="item">{{item}}</span>
      </div>
      <row
        v-for="(room, index) in rooms"
        :room_items="room"
        :rows="real_rows"
        :key="room.name"
        :class="[(index % 2 === 0) ? 'even' : 'odd']"
        :roomIndex="index"
        @displayDetail="displayDetail"
      >
      </row>
    </div>
</template>

<script>
import row from '@/components/row';
export default {
  name: 'Table',
  props: ['rooms', 'headerList'],
  components: {
    row
  },
  data () {
    return {
      rows: 'column is-2-mobile is-size-7-mobile',
      real_rows: 'rows column is-2-mobile is-size-7-mobile'
    };
  },
  methods: {
    displayDetail (event) {
      console.log(event.currentTarget);
      event.currentTarget.querySelector('.modal').classList.toggle('is-active');
    }
  }
};
</script>

<style lang="scss" scoped>
  .rows, .table-header {
    background-color:   hsl(0, 0%, 96%);
  }

  .table-header, .table-room {
    align-items: center;
  }
  .Table {
    min-height: 25rem;
    .table-room {
      line-height: 1.8rem;
    }

    .odd {
      background-color:  hsl(0, 0%, 92%);
      background-clip: content-box;
    }
    .even {
      background-color:  hsl(0, 0%, 99%);
      background-clip: content-box;
    }
    $side-margin:0.2rem;
    .columns {
      margin-right: $side-margin;
      margin-left: $side-margin;
    }
  }
  .table-header {
    span {
      padding: 0.65rem 0.45rem;
      word-spacing: 0.01px;
    }
  }
</style>
