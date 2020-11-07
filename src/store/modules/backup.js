import{deleteList,
       backup,
       download,
       upload,
       restoreList} from "@/api/backup";
const list={
  getters:{

  },
  actions:{
    actionDelete({commit},params){
      return new Promise((resolve, reject) => {
        deleteList(params).then(res=>{
          console.log("1"+res);
          let data=res;
          console.log("2"+res);
          resolve(res);
        }).catch(err=>{
          reject(err);
        })
      })
    },
    actionBackUp({commit}){
      return new Promise((resolve, reject) => {
        backup().then(res=>{
          // console.log(res)
          resolve(res);
        }).catch(err=>{
          reject(err);
        })
      })
    },
    actiondownload({commit},fileName){
      return new Promise((resolve, reject) => {
        download(fileName).then(res=>{
          console.log(res);
          resolve(res);
        }).catch(err=>{
          reject(err)
        })
      })
    },
    actionrestore({commit},fileName){
      return new Promise((resolve, reject) => {
        restoreList(fileName).then(res=>{
          console.log(res);
          resolve(res);
        }).catch(err=>{
          reject(err);
        })
      })
    },
    actionupload({commit},data){
      return new Promise((resolve, reject) => {
        upload(data).then(res=>{
          // console.log(res);
          resolve(res);
        }).catch(err=>{
          reject(err)
        })
      })
    }
  },

}
export default list
