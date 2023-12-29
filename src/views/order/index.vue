<template>
    <div>
        <el-container>
            <el-header>
                <div class="text-item">
                    <el-form :inline="true" :model="OrderListQuery">
                        <el-form-item label="订单编号">
                            <el-input v-model="OrderListQuery.id" placeholder="输入订单编号"></el-input>
                        </el-form-item>
                        <el-form-item label="用户编号">
                            <el-input v-model="OrderListQuery.userId" placeholder="输入用户编号"></el-input>
                        </el-form-item>
                        <el-form-item label="电桩编号">
                            <el-input v-model="OrderListQuery.pileId" placeholder="输入电桩编号"></el-input>
                        </el-form-item>
                        <el-form-item label="订单状态">
                            <el-select v-model="OrderListQuery.status" placeholder="状态">
                                <el-option label="未支付" value="1"></el-option>
                                <el-option label="已支付" value="2"></el-option>
                                <el-option label="已评价" value="3"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="handleSearchList()">查询</el-button>
                            <el-button type="primary" @click="resetListForm()">重置</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-header>
            <el-main>
                <div class="select-delete">
                    <el-button size="small" style="margin-left:5px" type="danger" @click="delBatch()">批量删除<i
                            class="el-icon-remove"></i></el-button>
                </div>
                <div>
                    <el-table :data="tableData" v-loading="listLoading" @selection-change="handleSelectionChange" border
                        style="width: 100%" :row-style="{height:'40px'}" :cell-style="{padding:'0px'}">
                        <el-table-column type="selection" width="55" align="center"></el-table-column>
                        <el-table-column label="订单编号" width="50" align="center">
                            <template slot-scope="scope">{{scope.row.id}}</template>
                        </el-table-column>
                        <el-table-column label="用户编号" width="80" align="center">
                            <template slot-scope="scope">{{scope.row.userId}}</template>
                        </el-table-column>
                        <el-table-column label="电桩编号" width="80" align="center">
                            <template slot-scope="scope">{{scope.row.pileId}}</template>
                        </el-table-column>
                        <el-table-column label="订单金额" width="80" align="center">
                            <template slot-scope="scope">{{scope.row.money}}</template>
                        </el-table-column>
                        <el-table-column label="状态" width="180" align="center">
                            <template slot-scope="scope">
                                <el-tag type="danger" effect="plain" v-if="scope.row.status===1">未支付</el-tag>
                                <el-tag type="primary" effect="plain" v-if="scope.row.status===2">已支付</el-tag>
                                <el-tag type="success" effect="plain" v-if="scope.row.status===3">已评价</el-tag>
                            </template>
                        </el-table-column>
                        <el-table-column label="充电开始时间" width="180" align="center">
                            <template slot-scope="scope">{{scope.row.startTime | dateTimeFormat}}</template>
                        </el-table-column>
                        <el-table-column label="充电结束时间" width="180" align="center">
                            <template slot-scope="scope">{{scope.row.overTime | dateTimeFormat}}</template>
                        </el-table-column>
                        <el-table-column label="生成时间" width="180" align="center">
                            <template slot-scope="scope">{{scope.row.creatTime | dateTimeFormat}}</template>
                        </el-table-column>
                        <el-table-column fixed="right" label="操作" width="180" align="center">
                            <template slot-scope="scope">
                                <p>
                                    <el-button type="primary" @click="handleUpdate(scope.$index, scope.row)"
                                        size="small">编辑</el-button>
                                    <el-button type="danger" @click="handleDelete(scope.$index, scope.row)"
                                        size="small">删除</el-button>
                                </p>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </el-main>
            <el-footer>
                <div class="pagination-container">
                    <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                        layout="total, sizes, prev, pager, next, jumper" :page-size="OrderListQuery.pageSize"
                        :page-sizes="[1,5,10]" :current-page.sync="OrderListQuery.pageNum" :total="total">
                    </el-pagination>
                </div>
            </el-footer>
        </el-container>

        <el-dialog title="用户信息" :visible.sync="dialogFormVisible" width="25%">
            <el-form label-width="80px" size="small">
                <el-form-item label="订单金额">
                    <el-input v-model="form.money" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="订单状态">
                    <el-radio-group v-model="form.status">
                        <el-radio label="1" border>未支付</el-radio>
                        <el-radio label="2" border>已完成</el-radio>
                        <el-radio label="3" border>已评价</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="save()">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import { deleteBatch, getAllOrder, deleteById, addOrder } from '@/api/order.js'
    const defaultOrderListQuery = {
        id: null,
        userId: null,
        pileId: null,
        status:null,
        pageNum: 1,
        pageSize: 5
    };
    export default {
        name: 'ElectricPileAdminList',

        data() {
            return {
                form: {},
                tableData: [],
                OrderListQuery: Object.assign({}, defaultOrderListQuery),
                listLoading: true,
                dialogFormVisible: false,
                dialogOrderVisible: false,
                dialogRechargeVisible: false,
                dialogConsumptionVisible: false,
                total: '',
                multipleSelection: [],
            };
        },

        mounted() {

        },
        created() {
            this.load();
        },

        methods: {
            //搜索重置
            resetListForm() {
                this.OrderListQuery = Object.assign({}, defaultOrderListQuery);
                this.load();
            },
            handleSearchList() {
                this.OrderListQuery.pageNum = 1;
                this.load();
            },
            //打开新增用户对话框
            handleAdd() {
                this.dialogFormVisible = true;
                this.form = {};//如果之前有填过值，可以置空 
            },
            //实现新增用户
            save() {
                addOrder(this.form).then(res => {
                    if (res.data.code === '200') {
                        this.$message.success("保存成功");
                        this.dialogFormVisible = false;
                        this.load();
                    } else {
                        this.$message.error("保存失败");
                    }
                })
            },
            //编辑用户
            handleUpdate(index, row) {  //编辑
                this.form = row;//把当前行的数据赋值给form
                this.dialogFormVisible = true;
            },
            //多行选择
            handleSelectionChange(val) {
                console.log(val);
                this.multipleSelection = val;
            },
            handleSizeChange(val) {/*传递过来当前是第几页*/
                console.log(`每页 ${val} 条`);
                this.OrderListQuery.pageSize = val;  //获取当前每页显示条数
                this.load();
            },
            handleCurrentChange(val) {/*传递过来当前是第几页*/
                console.log(`当前页: ${val}`);
                this.OrderListQuery.pageNum = val;   //获取当前第几页
                this.load();
            },
            //批量删除
            delBatch() {
                let ids = this.multipleSelection.map(v => v.id);//map这个方法可以实现将multipleSelection中的对象扁平化处理。
                console.log(ids);
                deleteBatch(ids).then(res => {
                    if (res.data.code === '200' && res.data.data === true) {
                        this.$message.success("批量删除成功");
                        this.load();
                    } else {
                        this.$message.error("批量删除失败");
                    }
                })
            },
            //根据选择行的id删除
            handleDelete(index, row) {
                deleteById(row.id).then(res => {
                    if (res.data.code === '200') {
                        this.$message.success("删除成功");
                        this.load();
                    } else {
                        this.$message.error("删除失败");
                    }
                })
            },
            //将请求数据封装为一个方法
            load() {
                //使用axios封装的request，获取所有数据        
                getAllOrder(this.OrderListQuery).then(res => {
                    this.listLoading = false;
                    console.log(res);
                    this.tableData = res.data.data.list;
                    this.total = res.data.data.total;
                })
            },

        },
    };
</script>

<style scoped>
    .text-item {
        display: flex;
        justify-content: flex-end;
    }

    .select-delete {
        display: flex;
        justify-content: flex-start;
        margin-bottom: 5px;
    }
</style>