<template>
    <div>
        <!-- 顶栏 -->
        <el-row :gutter="20" class="header_all">
            <el-col :span="6" class="header_left">
                <div class="logo">
                    <img src="@/assets/icon/icon_setting.png">
                </div>
                <div class="font">
                    <h1>充电桩预约后台管理系统</h1>		
                </div>
                <div class="font_version">
                    v1.0.0
                </div>
            </el-col>
            <el-col :span="10"></el-col>
            <el-col :span="8" class="header_right">
                <div>
                    <img src="@/assets/icon/icon_user.png">
                    <el-dropdown class="dropdown">
                        <span class="el-dropdown-link">
                            <span>{{manager.role}}: {{manager.realname}}</span>
                          <i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item @click.native="logout()">退出登录</el-dropdown-item>
                        </el-dropdown-menu>
                      </el-dropdown>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    name: 'ElectricPileAdminHeader',

    data() {
        return {
            manager:sessionStorage.getItem("manager")?JSON.parse(sessionStorage.getItem("manager")):{}
        };
    },

    mounted() {
        
    },

    methods: {
        logout(){
        this.$router.push("/login");
        sessionStorage.removeItem("manager");
        this.$message.success("退出成功");
    }
    },
};
</script>

<style scoped>
    .header_all{
        background-color: #238cff;
        height:50px;
        display: flex;
        justify-content: space-between;
    }
    .header_left{
        display: flex;
        align-items: center;
    }
    .font{
        text-align: center;
        margin-left: 10px;
        color: #ffffff;
        font-size: small;
    }
    .font_version{
        font-size: smaller;
        margin-bottom: 10px;
        color: #ffffff;
    }
    .logo{
        margin-left: 10px;
    }
    .header_right{
        display: flex;
        justify-content: right;
        align-items: center;
    }
    .dropdown{
        margin-left: 10px;
    }
    .el-dropdown-link{
        color: #ffffff;
        margin-right: 20px;
    }
</style>