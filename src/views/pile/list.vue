<template>
    <div>
        <el-container>
            <el-header>
                <div class="text-item">
                    <el-form :inline="true" :model="PileListQuery">
                        <el-form-item label="充电桩编号">
                            <el-input v-model="PileListQuery.id" placeholder="输入充电桩编号"></el-input>
                        </el-form-item>
                        <el-form-item label="电站编号">
                            <el-input v-model="PileListQuery.stationId" placeholder="输入电站编号"></el-input>
                        </el-form-item>
                        <el-form-item label="状态">
                            <el-select v-model="PileListQuery.status" placeholder="状态">
                                <el-option label="空闲中" value="1"></el-option>
                                <el-option label="充电中" value="2"></el-option>
                                <el-option label="有故障" value="3"></el-option>
                                <el-option label="不可用" value="4"></el-option>
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
                        <el-table-column label="编号" width="60" align="center">
                            <template slot-scope="scope">{{scope.row.id}}</template>
                        </el-table-column>
                        <el-table-column label="电站编号" width="60" align="center">
                            <template slot-scope="scope">{{scope.row.stationId}}</template>
                        </el-table-column>
                        <el-table-column label="价格" width="100" align="center">
                            <template slot-scope="scope">{{scope.row.price}}/小时</template>
                        </el-table-column>
                        <el-table-column label="功率" width="100" align="center">
                            <template slot-scope="scope">{{scope.row.power}}千瓦</template>
                        </el-table-column>
                        <el-table-column label="状态" width="200" align="center">
                            <template slot-scope="scope">
                                <el-tag type="success" effect="plain" v-if="scope.row.status===1">空闲中</el-tag>
                                <el-tag type="info" effect="plain" v-if="scope.row.status===2">充电中</el-tag>
                                <el-tag type="danger" effect="plain" v-if="scope.row.status===3">有故障</el-tag>
                                <el-tag type="danger" effect="plain" v-if="scope.row.status===4">不可用</el-tag>
                            </template>
                        </el-table-column>
                        <el-table-column label="建立时间" width="100" align="center">
                            <template slot-scope="scope">{{scope.row.creatTime | dateFormat}}</template>
                        </el-table-column>
                        <el-table-column label="信息" width="300" align="center">
                            <template slot-scope="scope">{{scope.row.information}}</template>
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
                        layout="total, sizes, prev, pager, next, jumper" :page-size="PileListQuery.pageSize"
                        :page-sizes="[1,5,10]" :current-page.sync="PileListQuery.pageNum" :total="total">
                    </el-pagination>
                </div>
            </el-footer>
        </el-container>

        <el-dialog title="充电桩信息" :visible.sync="dialogFormVisible" width="28%">
            <el-form label-width="90px" size="small">
                <el-form-item label="电站编号">
                    <el-input v-model="form.stationId" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="状态">
                    <el-select v-model="form.status" placeholder="状态">
                        <el-option label="空闲中" value="1"></el-option>
                        <el-option label="使用中" value="2"></el-option>
                        <el-option label="有故障" value="3"></el-option>
                        <el-option label="不可用" value="4"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="价格">
                    <el-input v-model="form.price" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="功率">
                    <el-input v-model="form.power" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="图片">
                    <single-upload v-model="form.picture"></single-upload>
                </el-form-item>
                <el-form-item label="信息">
                    <el-input v-model="form.information" autocomplete="off"></el-input>
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
    import { deleteBatch, getAllPile, deleteById, addPile } from '@/api/pile.js';
    import SingleUpload from '@/components/upload/singleUpload';
    const defaultPileListQuery = {
        id: null,
        stationId: null,
        status: null,
        pageNum: 1,
        pageSize: 5
    };
    export default {
        name: 'ElectricPileAdminList',
        components:{SingleUpload},
        data() {
            return {
                form: {},
                tableData: [],
                PileListQuery: Object.assign({}, defaultPileListQuery),
                listLoading: true,
                dialogFormVisible: false,
                total: '',

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
                this.PileListQuery = Object.assign({}, defaultPileListQuery);
                this.load();
            },
            handleSearchList() {
                this.PileListQuery.pageNum = 1;
                this.load();
            },
            //打开新增用户对话框
            handleAdd() {
                this.dialogFormVisible = true;
                this.form = {};//如果之前有填过值，可以置空 
            },
            //实现新增用户
            save() {
                addPile(this.form).then(res => {
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
                this.PileListQuery.pageSize = val;  //获取当前每页显示条数
                this.load();
            },
            handleCurrentChange(val) {/*传递过来当前是第几页*/
                console.log(`当前页: ${val}`);
                this.PileListQuery.pageNum = val;   //获取当前第几页
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
                getAllPile(this.PileListQuery).then(res => {
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