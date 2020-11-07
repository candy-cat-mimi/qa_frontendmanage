<template>
  <div class="app-container">
    <div class="filter-container" style="margin-bottom: 5px;">

      <el-button class="filter-item" style="margin-right: 10px;"
                 type="primary"
                 icon="el-icon-edit"
                 @click="backup">
        备份
      </el-button>
      <el-button class="filter-item"
                 type="primary"
                 icon="el-icon-upload"
                 @click="visible=true">
        上传
      </el-button>
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="序号" width="95">
        <template slot-scope="scope">
          {{ scope.$index+1 }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="备份时间">
        <template slot-scope="scope">
          {{ scope.row.createdTime}}
        </template>
      </el-table-column>
      <el-table-column label="操作"
                       align="center"
                       width="350"
                       style="display: flex"
                       class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button v-if="scope.row.status!='restore'"
                     size="mini" type="success"
                     @click="restorelist(scope.row,scope.row.$index)">
            恢复
          </el-button>
          <a @click="downloadFile('http://localhost:9999/database/download?fileName=','beifen.sql',scope.row)">
            <el-button v-if="scope.row.status!='download'"
                       size="mini"
                       class="btn"
                       type="warning">
              下载
            </el-button>
          </a>
          <el-button
            v-if="scope.row.status!='deleted'"
            size="mini" type="danger"
            @click="deletelist(scope.row,scope.row.$index)">
            删除
          </el-button>
        </template>
      </el-table-column>

    </el-table>
    <upload :visibleLoadUp="visible"
            @close-upload="colseupload"></upload>
  </div>
</template>

<script>
// import { getList } from '@/api/table'
import {getList} from '@/api/backup'
import {deleteList} from "@/api/backup";

import upload from '@/components/myupload'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  components:{
    upload
  },
  data() {
    return {
      list: null,
      listLoading: true,
      fileName:{},
      visible:false,
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getList().then(response => {
        // console.log(response)
        // console.log(response.data.data)
        this.list = response.data.data
        this.listLoading = false
      })
    },
    handleDelete(row, index) {
      this.$notify({
        title: 'Success',
        message: 'Delete Successfully',
        type: 'success',
        duration: 2000
      })
      this.list.splice(index, 1)
    },
    deletelist(row,index){
      deleteList(row.fileName);
      this.$store.dispatch('actionDelete',row.fileName).then(res=>{
        console.log(res)
        console.log(row.fileName);
        console.log(res.data.code);
        if(res.data.code==0&&res.status==200){
          this.$notify({
            title: 'Success',
            message: 'Delete Successfully',
            type: 'success',
            duration: 2000
          });
          this.list.splice(index, 1)
        }
      });
    },
    backup(){
      this.$store.dispatch('actionBackUp').then(res=>{
        console.log(res)
        if(res.data.code==0&&res.status==200){
          this.$notify({
            title: 'Success',
            message: 'Backup Successfully',
            type: 'success',
            duration: 2000
          });
        }
      })
    },
    downtext(row){
      this.$store.dispatch('actiondownload',row.fileName).then(res=>{
        const DATE=res.data;
        console.log(row.fileName);
        this.download(row.fileName,DATE);
      }).catch(err=>{
        console.log(err)
      })

    },
    download(name,data){
      let save_lik = document.createElement('a');
      save_lik.href=data;
      save_lik.download=name;

      let ev=document.createElement('MouseEvent');
      ev.initMouseEvent('click',true,false,window,
        0,0,0,0,0,
        false,false,false,false,0,null);
    },
    restorelist(row,index){
      this.$store.dispatch('actionrestore',row.fileName).then(res=>{
        console.log(res);
        if(res.data.code==0&&res.status==200){
          this.$notify({
            title: 'Success',
            message: 'Restore Successfully',
            type: 'success',
            duration: 2000
          });
        }
      })
    },
    downloadFile(url, fileName,row) {//跨域文件路径、下载到本地的文件名
      url+=row.fileName;
      var x = new XMLHttpRequest();
      x.open("GET", url, true);
      x.responseType = 'blob';
      x.onload=function(e) {
        var url = window.URL.createObjectURL(x.response)
        var a = document.createElement('a');
        a.href = url
        a.download = fileName;
        a.click()
      }
      x.send();
    },
    colseupload(visible){
      this.visible=visible;
      console.log(this.visible);
    }

  }
}
</script>


<style scoped>
.btn{
  flex: 1;
  margin:0 15px;
}
</style>
