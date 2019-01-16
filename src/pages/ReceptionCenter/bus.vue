<template>
    <div>
        <span>bus组件</span>
        <test v-bind="$attrs"  v-on="$listeners"></test>
    </div>
</template>
<script>
import test from './test.vue'
export default {
    props:['a'],
    data() {
        return {
            
        }
    },
    mounted(){
        this.$emit('change','哈哈1')
    },
    components:{
        test
    }
}
</script>
