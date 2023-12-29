<template>
  <div class="side">
    <el-menu style="min-height:100%; overflow-x:hidden" background-color=#304156
      text-color=#ccc active-text-color=white :unique-opened="true" router="">
      <div v-for="item in menus" :key="item.id">
        <div v-if="item.path">
          <el-menu-item :index="item.path">
            <i :class="item.icon"></i>
            <span slot="title">{{item.name}}</span>
          </el-menu-item>
        </div>
        <div v-else>
          <el-submenu :index="item.id+'' ">
            <template slot="title">
              <i :class="item.icon"></i>
              <span slot="title">{{item.name}}</span>
            </template>
            <div v-for="subItem in item.children" :key="subItem.id">
              <el-menu-item :index="subItem.path">
                <i :class="subItem.icon"></i>
                <span slot="title">{{subItem.name}}</span>
              </el-menu-item>
            </div>
          </el-submenu>
        </div>
      </div>
    </el-menu>
  </div>
</template>

<script>

  export default {
    name: 'ElectricPileAdminAsider',
    data() {
      return {
        menus: sessionStorage.getItem("menus") ? JSON.parse(sessionStorage.getItem("menus")) : [],
        opens: sessionStorage.getItem("menus") ? JSON.parse(sessionStorage.getItem("menus")).map(v => v.id + '') : [],
      };
    },

    mounted() {

    },

    methods: {
    },
  };
</script>

<style scoped>
  .side {
    height: 100%;
  }

  .el-menu-vertical-demo {
    height: 100%;
  }
</style>