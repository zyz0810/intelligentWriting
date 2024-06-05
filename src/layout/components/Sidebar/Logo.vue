<template>
  <div class="sidebar-logo-container" :class="{'collapse':collapse}">
    <transition name="sidebarLogoFade">
      <router-link v-if="collapse" key="collapse" class="sidebar-logo-link" to="/">
        <img v-if="logo" :src="logo" class="sidebar-logo">
        <h1 v-else class="sidebar-title">{{ title }}111 </h1>
      </router-link>
      <router-link v-else key="expand" class="sidebar-logo-link" to="/">
<!--        <img v-if="logo" :src="logo" class="sidebar-logo">-->
        <h1 class="sidebar-title"><span class="f18">康药多 | </span>{{ title }}</h1>
      </router-link>
    </transition>
  </div>
</template>

<script>
  import logo from '@/assets/image/logo.png'
export default {
  name: 'SidebarLogo',
  props: {
    collapse: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      title: '运营中心后台',
      logo: logo
    }
  }
}
</script>

<style lang="scss" scoped>
.sidebarLogoFade-enter-active {
  transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}

.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: 56px;
  line-height: 56px;
  /*background: #2b2f3a;*/
  text-align: center;
  overflow: hidden;
  box-shadow: 0 1px 4px rgba(0,21,41,0.08);

  & .sidebar-logo-link {
    height: 100%;
    width: 100%;

    & .sidebar-logo {
      width: 32px;
      height: 32px;
      vertical-align: middle;
      margin-right: 20px;
    }

    & .sidebar-title {
      display: inline-block;
      margin: 0;
      /*color: #fff;*/
      font-weight: 600;
      line-height: 56px;
      font-size: 14px;
      letter-spacing: 3px;
      /*font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;*/
      vertical-align: middle;
    }
  }

  &.collapse {
    .sidebar-logo {
      margin-right: 0px;
    }
  }
}
</style>
