<template>
    <div :class="$style.test">
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
export default {
    data(){
        return {
           e:{
               f:{
                   g:8
               }
           },
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
        }
    },
    mounted(){
        this.getData();
        // this.$store.dispatch('counter/FILE_LIST_SELECT','初始化改变')
        // console.log(this.$store.state.counter.fileListSelect);
        // console.log(this.$store.getters['counter/FILE_LIST_SELECT']);
    },
    watch:{
        e: [
            function handle1 (val, oldVal) {
                console.log(1,val)
            },
            function handle2 (val, oldVal) {
                console.log(2,val)
             }
        ],
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