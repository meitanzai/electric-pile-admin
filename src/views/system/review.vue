<template>
    <div>
        <div style="padding:10px">
            <el-button style="margin-left:5px" type="danger" @click="delBatch">批量删除<i
                    class="el-icon-remove"></i></el-button>
            <el-input style="width:250px; margin-left: 500px;" suffix-icon="el-icon-search" placeholder="请输入名称搜索"
                v-model="managerListQuery.name"></el-input>
            <el-button style="margin-left:5px" type="primary" @click="load()">搜索</el-button>
            <el-button style="margin-left:5px" type="warning" plain @click="reset()">重置</el-button>
        </div>
        <el-table :data="tableData" row-key="id" border @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="id" label="ID" width="60" align="center">
            </el-table-column>
            <el-table-column prop="username" label="用户名" width="80" align="center">
            </el-table-column>
            <el-table-column prop="realname" label="真实姓名" width="100" align="center">
            </el-table-column>
            <el-table-column prop="phone" label="电话" width="120" align="center">
            </el-table-column>
            <el-table-column prop="email" label="邮箱" width="200" align="center">
            </el-table-column>
            <el-table-column label="状态" align="center" width="100">
                <template slot-scope="scope">
                    <el-tag type="danger" effect="plain" v-if="scope.row.status===1">待审核</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="remark" label="申请信息" width="200" align="center">
            </el-table-column>
            <el-table-column label="申请创建时间" width="120" align="center">
                <template slot-scope="scope">
                    {{scope.row.creatTime | dateFormat}}
                </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="200" align="center">
                <template slot-scope="scope">
                    <el-button type="primary" size="small" icon="el-icon-edit"
                        @click="handleEdit(scope.row)">审核</el-button>
                    <el-popconfirm style="margin-left:5px" confirm-button-text='确定' cancel-button-text='再想想'
                        icon="el-icon-info" icon-color="red" title="您确定删除吗？" @confirm="handleDelete(scope.row.id)">
                        <el-button type="danger" size="small" slot="reference" icon="el-icon-delete">删除</el-button>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
        <div style="padding:10px">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageNum"
                :page-sizes="[2, 5, 10, 20]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
                :total="total">
            </el-pagination>
        </div>

        <el-dialog title="申请信息" :visible.sync="dialogFormVisible" width="30%">
            <el-form label-width="80px" size="small">
                <el-form-item label="用户名">
                    <el-input v-model="form.username" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input v-model="form.password" show-password autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="真实姓名">
                    <el-input v-model="form.realname" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="电话">
                    <el-input v-model="form.phone" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="邮箱">
                    <el-input v-model="form.email" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="申请信息">
                    <el-input v-model="form.remark" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="设置状态">
                    <el-radio-group v-model="form.status">
                        <el-radio label="0">通过并启用</el-radio>
                        <el-radio label="1">通过但禁用</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="save">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import { deleteBatch, deleteById, getNoCheckManager, checkManager } from "@/api/manager.js"
    export default {
        name: 'ElectricPileAdminManager',

        data() {
            return {
                tableData: [],
                total: 0,
                pageNum: 1,
                pageSize: 10,
                managerListQuery: {
                    pageNum: '1',
                    pageSize: '10',
                    name: '',
                },
                dialogFormVisible: false,
                dialogRole: false,
                form: {},
                multipleSelection: [],
                roleData: [],
                props: {
                    label: 'name'
                },
                managerId: 0,
                expands: [],
                checks: []
            };
        },

        mounted() {

        },
        created() {
            this.load();
        },

        methods: {
            //搜索重置
            reset() {
                this.managerListQuery.name = '';
                this.load();
            },
            //打开审核管理员对话框
            handleAdd() {
                this.dialogFormVisible = true;
                this.form = {};//如果之前有填过值，可以置空 
            },
            //实现审核管理员
            save() {
                checkManager(this.form).then(res => {
                    if (res.data.code === '200') {
                        this.$message.success("审核通过");
                        this.dialogFormVisible = false;
                        this.load();
                    } else {
                        this.$message.error("审核失败");
                    }
                })
            },
            //编辑管理员
            handleEdit(row) {  //编辑
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
                this.pageSize = val;  //获取当前每页显示条数
                this.load();
            },
            handleCurrentChange(val) {/*传递过来当前是第几页*/
                console.log(`当前页: ${val}`);
                this.pageNum = val;   //获取当前第几页
                this.load();
            },
            //批量删除
            delBatch() {
                let ids = this.multipleSelection.map(v => v.id);//map这个方法可以实现将multipleSelection中的对象扁平化处理。
                deleteBatch(ids).then(res => {
                    if (res.data.code === '200') {
                        this.$message.success("批量删除成功");
                        this.load();
                    } else {
                        this.$message.error("批量删除失败");
                    }
                })
            },
            //根据选择行的id删除
            handleDelete(id) {
                deleteById(id).then(res => {
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
                //使用axios封装的request，获取所有菜单数据        
                getNoCheckManager(this.managerListQuery).then(res => {
                    console.log(res);
                    this.tableData = res.data.data.records;
                    this.total = res.data.data.total;
                })
            },

        },
    };
</script>

<style scoped>

</style>