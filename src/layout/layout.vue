<template>
    <div class="box">
        <el-container class="container">
            <!-- 顶栏区域、侧边栏、中间展示部分、底栏区域 -->
            <el-header class="header" height="50px" width="100%">
                <Header></Header>
            </el-header>
            <el-container class="desk-container">
                <!-- 侧边栏、中间展示部分、底栏区域 -->
              <el-aside class="asider" width="180px">
                <Asider></Asider>
              </el-aside>
              <el-container>
                <!-- 中间、底栏区域 -->
                <el-main class="main">
                    <Main></Main>
                </el-main>
                <el-footer class="footer" height="40px">
                    <Footer></Footer>
                </el-footer>
              </el-container>
            </el-container>
          </el-container>
    </div>
</template>

<script>
    import {Header,Asider,Main,Footer} from './components';
    export default {
        name: 'ElectricPileAdminLayout',
        components:{
            Header,
            Asider,
            Main,
            Footer
        },

        data() {
            return {
                
            };
        },

        mounted() {
            
        },

        methods: {
            
        },
    };
</script>

<style scoped>
    .box{
        position: absolute;
        top:0;
        bottom:0;
        left:0;
        right:0;
    }
    .container{
        height: 100%;
    }
    .header{
        padding-left: 10px;
        padding-right: 10px;
    }
    .main{
        position: absolute;
        top:50px;
        left:200px;
        right:0px;
        bottom:40px;
        padding: 10px;
    }
    .footer{
        position: absolute;
        bottom: 0px;
        left: 200px;
        right: 0px;
        padding: 10px;
    }
    

</style>