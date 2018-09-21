import axios from 'axios';
import qs from 'qs';

axios.defaults.validateStatus=(status)=>{
    if (status === 403) {//无权限访问资源
        return false;
    } else if (status === 401) {//用户未登录或者登录已超时
        return false;
    }else if(status === 404){
        return false
    }else{
        return true;
    } 
}

const TIME_OUT=50000;

const mip_base_prefix = "http://imipdev.midea.com";

const mip_base_url=`${mip_base_prefix}/mip`

const base_axios_options = {
    withCredentials: true,
    timeout: TIME_OUT,
    headers: { 'content-type': 'application/json' }
};

const mipAxios = axios.create(Object.assign({}, {baseURL: mip_base_url }, base_axios_options));

export const mipModuleApi={
    get(url,params){
        return mipAxios.get(url,{params:params}).then(res=>res.data)
    },
    post(url,params){
        return mipAxios.post(url,params).then(res=>res.data)
    }
}




