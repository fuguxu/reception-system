<template>
    <div class="test">
        接待系统 你好
        <!-- <el-input v-model="e.f.g"></el-input> -->
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
           }
        }
    },
    methods:{
        async getData(){
            try{
                var data=await mipModuleApi.get(`/sys/org/getPersonByUid`,{uId:'ex_fugx'});
                console.log(data)
            } catch(err){
                console.log(err.message)
            }
            
        }
    },
    mounted(){
        this.getData();
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
<style lang="scss" scoped>
    .test{
        color:blue;
    }
</style>
