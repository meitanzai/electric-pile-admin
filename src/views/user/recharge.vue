<template>
    <div>
        <el-container>
            <el-header>
                <div class="text-item">
                    <el-form :inline="true" :model="RechargeListQuery">
                        <el-form-item label="充值编号">
                            <el-input v-model="RechargeListQuery.id" placeholder="输入充值编号"></el-input>
                        </el-form-item>
                        <el-form-item label="用户编号">
                            <el-input v-model="RechargeListQuery.userId" placeholder="输入用户编号"></el-input>
                        </el-form-item>
                        <el-form-item label="状态">
                            <el-select v-model="RechargeListQuery.status" placeholder="状态">
                                <el-option label="未支付" value="1"></el-option>
                                <el-option label="已支付" value="2"></el-option>
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
                        <el-table-column label="编号" width="100" align="center">
                            <template slot-scope="scope">{{scope.row.id}}</template>
                        </el-table-column>
                        <el-table-column label="用户编号" width="100" align="center">
                            <template slot-scope="scope">{{scope.row.userId}}</template>
                        </el-table-column>
                        <el-table-column label="支付宝订单编号" width="320" align="center">
                            <template slot-scope="scope">{{scope.row.alipayId}}</template>
                        </el-table-column>
                        <el-table-column label="金额" width="100" align="center">
                            <template slot-scope="scope">{{scope.row.money}}</template>
                        </el-table-column>
                        <el-table-column label="状态" width="100" align="center">
                            <template slot-scope="scope">
                                <el-tag type="danger" effect="plain" v-if="scope.row.status===1">未支付</el-tag>
                                <el-tag type="success" effect="plain" v-if="scope.row.status===2">已支付</el-tag>
                            </template>
                        </el-table-column>
                        <el-table-column label="充值时间" width="120" align="center">
                            <template slot-scope="scope">{{scope.row.chargeTime | dateFormat}}</template>
                        </el-table-column>
                        <el-table-column label="创建时间" width="120" align="center">
                            <template slot-scope="scope">{{scope.row.creatTime | dateFormat}}</template>
                        </el-table-column>
                        <el-table-column fixed="right" label="操作" width="200" align="center">
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
                        layout="total, sizes, prev, pager, next, jumper" :page-size="RechargeListQuery.pageSize"
                        :page-sizes="[1,5,10]" :current-page.sync="RechargeListQuery.pageNum" :total="total">
                    </el-pagination>
                </div>
            </el-footer>
        </el-container>

        <el-dialog title="充值记录信息" :visible.sync="dialogFormVisible" width="25%">
            <el-form label-width="80px" size="small">
                <el-form-item label="用户编号">
                    <el-input v-model="form.userId" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="金额">
                    <el-input v-model="form.money" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="充值时间">
                    <el-date-picker v-model="form.chargeTime" type="datetime" placeholder="选择日期时间">
                    </el-date-picker>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" v-if="form.status===1" @click="saveOrUpdate()">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import { deleteBatch, deleteById, getAllRecharge, addOrUpdateRecharge } from '@/api/recharge.js'
    const defaultRechargeListQuery = {
        id: null,
        userId: null,
        status: null,
        pageNum: 1,
        pageSize: 5
    };
    export default {
        name: 'ElectricPileAdminList',

        data() {
            return {
                form: {},
                tableData: [],
                RechargeListQuery: Object.assign({}, defaultRechargeListQuery),
                listLoading: true,
                dialogFormVisible: false,
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
                this.RechargeListQuery = Object.assign({}, defaultRechargeListQuery);
                this.load();
            },
            handleSearchList() {
                this.RechargeListQuery.pageNum = 1;
                this.load();
            },
            //打开新增用户对话框
            handleAdd() {
                this.dialogFormVisible = true;
                this.form = {};//如果之前有填过值，可以置空 
            },
            //实现新增用户
            saveOrUpdate() {
                addOrUpdateRecharge(this.form).then(res => {
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
                this.RechargeListQuery.pageSize = val;  //获取当前每页显示条数
                this.load();
            },
            handleCurrentChange(val) {/*传递过来当前是第几页*/
                console.log(`当前页: ${val}`);
                this.RechargeListQuery.pageNum = val;   //获取当前第几页
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
                getAllRecharge(this.RechargeListQuery).then(res => {
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