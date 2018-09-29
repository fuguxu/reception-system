<template>
    <div class="side-bar">
        <ul>
            <li v-for="(item,index) in muens" :key="index">
                <router-link :to="item.path">{{item.name}}</router-link>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    data(){
        return {
            muens:[]
        }
    },
    created(){
        let muenIndex=this.$route.meta.muenIndex;
        let routers=this.$router.options.routes[0].children;
        if(muenIndex!==undefined&&routers[muenIndex].children){
            this.muens=routers[muenIndex].children.filter(item=>{
                return item.meta.leftMuen
            })
        }
    }
}
</script>
<style lang="scss" scoped>
    .side-bar{
        width:200px;
        li a{
            line-height: 50px;
            font-size: 14px;
            padding-left:20px;
            display: inline-block;
            width:100%;
            box-sizing: border-box;
            &.router-link-active,&:hover{
                background-color: rgba(20, 142, 245, 0.05);
                color:#000;
            }
        }
    }
</style>
