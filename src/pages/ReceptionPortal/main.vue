<template>
    <div class="reception-portal clearfloat">
        <div class="side-bar-content left">
            <SideBar></SideBar>
        </div>
        <div class="portal-content left">
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
import SideBar from '../SideBar/main';
export default {
    data(){
        return {

        }
    },
    components:{
        SideBar
    }
}
</script>
<style lang="scss" scoped>
    .reception-portal{
        background: #f9f9f9;
        min-height: 600px;
    }
    .side-bar-content{
        // height:100%;
    }
    .portal-content{
        background: #fff;
        min-height: 600px;
        width:calc(100% - 200px);
    }
</style>
