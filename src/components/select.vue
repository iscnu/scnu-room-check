<template>
  <div class="choice column is-half ">
    <div class="dropdown"
         @click="handleDropdownClick($event)"
    >
      <div class="dropdown-trigger">
        <button class="button" style="width: 100%" aria-haspopup="true" aria-controls="dropdown-menu">
          <span>{{ options[selected] }}</span>
          <span class="icon is-small">
            <i class="fas fa-angle-down" aria-hidden="true"></i>
          </span>
        </button>
      </div>
      <!--<select class="has-text-centered">-->
      <div class="dropdown-menu" style="width: 100%">
        <div class="dropdown-content">
          <a class="dropdown-item has-text-centered"
               v-for="(item, index) in options"
               :value="index"
               :key="item"
               @click="handleOptionClick(index)"
          >{{item}}</a>
        </div>
      </div>
    </div>
  </div>
    <!--</select>-->
</template>

<script>
export default {
  props: ['options', 'selected'],
  methods: {
    handleDropdownClick (event) {
      // event.currentTarget.classList.toggle('is-active')
      this.$emit('toogleActive', event);
    },
    handleOptionClick (index) {
      // console.log(index)
      this.$emit('changeOption', index);
    }
  }
};
</script>

<style lang="scss" scoped>
  .choice {
    .dropdown, .dropdown-trigger {
      width: 100%;
    }

    .dropdown-menu {
      width: auto;
    }
    .dropdown-item {
      padding-right: 3rem;
    }
  }
</style>
