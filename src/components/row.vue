<template>
    <div class="columns table-room is-mobile has-text-centered">
      <span :class="rows " class="has-text-centered">
        <span>{{room_items.name}}</span>
        <span class="is-hidden-mobile has-text-grey">|</span>
        <span class=" is-hidden-mobile has-text-grey">容量：{{room_items.seats}}
        </span>
      </span>
        <span v-for="(status, index) in room_items.status"
              :class="[status ? 'empty' :'busy', rows]"
              :key="index" >
          <span>{{ status ? '空置' : '占用'}}</span>
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
    }
  },
  computed: {
  }
}
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

</style>
