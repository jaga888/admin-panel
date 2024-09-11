<template>
  <div :class="{ 'has-logo': showLogo }">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu class="left-menu" :default-active="activeMenu" :collapse="isCollapse" menu-trigger="click"
        :background-color="variables.menuBg" :text-color="variables.menuText" :unique-opened="true"
        :active-text-color="variables.menuActiveText" :collapse-transition="false" mode="horizontal">
        <a href="/">
          <LogoSvg class="logo" height="28" width="28"></LogoSvg>>
        </a>
        <sidebar-item v-for="route in permission_routes" :key="route.path" :item="route" :base-path="route.path" :is-top-route="true" />
        <el-dropdown class="avatar-dropdown" trigger="click" placement="bottom-end">
          <div class="avatar-wrapper" >
          <span class="user-name">{{ fullName }}</span>
            <el-icon class="el-icon-caret-bottom" size="large" style="margin-top: 10px;">
              <CaretBottom />
            </el-icon>
          </div>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="logout">
                <span style="display:block;">Logout</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapState } from 'pinia';
import Logo from './Logo';
import SidebarItem from './SidebarItem';
// import variables from '@/styles/variables.modules.scss';
import store from '@/store';
import { CaretBottom } from '@element-plus/icons-vue';
import LogoSvg from '/src/assets/senex.svg';

export default defineComponent({
  name: 'Sidebar',
  components: {
    CaretBottom,
    SidebarItem,
    Logo,
    LogoSvg
  },
  data() {
    return {
      variables: {
        menuBg: '#1088CB',
        menuText: 'rgba(255,255,255,0.50)',
        menuActiveText: 'rgba(255, 255, 255, 0.75)'
      }
    };
  },
  computed: {
    ...mapState(store.app, ['sidebar']),
    ...mapState(store.permission, {
      permission_routes: 'routes'
    }),
    ...mapState(store.settings, {
      secondMenuPopup: 'secondMenuPopup'
    }),
    ...mapState(store.user, ['name']),
    activeMenu() {
      const route = this.$route;
      const { meta, path } = route;
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return path;
    },
    showLogo() {
      return store.settings().sidebarLogo;
    },
    isCollapse() {
      if (this.secondMenuPopup) {
        return true;
      }
      return !this.sidebar.opened;
    },
    fullName() {
      return `${this.name}`;
    }
  },
  methods: {
    async logout() {
      await store.user().logout();

      window.location.href = '/login';
    }
  }
});
</script>
<style>
.logo {
  margin: 14px 10px 10px 16px;
}
.avatar-dropdown {
  position: absolute;
  top: 10px;
  right: 0;
  color:rgba(255,255,255,0.5) !important;
  margin-right: 20px;
}
.avatar-dropdown :hover{
  color: rgba(255,255,255,0.75);
}
.avatar-wrapper {
  display: flex;
  align-items: center;
  cursor: pointer;
}
.user-name {
  font-size: 16px;
  margin-right: 8px;
  margin-top: 10px;
}
.el-sub-menu__title {
  padding: 0 15px 0 6px!important;
  margin: 0 !important;
  font-size: 15px !important;
  font-weight: 550;
}
.el-sub-menu__icon-arrow{
  right: 0px !important;
}
</style>
