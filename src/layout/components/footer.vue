<template>
    <!-- 底部栏 -->
    <div class="footer">
        <div class="footerfont">
            <a href="http://00.00.00.00/" target="_blank" class="no-decoration">用户体验实验室</a>
            "2022 | 版权所有 ©"
            <a href="http://www.xxxx.com/" target="_blank">贵州大学</a>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ElectricPileAdminFooter',

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
    .footer{
        height: 40px;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        border-radius: 2px;
    }
    .footerfont{
        color: #76838f;
        font-size: smaller;
        margin-right: 20px;
    }

</style>