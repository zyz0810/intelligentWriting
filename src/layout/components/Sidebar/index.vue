<template>
<!--  <div :class="{'has-logo':showLogo}">-->
    <div>
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
<!--      <div class="nav_create">-->
        <el-dropdown class="nav_create" placement="bottom">
          <el-button type="primary" icon="el-icon-plus">新建</el-button>
          <el-dropdown-menu slot="dropdown" class="nav_create_dropdown">
            <el-dropdown-item><i class="el-icon-document m_r30 f20"></i>新建文档</el-dropdown-item>
            <el-dropdown-item><i class="el-icon-document m_r30 f20"></i>AI模板</el-dropdown-item>
            <el-dropdown-item><i class="el-icon-document m_r30 f20"></i>上传文档</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
<!--      </div>-->
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical">
        <sidebar-item v-for="route in constantRoutes" :key="route.path" :item="route" :base-path="route.path" />
        <!--<sidebar-item v-for="route in $router.options.routes" :key="route.path" :item="route" :base-path="route.path" />-->
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Logo from './Logo'
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'
import { asyncRoutes, constantRoutes } from '@/router'

export default {
  components: { SidebarItem, Logo },
  computed: {
    ...mapGetters([
      'permission_routes',
      'sidebar'
    ]),
    activeMenu() {

      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    variables() {
      return variables
    },
    constantRoutes(){
      return constantRoutes
    },
    isCollapse() {
      // return !this.sidebar.opened
      return false
    }
  }
}
</script>
<style lang="scss">
  .nav_create_dropdown{
    width: 210px;
  }
</style>
