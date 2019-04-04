<template>
    <div>
        测试一下$listners和$attars
        <div v-for="(item,index) in $attrs" :key="index">{{item}}</div>
        <div>{{testState.count}}</div>
        <slot :slotNum="slotNum">默认slot</slot>
        <slot name="test"></slot>
    </div>
</template>
<script>
import {testState} from '@/observable/testObservable';
export default {
    data() {
        return {
            slotNum:10
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
    },
    computed:{
        testState(){
            return testState
        }
    }
}
</script>
