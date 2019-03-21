<template>
    <div :class="$style.test">
        <el-button @click="down">下载</el-button>
        <!-- <input class="containers left" type="number" name="containers" v-model="containers" placeholder="请输入"> -->
        <el-input v-model="form.name" placeholder="请输入name"></el-input>
        <el-input v-model="form.age" placeholder="请输入age"></el-input>
        <el-button @click="add" type="primary">增加数据</el-button><br /><br />
        <i class="icon el-icon-info"></i>
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
        <bus a="a" b="b" @change="changeEvent"></bus>
        <addFunc :num1="5" :num2="7"></addFunc>
        <fuButton></fuButton>
    </div>
</template>
<script>
import {mipModuleApi} from '../../service/service';
import gbk from '../../util/gbk';
import bus from './bus.vue';
export default {
    data(){
        return {
           form:{
               name:'',
               age:'',
               time:new Date()
           },
           nodeDate:[]
        };
    },
    methods:{
        changeEvent(value){
            console.log('change');
            console.log(value);
        },
        async getData(){
            let data = await mipModuleApi.post(`/findMovie`);
            this.nodeDate = (data || []).map(item=>{
                return Object.assign({},item,{edit:false});
            });
        },
        async dele(item){
            let data = await mipModuleApi.post(`/deleMovie`,item);
            if (data.success){
                this.getData();
            }
        },
        async add(){
            let data = await mipModuleApi.post(`/addMovie`,this.form);
            if (data.success){
                this.getData();
            }
        },
        edit(item){
            item.edit = true;
        },
        async save(item){
            let data = await mipModuleApi.post(`/updateMovie`,item);
            if (data.success){
                this.getData();
            }
        },
        handlerRouter(){
            this.$store.commit('counter/FILE_LIST_SELECT','点击改变一个值看看');
        },
        down(){
                let url = 'http://10.17.156.68:17480/userDownload/E8DBE7F8E0F5437C814C7AFADED1F5E7/mip-bucket-test/1687dde6a26671d810a4537455c85cde.png?certification=v1838a3f1d405e6a51a08051439c63335509';
                let ext = 'png';
                // var md5 = require('md5');
                // console.log(md5('message'));
               let xmlhttp = new XMLHttpRequest();
               xmlhttp.onload = ()=>{
                    if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
                        if (xmlhttp.response) {
                            this.hander(xmlhttp.response,ext);
                        } else {
                            this.hander(xmlhttp.response,ext);
                        }
                    }
                };
                xmlhttp.open('GET', url,true);
                // xmlhttp.withCredentials = true;
                xmlhttp.responseType = 'blob';
                xmlhttp.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
                xmlhttp.setRequestHeader('OSS-SIGN', '644f3c6ca0374645aaa281f8efe3fecc');
                xmlhttp.setRequestHeader('OSS-DISPOSITION', 'wwww.' + ext);
                xmlhttp.send();
            },
             hander(res,ext){
                 let a = document.createElement('a');
                let blob = res;
                blob = new Blob([blob], {type: 'application/' + ext});
                let downLoadAllUrl = window.URL.createObjectURL(blob);
                let eleLink = document.createElement('a');
                eleLink.style.display = 'none';
                eleLink.href = downLoadAllUrl;
                eleLink.setAttribute('downLoad','haha.' + ext);
                document.body.appendChild(eleLink);
                eleLink.click();
                document.body.removeChild(eleLink);
            },
    },
    mounted(){
        // this.getData();
        this.$store.dispatch('counter/FILE_LIST_SELECT','初始化改变').then(res=>{
            console.log('res',res);
        });
        // console.log(this.$store.state.counter.fileListSelect);
        console.log(this.$store.getters['counter/FILE_LIST_SELECT']);
        console.log(gbk().encode('attachment;filename=filename我.xlsx'));
        this.handlerRouter();
    },
    created(){
        this.changeEvent(22222);
    },
    components:{
        bus,
    }
};
</script>
<style lang="scss" module>
    @mixin set-color($color){
        color: $color;
    }
    @function set-h($h){
        @return $h*2+px;
    }
    .error{
        display: block;
        border:1px solid red;
    }
    .test{
        @include set-color(blue);
        @extend .error;
        //以上二者都可以使用相同的样式 编译后的结果有些不一样 @extend不能传递参数 .a,.b{color:red}    @include为.a{color:red} .b{color:red}
        font: {
            size:20px;
            weight:bold;
        }
        height:set-h(200);
    }
</style>
<style  scoped>
    .el-input{
        width:150px;
    }
</style>