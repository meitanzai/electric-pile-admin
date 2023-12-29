<template>
    <div>
        <h3>前台系统状态</h3>
        <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="8" class="pie">
                <div id="onlineUser" style="width: 100%;height: 100%;"></div>
            </el-col>
            <el-col :span="8" class="pie">
                <div id="onlineStationr" style="width: 100%;height: 100%;"></div>
            </el-col>
            <el-col :span="8" class="pie">
                <div id="onlinePile" style="width: 100%;height: 100%;"></div>
            </el-col>
        </el-row>
        <h3>各个电站订单数量及成交额</h3>
        <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="18">
                <div id="orderNumber" style="width: 100%;height: 600px;"></div>
            </el-col>
            <el-col :span="6"></el-col>
        </el-row>
    </div>
</template>

<script>
    import { getOnlineInfo, getOrderInfo } from '@/api/echarts.js';
    export default {
        name: 'ElectricPileAdminIndex',

        data() {
            return {
                userOnline: null,
                stationOnline: null,
                pileOnline: null,
                stationOrder: null,

            };
        },
        created() {
            this.getAllOnlineInfo();
            this.getAllStationOrder();

        },

        mounted() {
            
        },

        methods: {
            getAllOnlineInfo() {
                getOnlineInfo().then(res => {
                    if (res.data.code === 200) {
                        this.userOnline = res.data.data.user;
                        this.stationOnline = res.data.data.station;
                        this.pileOnline = res.data.data.pile;
                    }
                    this.OnlineChart();
                })
            },
            getAllStationOrder() {
                getOrderInfo().then(res => {
                    if (res.data.code === 200) {
                        this.stationOrder = res.data.data;
                        this.OrderNumber();
                    }
                })
            },
            OrderNumber() {
                const OrderNumberChart = this.$echarts.init(document.getElementById('orderNumber'));
                const nameArr = [];
                const numberArr = [];
                const moneyArr = [];
                this.stationOrder.forEach(element => {
                    nameArr.push(element.name);
                    numberArr.push(element.number);
                    moneyArr.push(element.money);
                });
                const option4 = {
                    title: {
                        text: '电站订单数量及成交额'
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        }
                    },
                    legend: {},
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    yAxis: {
                        type: 'value',
                        boundaryGap: [0, 0.01]
                    },
                    xAxis: {
                        type: 'category',
                        data: nameArr
                    },
                    series: [
                        {
                            name: '订单数量',
                            type: 'bar',
                            data: numberArr
                        },
                        {
                            name: '成交额',
                            type: 'bar',
                            data: moneyArr
                        }
                    ]
                };
                OrderNumberChart.setOption(option4);
            },
            OnlineChart() {
                // 基于准备好的dom，初始化echarts实例
                const OnlineUserChart = this.$echarts.init(document.getElementById('onlineUser'));
                const OnlineStationChart = this.$echarts.init(document.getElementById('onlineStationr'));
                const OnlinePileChart = this.$echarts.init(document.getElementById('onlinePile'));

                const option1 = {
                    title: {
                        text: '用户',
                        left: 'center'
                    },
                    tooltip: {
                        trigger: 'item'
                    },
                    legend: {
                        orient: 'vertical',
                        left: 'left'
                    },
                    series: [
                        {
                            type: 'pie',
                            radius: '50%',
                            data: this.userOnline,
                            emphasis: {
                                itemStyle: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
                };
                const option2 = {
                    title: {
                        text: '电站',
                        left: 'center'
                    },
                    tooltip: {
                        trigger: 'item'
                    },
                    legend: {
                        orient: 'vertical',
                        left: 'left'
                    },
                    series: [
                        {
                            type: 'pie',
                            radius: '50%',
                            data: this.stationOnline,
                            emphasis: {
                                itemStyle: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
                };
                const option3 = {
                    title: {
                        text: '电桩',
                        left: 'center'
                    },
                    tooltip: {
                        trigger: 'item'
                    },
                    legend: {
                        orient: 'vertical',
                        left: 'left'
                    },
                    series: [
                        {
                            type: 'pie',
                            radius: '50%',
                            data: this.pileOnline,
                            emphasis: {
                                itemStyle: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
                };
                OnlineUserChart.setOption(option1);
                OnlineStationChart.setOption(option2);
                OnlinePileChart.setOption(option3);
            }

        },
    };
</script>

<style scoped>
    .pie {
        height: 300px;
    }
</style>