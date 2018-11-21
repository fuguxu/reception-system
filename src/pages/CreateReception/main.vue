<template>
    <div>
        <div>新建接待</div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            
        }
    },
    mounted(){
        console.log(this.$store.state.counter.fileListSelect);
        alert(this.$store.state.counter.fileListSelect)
    }
}
</script>
