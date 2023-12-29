<template>
    <div class="box">
        <el-container class="container">
            <el-header class="head">
                <h3 style="font-size:180%; margin-top: 90px; color: #409eff;">注册成为系统新用户</h3>
            </el-header>
            <el-main class="main">
                <el-row :gutter="20" class="el-row">
                    <el-col :span="8">
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
                                <el-form-item prop="realname">
                                    <el-input v-model="form.realname" placeholder="输入真实姓名"></el-input>
                                </el-form-item>
                                <el-form-item prop="phone">
                                    <el-input v-model="form.phone" placeholder="输入电话"></el-input>
                                </el-form-item>
                                <el-form-item prop="email">
                                    <el-input v-model="form.email" placeholder="输入邮箱"></el-input>
                                </el-form-item>
                                <el-form-item prop="remark">
                                    <el-input type="textarea" v-model="form.remark" placeholder="输入申请信息"></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="primary" @click="register('form')">注册</el-button>
                                    <el-button type="danger" @click="b2Login()">取消</el-button>
                                </el-form-item>
                            </el-form>
                        </div>
                    </el-col>
                    <el-col :span="8"></el-col>
                </el-row>
            </el-main>
            <el-footer>
                <div class="footer">
                    <div class="footerfont">
                        <a href="http://00.00.00.00/" target="_blank" class="no-decoration">用户体验实验室</a>
                        "2023 | 版权所有 ©"
                        <a href="http://www.xxxx.com/" target="_blank">贵州大学</a>
                    </div>
                </div>
            </el-footer>
        </el-container>
    </div>
</template>

<script>
    import { nameRule, passwordRule } from '@/utils/vaildate.js'
    import { managerRegister } from '@/api/manager.js';
    export default {
        name: 'ProjectSupportAdminLogin',
        data() {
            return {
                form: {
                    username: '',
                    password: '',
                    nickname:'',
                    phone:'',
                    email:'',
                    remark:''

                },
                rules: {
                    username: [{ validator: nameRule, trigger: 'blur' }],
                    password: [{ validator: passwordRule, trigger: 'blur' }]
                },

            };
        },

        mounted() {

        },
        methods: {
            register(form) {
                this.$refs[form].validate((valid) => {
                    if (valid) {
                        managerRegister(this.form).then(res => {
                            if (res.data.code === 200) {
                                this.$message({ message: res.data.message, type: 'success' });
                                this.$router.push('/login');
                            }
                        })
                    } 
                });
            },
            resetForm(form) {
                this.$refs[form].resetFields();
            },
            b2Login(){
                this.$router.push('/login')
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
        background-image: url("@/assets/img/register.png");
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