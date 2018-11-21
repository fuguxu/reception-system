<template>
    <div :class="$style.test">
        接待中心 <br />
        <a @click="handlerRouter" href="#/r/create_reception" target="_blank">新建接待</a>
        <br />
        <input class="containers left" type="number" name="containers" v-model="containers" placeholder="">
        <el-input v-model="containers"></el-input>
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
           containers:1
        }
    },
    methods:{
        async getData(){
            try{
                // var data=await mipModuleApi.get(`/sys/org/getPersonByUid`,{uId:'ex_fugx'});
                // console.log(data)
            } catch(err){
                // console.log(err.message)
            }
        },
        handlerRouter(){
            console.log(222)
            this.$store.commit('counter/FILE_LIST_SELECT','点击改变一个值看看');
        }
    },
    mounted(){
        this.getData();
        this.$store.dispatch('counter/FILE_LIST_SELECT','初始化改变')
        console.log(this.$store.state.counter.fileListSelect);
        console.log(this.$store.getters['counter/FILE_LIST_SELECT']);
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
    }
    
</style>
<style  scoped>
    .el-input{
        width:150px;
    }
</style>