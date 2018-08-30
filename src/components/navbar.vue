<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <div class="navbar-item">
        <a href="https://i.scnu.edu.cn">
          <img src="../assets/images/logo.png" alt="logo">
        </a>
        <div class="main-title title is-5 has-text-grey has-text-centered">
          我要自习
        </div>
      </div>
      <div class="navbar-burger"
           data-target="navMenu"
           @click="handleBurgerClick($event)"
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
    <div class="navbar-menu" id="navMenu">
      <div class="navbar-end">
        <a v-for="item in menu" class="navbar-item" :key="item.text" :href="item.url" >{{item.text}}</a>
        <!--dropdown  -->
        <!--<div class="navbar-item has-dropdown is-hoverable">-->
          <!--<a class="navbar-link dropdownLink">-->
            <!--更多-->
          <!--</a>-->
          <!--<div class="navbar-dropdown">-->
            <!--<a v-for="pulldownItem in pulldownMenu"-->
               <!--class="navbar-item"-->
               <!--:key="pulldownItem.text"-->
               <!--:href="pulldownItem.url"-->
               <!--target="_blank">-->
              <!--{{pulldownItem.text}}-->
            <!--</a>-->
          <!--</div>-->
        <!--</div>-->
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'navbar',
  props: {
    menu: {
      type: Array
      // required: true
    }
    // pulldownMenu: {
    //   type: Array
      // required: true
    // }
  },
  methods: {
    handleBurgerClick (event) {
      this.$emit('toggleActive', event)
      const id = event.currentTarget.getAttribute('data-target')
      document.getElementById(id).classList.toggle('is-active')
    }
  }
}
</script>

<style lang="scss" scoped>
  .dropdownLink {
    padding-left: 0;
  }
</style>
