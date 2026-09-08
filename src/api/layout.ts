import httpInstance from '@/utils/http';
import { ClassData } from '@/api/model/layoutModel.ts';

//封装一个接口函数用于向后端发送请求，获取页面需要的分类数据
export function getCategoryAPI(): Result<ClassData[]> {
  return httpInstance({ url: '/home/category/head' });
}
