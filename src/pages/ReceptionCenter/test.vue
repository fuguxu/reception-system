<template>
    <div>
        测试一下$listners和$attars
        <div v-for="(item,index) in $attrs" :key="index">{{item}}</div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            
        }
    },
    mounted(){
        console.log(this.$attrs)
        console.log(this.$listeners)
        // this.$emit('change','哈哈')
        for(let event in this.$listeners){
            console.log(event)
            this.$emit(event,'哈哈')
        }
    }
}
</script>
