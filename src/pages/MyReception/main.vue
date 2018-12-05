<template>
    <div>
       <input type="file" name="file" id="file" @change="changeFile">

    </div>
</template>
<script>
import {mipModuleApi} from '../../service/service';
export default {
    data(){
        return {
            
        }
    },
    methods:{
        changeFile(ev){
            console.log(ev.target.files[0]);
            let file=ev.target.files[0];
            let formData=new FormData();
            formData.append('file',file);
            formData.append('name','fuguxu');
            mipModuleApi.post('/upload',formData);
        },
        open(){
        }
    }
}
</script>
