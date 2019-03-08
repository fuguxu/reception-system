<template>
    <div>
       <input type="file" name="file" id="file" @change="changeFile">

    </div>
</template>
<script>
import {mipModuleApi} from '../../service/service';
// import jsPDF from 'jspdf';
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
    },
    mounted(){
        // var doc = new jsPDF();
        // doc.text('Hello world!', 10, 10);
        // doc.save('a4.pdf');
        // var md5 = require('md5');
        // console.log(md5('message'));
    }
}
</script>
