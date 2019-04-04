<template>
    <div :class="$style['bus-class']">
        <span @click="add">bus组件</span>
        <!-- <test v-bind="$attrs"  v-on="$listeners"></test> -->
        <span>{{testState.count}}</span>
    </div>
</template>
<script>
import test from './test.vue';
import {testState} from '@/observable/testObservable';
export default {
    props:['a'],
    data() {
        return {
            
        }
    },
    methods:{
        add(){
            this.testState.count++;
        }
    },
    mounted(){
        this.$emit('change','哈哈1')
    },
    components:{
        // test
    },
    computed:{
        testState(){
            return testState
        }
    }
}
</script>
<style lang="scss" module>
    .bus-class{
        font-size: 30px;
    }
</style>
