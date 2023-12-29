<template>
    <div>
        <div style="padding:10px">
            <el-button type="primary" @click="handleAdd">新增<i class="el-icon-circle-plus"></i></el-button>
            <el-button type="danger" @click="delBatch">批量删除<i class="el-icon-remove"></i></el-button>
            <el-input style="width:250px; margin-left: 500px;" suffix-icon="el-icon-search" placeholder="请输入名称搜索"
                v-model="roleListQuerry.name"></el-input>
            <el-button style="margin-left:5px" type="primary" @click="load">搜索</el-button>
            <el-button style="margin-left:5px" type="warning" plain @click="reset">重置</el-button>
        </div>
        <el-table :data="tableData" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="id" label="ID " width="80" align="center">
            </el-table-column>
            <el-table-column prop="name" label="名称 " width="200" align="center">
            </el-table-column>
            <el-table-column prop="flag" label="唯一标识 " width="200" align="center">
            </el-table-column>
            <el-table-column prop="description" label="描述" width="200" align="center">
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="500" align="center">
                <template slot-scope="scope">
                    <el-button type="info" slot="reference" size="small" icon="el-icon-menu"
                        @click="selectMenu(scope.row)">分配菜单</el-button>
                    <el-button type="primary" size="small" icon="el-icon-edit"
                        @click="handleEdit(scope.row)">编辑</el-button>
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

        <el-dialog title="角色信息" :visible.sync="dialogFormVisible" width="30%">
            <el-form label-width="80px" size="small">
                <el-form-item label="角色名">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="唯一标识">
                    <el-input v-model="form.flag" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="描述">
                    <el-input v-model="form.description" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="save">确 定</el-button>
            </div>
        </el-dialog>

        <el-dialog title="菜单分配" :visible.sync="dialogMenu" width="30%">
            <el-tree :props="props" :data="menuData" node-key="id" ref="tree" :default-expanded-keys="expands"
                :default-checked-keys="checks" show-checkbox>
                <span class="custom-tree-node" slot-scope="{data}">
                    <span><i :class="data.icon"></i>{{data.name}}</span>
                </span>
            </el-tree>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogMenu = false">取 消</el-button>
                <el-button type="primary" @click="saveRoleMenu">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    // import { resetRouter } from "@/router";
    import { deleteBatch, deleteById, getAllRole, getAllMenu, getRoleMenu, getRoleMenuIds, addRole, saveRoleMenus } from "@/api/role.js"
    export default {
        name: "ElectricPileAdminRole",
        data() {
            return {
                tableData: [],
                total: 0,
                pageNum: 1,
                pageSize: 10,
                roleListQuerry: {
                    pageNum: '1',
                    pageSize: '10',
                    name: '',
                },
                dialogFormVisible: false,
                dialogMenu: false,
                form: {},
                multipleSelection: [],
                menuData: [],
                props: {
                    label: 'name'
                },
                roleId: 0,
                expands: [],
                checks: []
            }
        },
        created() {
            this.load();
        },
        methods: {
            //编辑按钮事件
            handleEdit(row) {
                console.log(row);
                this.form = row;//把当前行的数据赋值给form
                this.dialogFormVisible = true;
            },
            //表格多选选中事件
            handleSelectionChange(val) {
                console.log(val);
                this.multipleSelection = val;
            },
            //批量删除按钮事件
            delBatch() {
                let ids = this.multipleSelection.map(v => v.id);//map这个方法可以实现将multipleSelection中的对象扁平化处理。
                console.log(ids);
                deleteBatch(ids).then(res => {
                    if (res.data.code === '200') {
                        this.$message.success("批量删除成功");
                        this.load();
                    } else {
                        this.$message.error("批量删除失败");
                    }
                })
            },
            //单条记录删除按钮事件
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
            //将请求数据封装为一个方法
            load() {
                //请求分页查询数据
                //使用axios封装的request
                getAllRole(this.roleListQuerry).then(res => {
                    this.tableData = res.data.data.records;
                    this.total = res.data.data.total;
                })
            },
            //新增角色按钮事件
            handleAdd() {
                this.dialogFormVisible = true;
                this.form = {};//如果之前有填过值，可以置空
            },
            //分配菜单按钮事件
            selectMenu(role) {
                this.dialogMenu = true;
                this.roleId = role.id;
                //添加权限（树形结构）
                //拿到菜单列表
                getAllMenu().then(res => {
                    this.menuData = res.data.data
                    console.log("所有菜单数据", this.menuData)
                    this.expands = this.menuData.map(v => v.id)
                    console.log("expands", this.expands)
                })

                getRoleMenu(this.roleId).then(res => {//当前角色的权限菜单
                    console.log("当前角色的菜单", res.data);
                    this.checks = res.data.data;
                    getRoleMenuIds().then(r => {//取出所有的菜单id
                        const ids = r.data.data
                        console.log("所有菜单id", ids)
                        ids.forEach(id => {
                            if (!this.checks.includes(id)) { //和当前的权限菜单进行比较,没有就不显示
                                //使用setChecked方法需要设置  node-key="id"  设置为false即为不渲染
                                this.$refs.tree.setChecked(id, false)
                            }
                        })
                    })
                })

            },
            //保存角色按钮事件
            save() {
                addRole(this.form).then(res => {
                    if (res.data.code === '200') {
                        this.$message.success("保存成功");
                        this.dialogFormVisible = false;
                        this.load();
                    } else {
                        this.$message.error("保存失败");
                    }
                })
            },
            //分配菜单对话框中的确定按钮事件
            saveRoleMenu() {
              const menuIds = this.$refs.tree.getCheckedKeys().concat(this.$refs.tree.getHalfCheckedKeys());
              saveRoleMenus(this.roleId,menuIds).then(res => {
                    if (res.data.code === '200' && res.data.data === true) {
                        this.$message.success("绑定成功");
                        this.dialogMenu = false;
                    } else {
                        this.$message.error("绑定失败");
                    }
                })
            },
            //搜索重置按钮事件
            reset() {
                this.roleListQuerry.name = "";
                this.load();
            }
        }
    }
</script>
<style scoped>

</style>