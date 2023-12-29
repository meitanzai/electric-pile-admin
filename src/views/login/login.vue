<template>
    <div class="box">
        <el-container class="container">
            <el-header class="head">
                <h1 style="font-size:260%;">欢迎使用充电桩预约后台管理系统</h1>
            </el-header>
            <el-main class="main">
                <el-row :gutter="20" class="el-row">
                    <el-col :span="16">
                        <img src="@/assets/img/img_login.png" height="568">
                    </el-col>
                    <el-col :span="8" class="el-col">
                        <div class="login">
                            <el-form ref="form" label-width="100px" :model="form" :rules="rules" align="center">
                                <el-form-item prop="username">
                                    <el-input v-model="form.username" placeholder="输入用户名"></el-input>
                                </el-form-item>
                                <el-form-item prop="password">
                                    <el-input v-model="form.password" show-password placeholder="输入密码"></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="primary" @click="login('form')">登录</el-button>
                                    <el-button type="danger" @click="resetForm('form')">取消</el-button>
                                </el-form-item>
                                <el-form-item>
                                    <span>没有账号？前往</span>
                                    <el-button type="info" round plain @click="jumpToRegister()">注册</el-button>
                                </el-form-item>
                            </el-form>
                        </div>
                    </el-col>
                </el-row>

            </el-main>
            <el-footer>
                <div class="footer">
                    <div class="footer-font">
                        <a href="http://00.00.00.00/" target="_blank" class="no-decoration">用户体验实验室</a>
                        "2022 | 版权所有 ©"
                        <a href="http://www.xxx.com/" target="_blank">贵州大学</a>
                    </div>
                </div>
            </el-footer>
        </el-container>
    </div>
</template>

<script>
    import { nameRule, passwordRule } from '@/utils/vaildate.js'
    import { managerLogin } from '@/api/manager.js';
    import { setRoutes } from '@/router/index.js';
    export default {
        name: 'ProjectSupportAdminLogin',
        data() {
            return {
                manager: sessionStorage.getItem("manager") ? JSON.parse(sessionStorage.getItem("manager")) : {},
                form: {
                    username: '',
                    password: '',
                },
                rules: {
                    username: [{ validator: nameRule, trigger: 'blur' }],
                    password: [{ validator: passwordRule, trigger: 'blur' }]
                },

            };
        },

        mounted() {

        },
        created() {
            this.form.username = this.manager.username;
            this.form.password = this.manager.password;
        },

        methods: {
            login(form) {
                this.$refs[form].validate((valid) => {
                    if (valid) {
                        managerLogin(this.form).then(res => {
                            if (res.data.code === 200) {
                                //存储用户信息到浏览器
                                sessionStorage.setItem('manager', JSON.stringify(res.data.data));
                                //存储当前用户权限菜单到浏览器
                                sessionStorage.setItem('menus', JSON.stringify(res.data.data.menus));
                                setRoutes()
                                this.$message({ message: res.data.message, type: 'success' });
                                this.$router.replace('/home/home');
                            }
                        })
                            .catch((err) => {
                                console.error(err);
                                this.$message.error("用户名或密码错误！")
                            });
                    } else {
                        console.log(this.form);
                    }
                });
            },
            resetForm(form) {
                this.$refs[form].resetFields();
            },
            jumpToRegister() {
                this.$router.push('/register');
            }

        },
    };
</script>

<style scoped>
    .box {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
    }

    .container {
        height: 100%;
        width: 100%;
    }

    .login {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 400px;
    }

    .main {
        display: flex;
        justify-content: center;
        align-items: center;
        height: calc(100% - 180px);
        width: 100%;
    }

    .el-row {
        height: 100%;
        width: 100%;
    }

    .el-col {
        height: 100%;
        display: flex;
        align-items: center;
    }

    .footer {
        height: 40px;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        border-radius: 2px;
    }

    .footer-font {
        color: #76838f;
        font-size: smaller;
    }
</style>