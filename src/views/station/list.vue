<template>
    <div>
        <el-container>
            <el-header>
                <div class="text-item">
                    <el-form :inline="true" :model="StationListQuery">
                        <el-form-item label="电站编号">
                            <el-input v-model="StationListQuery.id" placeholder="输入电站编号"></el-input>
                        </el-form-item>
                        <el-form-item label="管理员编号">
                            <el-input v-model="StationListQuery.managerId" placeholder="输入管理员编号"></el-input>
                        </el-form-item>
                        <el-form-item label="地址">
                            <el-input v-model="StationListQuery.address" placeholder="输入地址"></el-input>
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
                        <el-table-column label="管理员编号" width="120" align="center">
                            <template slot-scope="scope">{{scope.row.managerId}}</template>
                        </el-table-column>
                        <el-table-column label="电站名" width="160" align="center">
                            <template slot-scope="scope">{{scope.row.name}}</template>
                        </el-table-column>
                        <el-table-column label="地址" width="240" align="center">
                            <template slot-scope="scope">{{scope.row.address}}</template>
                        </el-table-column>
                        <el-table-column label="状态" width="90" align="center">
                            <template slot-scope="scope">
                                <el-tag type="success" effect="plain" v-if="scope.row.status===1">营业中</el-tag>
                                <el-tag type="info" effect="plain" v-if="scope.row.status===2">休息中</el-tag>
                                <el-tag type="danger" effect="plain" v-if="scope.row.status===3">停业中</el-tag>
                            </template>
                        </el-table-column>
                        <el-table-column label="建立时间" width="100" align="center">
                            <template slot-scope="scope">{{scope.row.creatTime | dateFormat}}</template>
                        </el-table-column>
                        <el-table-column label="描述" width="200" align="center">
                            <template slot-scope="scope">{{scope.row.description}}</template>
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
                        layout="total, sizes, prev, pager, next, jumper" :page-size="StationListQuery.pageSize"
                        :page-sizes="[1,5,10]" :current-page.sync="StationListQuery.pageNum" :total="total">
                    </el-pagination>
                </div>
            </el-footer>
        </el-container>

        <el-dialog title="电站信息" :visible.sync="dialogFormVisible" width="28%">
            <el-form label-width="90px" size="small">
                <el-form-item label="电站名">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="管理员编号">
                    <el-input v-model="form.managerId" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="地址">
                    <el-input v-model="form.address" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="状态">
                    <el-select v-model="form.status" placeholder="状态">
                        <el-option label="营业中" value="1"></el-option>
                        <el-option label="休息中" value="2"></el-option>
                        <el-option label="已停业" value="3"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="地址选择">
                    <el-button type="primary" @click="chooseMap()">确定</el-button>
                </el-form-item>
                <el-form-item label="坐标">
                    {{form.longitude}},{{form.latitude}}
                </el-form-item>
                <el-form-item label="图片">
                    <single-upload v-model="form.picture"></single-upload>
                </el-form-item>
                <el-form-item label="描述">
                    <el-input v-model="form.description" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="save()">确 定</el-button>
            </div>
        </el-dialog>

        <el-dialog title="地址选择" :visible.sync="dialogMapVisible" width="50%">
            <el-input disabled :value=position style="width: 180px;" />
            <div style="width: 100%; height: 400px;">
                <amap cache-key="map" ref="map" view-mode='2D' :zoom.sync="zoom" :show-indoor-map="false"
                    @click="onMapClick">
                    <amap-marker :position="position" />
                </amap>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="returnForm()">取 消</el-button>
                <el-button type="primary" @click="returnDialogForm()">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import { deleteBatch, getAllStation, deleteById, addStation, updateStation } from '@/api/station.js';
    import SingleUpload from '@/components/upload/singleUpload';
    const defaultStationListQuery = {
        id: null,
        managerId: null,
        address: null,
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
                StationListQuery: Object.assign({}, defaultStationListQuery),
                listLoading: true,
                dialogFormVisible: false,
                dialogMapVisible: false,
                total: '',
                multipleSelection: [],
                position: null,
                zoom: 14,
                location: {
                    lat: null,
                    lng: null,
                    address: null
                }
            };
        },

        mounted() {

        },
        created() {
            this.load();
        },

        methods: {

            onMapClick(e) {
                if (e.lnglat) {
                    this.position = [e.lnglat.getLng(), e.lnglat.getLat()];
                    this.location.lat = e.lnglat.getLat();
                    this.location.lng = e.lnglat.getLng();
                } else {
                    this.position = null;
                }
            },
            //选择地址经纬度
            chooseMap() {
                this.dialogFormVisible = false;
                this.dialogMapVisible = true;

            },
            returnDialogForm() {
                this.dialogMapVisible = false;
                this.dialogFormVisible = true;
                this.form.longitude = this.location.lng;
                this.form.latitude = this.location.lat;
            },
            returnForm() {
                this.dialogMapVisible = false;
                this.dialogFormVisible = true;
            },
            //搜索重置
            resetListForm() {
                this.StationListQuery = Object.assign({}, defaultStationListQuery);
                this.load();
            },
            handleSearchList() {
                this.StationListQuery.pageNum = 1;
                this.load();
            },
            //打开新增对话框
            handleAdd() {
                this.dialogFormVisible = true;
                this.form = {};//如果之前有填过值，可以置空 
            },
            //实现新增
            save() {
                if (Object.keys(this.form).length === 0) {
                    addStation(this.form).then(res => {
                        if (res.data.code === '200') {
                            this.$message.success("保存成功");
                            this.dialogFormVisible = false;
                            this.load();
                        } else {
                            this.$message.error("保存失败");
                        }
                    })
                } else {
                    updateStation(this.form).then(res => {
                        if (res.data.code === '200' && res.data.data === true) {
                            this.$message.success("修改成功");
                            this.dialogFormVisible = false;
                            this.load();
                        } else {
                            this.$message.error("修改失败");
                        }
                    })
                }
            },
            //编辑
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
                this.StationListQuery.pageSize = val;  //获取当前每页显示条数
                this.load();
            },
            handleCurrentChange(val) {/*传递过来当前是第几页*/
                console.log(`当前页: ${val}`);
                this.StationListQuery.pageNum = val;   //获取当前第几页
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
                getAllStation(this.StationListQuery).then(res => {
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

    #container {
        width: 600px;
        height: 360px;
    }
</style>