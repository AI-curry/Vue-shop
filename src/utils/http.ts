//axios基础的封装
import axios from 'axios';
import 'element-plus/theme-chalk/el-message.css';
import { ElMessage } from 'element-plus';
import { useUserStore } from '@/stores/userStore.ts';
import router from '@/router';

// 创建axios实例
const httpInstance = axios.create({
  baseURL: 'https://pcapi-xiaotuxian-front-devtest.itheima.net', //这是接口基地址，也就是后端所有接口共用的、固定不变的前缀。配置在axios里，就能少写重复代码，方便统一管理和切换环境。
  timeout: 5000
});

// axios请求拦截器
httpInstance.interceptors.request.use(
  (config) => {
    //1.从pinia获取token数据
    const userStore = useUserStore();
    //2.按照后端要求拼接token数据
    const token = userStore.userInfo.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (e) => Promise.reject(e)
);

// axios响应式拦截器
httpInstance.interceptors.response.use(
  (res) => res.data,
  (e) => {
    const userStore = useUserStore();
    ElMessage({
      type: 'warning',
      message: e.response.data.message
    });
    if (e.response.status === 401) {
      userStore.clearUserInfo();
      router.push('/login');
    }
    return Promise.reject(e);
  }
);
export default httpInstance;
