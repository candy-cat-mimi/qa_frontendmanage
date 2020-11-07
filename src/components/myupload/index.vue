<template>
<div class="upload">
  <el-dialog title="上传备份"
             :visible.sync="visibleLoadUp"
             :before-close="beforeclose"
             :close-on-click-modal="false">
    <el-upload
      class="upload-demo"
      action="http://localhost:9999/database/upload"
      accept=".sql"
      :on-change="success"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :before-remove="beforeRemove"
      :limit="1"
      :on-exceed="handleExceed"
      :auto-upload="false"
      :file-list="fileList">
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">只能上传SQL数据库文件，且不超过500kb</div>
    </el-upload>
    <div class="btn_foot" slot="footer">
      <el-button @click="upload" :disabled="loadupLoading">确定</el-button>
      <el-button @click="colseupload">取消</el-button>
    </div>

  </el-dialog>

</div>
</template>

<script>
export default {
  name: "index",
  data(){
    return{
      fileList:[],
      file:undefined,
      // 默认表单
      defaultForm: {
        docName: '',
        remark: '',
        url: '',
        isUpload: false,
      },
      visibleLoadUp:false,
      loadupLoading:false
    }
  },
  props:{
    visibleLoadUp:{
      type:Boolean,
      default:false
    }
  },
  methods: {
    handleRemove(file, fileList) {
      this.fileList=undefined;
      this.file=undefined;
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${ file.name }？`);
    },
    upload(){
      if(this.file==undefined){
        this.$message.warning('当前没有文件，请上传文件');
        return ;
      }
      this.loadupLoading=true;
      const formData = new FormData();
      formData.append('docName', this.file.name)
      formData.append('file', this.file)
      this.$store.dispatch('actionupload',formData).then(res=>{
        console.log(res)
        if(res.data.code==0){
          this.$notify({
            title: 'Success',
            message: 'Upload Successfully',
            type: 'success',
            duration: 2000
          });
        }else{
          this.$notify({
            title: 'Fail',
            message: 'Upload Fail',
            type: 'warning',
            duration: 2000
          });
        }
        this.loadupLoading=false;
      }).catch(err=>{
        console.log(err)
      })
      this.colseupload;
    },
    colseupload(){
      this.visibleLoadUp=false;
      this.$emit('close-upload',this.visibleLoadUp);
    },
    beforeclose(done){
      this.colseupload();
      done();
    },
    success(file, fileList){
      this.file=file.raw;
    },
  }
}
</script>

<style scoped>
.upload{
  position: relative;
}
.btn_foot{
  position: absolute;
  bottom: 3%;
  right:2%;
}
</style>
