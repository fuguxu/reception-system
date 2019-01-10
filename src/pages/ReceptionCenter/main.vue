<template>
    <div :class="$style.test">
        <el-button @click="down">下载</el-button>
        <!-- <input class="containers left" type="number" name="containers" v-model="containers" placeholder="请输入"> -->
        <el-input v-model="form.name" placeholder="请输入name"></el-input>
        <el-input v-model="form.age" placeholder="请输入age"></el-input>
        <el-button @click="add" type="primary">增加数据</el-button><br /><br />
        <ul>
            <li v-for="(item,index) in nodeDate" :key="index">
                <span>
                    <el-input :readonly="!item.edit" v-model="item.name"></el-input>
                    <el-input :readonly="!item.edit" v-model="item.age"></el-input>
                </span>
                <span style="cursor:pointer" @click="dele(item)">删除</span>
                <span style="cursor:pointer" v-if="!item.edit" @click="edit(item)">编辑</span>
                <span style="cursor:pointer" v-else @click="save(item)">保存</span>
            </li>
        </ul>
    </div>
</template>
<script>
import {mipModuleApi} from '../../service/service';
import gbk from '../../util/gbk';
export default {
    data(){
        return {
           form:{
               name:'',
               age:'',
               time:new Date()
           },
           nodeDate:[]
        }
    },
    methods:{
        async getData(){
            var data=await mipModuleApi.post(`/findMovie`);
            this.nodeDate=(data||[]).map(item=>{
                return Object.assign({},item,{edit:false})
            });
        },
        async dele(item){
            var data=await mipModuleApi.post(`/deleMovie`,item);
            if(data.success){
                this.getData();
            }
        },
        async add(){
            var data=await mipModuleApi.post(`/addMovie`,this.form);
            if(data.success){
                this.getData();
            }
        },
        edit(item){
            item.edit=true;
        },
        async save(item){
            var data=await mipModuleApi.post(`/updateMovie`,item);
            if(data.success){
                this.getData();
            }
        },
        handlerRouter(){
            this.$store.commit('counter/FILE_LIST_SELECT','点击改变一个值看看');
        },
        down(){
                var url ='http://10.17.156.68:17480/userDownload/E8DBE7F8E0F5437C814C7AFADED1F5E7/mip-bucket-test/167f7b94b13ca1f0c695126414599118.xlsx?certification=v10461d5d3403bbae08a8073c51ff8fd3288&OSS-DISPOSITION=';
                var ext='xlsx'
               var xmlhttp = new XMLHttpRequest();
               xmlhttp.onload=()=>{
                    if (xmlhttp.readyState == 4&&xmlhttp.status==200) {
                        if (xmlhttp.response) {
                            this.hander(xmlhttp.response,ext);
                        } else {
                            this.hander(xmlhttp.response,ext);
                        }
                    }
                };
                xmlhttp.open("GET", url,true);
                // xmlhttp.withCredentials = true;
                xmlhttp.responseType = "blob";
                xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
                xmlhttp.setRequestHeader("OSS-SIGN", "	2ef8348d00beda512e3ba035386662f5");
                xmlhttp.setRequestHeader("OSS-DISPOSITION", "wwww."+ext);
                xmlhttp.send();
            },
             hander(res,ext){
                 var a = document.createElement('a');
                var blob=res;
                blob = new Blob([blob], {type: 'application/'+ext});
                var downLoadAllUrl =window.URL.createObjectURL(blob);
                var eleLink = document.createElement('a');
                eleLink.style.display = 'none';
                eleLink.href = downLoadAllUrl;
                eleLink.setAttribute("downLoad",'haha.'+ext);
                document.body.appendChild(eleLink);
                eleLink.click();
                document.body.removeChild(eleLink);
            },
    },
    mounted(){
        // this.getData();
        // this.$store.dispatch('counter/FILE_LIST_SELECT','初始化改变')
        // console.log(this.$store.state.counter.fileListSelect);
        // console.log(this.$store.getters['counter/FILE_LIST_SELECT']);
        console.log(gbk().encode('attachment;filename=filename我.xlsx'))
        
    },
    watch:{
        
    }
}
</script>
<style lang="scss" module>
    .test{
        color:blue;
        font-size:20px;
        font-weight: bold;
    }
    
</style>
<style  scoped>
    .el-input{
        width:150px;
    }
</style>