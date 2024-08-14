<template>
  <div :class="{ 'has-logo': showLogo }">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu class="left-menu" :default-active="activeMenu" :collapse="isCollapse"
        :background-color="variables.menuBg" :text-color="variables.menuText" :unique-opened="false"
        :active-text-color="variables.menuActiveText" :collapse-transition="false" mode="horizontal">
        <img src="/src/assets/logo.png" class="logo" alt="logo" height="45" width="45">
        <sidebar-item v-for="route in permission_routes" :key="route.path" :item="route" :base-path="route.path" :is-top-route="true" />
        <el-dropdown class="avatar-dropdown" trigger="click" placement="bottom-end">
          <div class="avatar-wrapper" >
            <img :src="avatar + '?imageView2/1/w/80/h/80'" class="user-avatar" alt="">
            <el-icon class="el-icon-caret-bottom" size="small">
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

export default defineComponent({
  name: 'Sidebar',
  components: {
    CaretBottom,
    SidebarItem,
    Logo
  },
  data() {
    return {
      variables: {
        menuBg: '#3498db',
        menuText: '#fff',
        menuActiveText: 'rgba(255,255,255,0.49)'
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
    ...mapState(store.user, [
      'avatar'
    ]),
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
    }
  },
  methods: {
    async logout() {
      await store.user().logout();
      this.$router.push(`/login?redirect=${this.$route.fullPath}`);
    }
  }
});
</script>
<style>
.logo {
  margin: 5px 10px 5px 10px;
}
.avatar-dropdown {
  position: absolute;
  top: 0;
  right: 0;
  margin-right: 20px;
}
.avatar-wrapper {
  display: flex;
  align-items: center;
  cursor: pointer;
}
.user-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  margin-right: 8px;
  margin-top: 10px;
}
</style>
