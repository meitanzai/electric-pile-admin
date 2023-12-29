<template>
    <div>
        <el-container>
            <el-header>
                <div class="text-item">
                    <el-form :inline="true" :model="WarnListQuery">
                        <el-form-item label="编号">
                            <el-input v-model="WarnListQuery.id" placeholder="输入订单编号"></el-input>
                        </el-form-item>
                        <el-form-item label="电桩编号">
                            <el-input v-model="WarnListQuery.pileId" placeholder="输入电桩编号"></el-input>
                        </el-form-item>
                        <el-form-item label="告警类型">
                            <el-select v-model="WarnListQuery.warnType" placeholder="类型">
                                <el-option label="系统故障" value="1"></el-option>
                                <el-option label="电路故障" value="2"></el-option>
                                <el-option label="未知故障" value="3"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="告警细节">
                            <el-input ttype="textarea" v-model="WarnListQuery.detail" placeholder="输入告警内容"></el-input>
                        </el-form-item>
                        <el-form-item label="状态">
                            <el-select v-model="WarnListQuery.status" placeholder="状态">
                                <el-option label="待解决" value="1"></el-option>
                                <el-option label="维修中" value="2"></el-option>
                                <el-option label="已解决" value="3"></el-option>
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
                    <el-button size="small" style="margin-left:5px" type="primary" @click="handleAdd()">新增<i
                            class="el-icon-circle-plus"></i></el-button>
                    <el-button size="small" style="margin-left:5px" type="danger" @click="delBatch()">批量删除<i
                            class="el-icon-remove"></i></el-button>
                </div>
                <div>
                    <el-table :data="tableData" v-loading="listLoading" @selection-change="handleSelectionChange" border
                        style="width: 100%" :row-style="{height:'40px'}" :cell-style="{padding:'0px'}">
                        <el-table-column type="selection" width="55" align="center"></el-table-column>
                        <el-table-column label="编号" width="50" align="center">
                            <template slot-scope="scope">{{scope.row.id}}</template>
                        </el-table-column>
                        <el-table-column label="电桩编号" width="80" align="center">
                            <template slot-scope="scope">{{scope.row.pileId}}</template>
                        </el-table-column>
                        <el-table-column label="告警类型" width="100" align="center">
                            <template slot-scope="scope">
                                <el-tag type="danger" effect="plain" v-if="scope.row.warnType===1">系统故障</el-tag>
                                <el-tag type="primary" effect="plain" v-if="scope.row.warnType===2">电路故障</el-tag>
                                <el-tag type="success" effect="plain" v-if="scope.row.warnType===3">未知故障</el-tag>
                            </template>
                        </el-table-column>
                        <el-table-column label="告警内容" width="260" align="center">
                            <template slot-scope="scope">{{scope.row.detail}}</template>
                        </el-table-column>
                        <el-table-column label="告警时间" width="140" align="center">
                            <template slot-scope="scope">{{scope.row.warnTime | dateTimeFormat}}</template>
                        </el-table-column>
                        <el-table-column label="状态" width="90" align="center">
                            <template slot-scope="scope">
                                <el-tag type="danger" effect="plain" v-if="scope.row.status===1">待解决</el-tag>
                                <el-tag type="primary" effect="plain" v-if="scope.row.status===2">维修中</el-tag>
                                <el-tag type="success" effect="plain" v-if="scope.row.status===3">已解决</el-tag>
                            </template>
                        </el-table-column>
                        <el-table-column label="生成时间" width="140" align="center">
                            <template slot-scope="scope">{{scope.row.creatTime | dateTimeFormat}}</template>
                        </el-table-column>
                        <el-table-column label="编辑时间" width="140" align="center">
                            <template slot-scope="scope">{{scope.row.modifyTime | dateTimeFormat}}</template>
                        </el-table-column>
                        <el-table-column fixed="right" label="操作" width="160" align="center">
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
                        layout="total, sizes, prev, pager, next, jumper" :page-size="WarnListQuery.pageSize"
                        :page-sizes="[1,5,10]" :current-page.sync="WarnListQuery.pageNum" :total="total">
                    </el-pagination>
                </div>
            </el-footer>
        </el-container>

        <el-dialog title="告警信息" :visible.sync="dialogFormVisible" width="25%">
            <el-form label-width="80px" size="small">
                <el-form-item label="电桩编号">
                    <el-input v-model="form.pileId" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="告警类型">
                    <el-radio-group v-model="form.warnType">
                        <el-radio label="1">系统故障</el-radio>
                        <el-radio label="2">电路故障</el-radio>
                        <el-radio label="3">未知故障</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="告警内容">
                    <el-input type="textarea" v-model="form.detail" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="告警时间">
                    <el-date-picker v-model="form.warnTime" type="datetime" placeholder="选择日期时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="状态">
                    <el-radio-group v-model="form.status">
                        <el-radio label="1">待解决</el-radio>
                        <el-radio label="2">维修中</el-radio>
                        <el-radio label="3">已解决</el-radio>
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
    import { deleteBatch, getAllWarn, deleteById, addWarn } from '@/api/warn.js'
    const defaultWarnListQuery = {
        id: null,
        pileId: null,
        warnType: null,
        detail: null,
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
                WarnListQuery: Object.assign({}, defaultWarnListQuery),
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
                this.WarnListQuery = Object.assign({}, defaultWarnListQuery);
                this.load();
            },
            handleSearchList() {
                this.WarnListQuery.pageNum = 1;
                this.load();
            },
            //打开新增用户对话框
            handleAdd() {
                this.dialogFormVisible = true;
                this.form = {};//如果之前有填过值，可以置空 
            },
            //实现新增用户
            save() {
                addWarn(this.form).then(res => {
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
                this.WarnListQuery.pageSize = val;  //获取当前每页显示条数
                this.load();
            },
            handleCurrentChange(val) {/*传递过来当前是第几页*/
                console.log(`当前页: ${val}`);
                this.WarnListQuery.pageNum = val;   //获取当前第几页
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
                getAllWarn(this.WarnListQuery).then(res => {
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