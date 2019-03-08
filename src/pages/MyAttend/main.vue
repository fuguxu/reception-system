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
        // 初始化一个 WebSocket 对象
        // var ws = new WebSocket("ws://localhost:8001");

        // // 建立 web socket 连接成功触发事件
        // ws.onopen = function () {
        // // 使用 send() 方法发送数据
        //     ws.send("发送数据");
        // };

        // // 接收服务端数据时触发事件
        // ws.onmessage = function (evt) {
        //     var received_msg = evt.data;
        //     console.log('received_msg',received_msg)
        // };

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
