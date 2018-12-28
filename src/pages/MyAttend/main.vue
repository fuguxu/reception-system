<template>
    <div>
        <h1>小小聊天室</h1>
        <div>
            <h3>聊天内容</h3>
            <ul style="min-height:200px;">
                <li v-for="(item,index) in messageData" :key="index" style="line-height: 15px;padding: 5px;">
                    <span>{{item}}</span>
                </li>
            </ul>
        </div>
        <el-input v-model="message" @keyup.native.enter="sendMessage"></el-input>
    </div>
</template>
<script>
export default {
    data(){
        return {
            message:'',
            messageData:[]
        }
    },
    sockets: {//接收服务端的事件
        message2: function(data){
            this.messageData.unshift(data);
        }
    },
    mounted(){
    },
    created(){
        
    },
    methods:{
        sendMessage(){
            this.$socket.emit('message', this.message);
            this.message=''; 
        },
    }
}
</script>
