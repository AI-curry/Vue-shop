import { Categories } from '@/api/model/categoryModel.ts';
export interface Brand {
  id?: string;
  name?: string;
  logo?: string;
  // 其他品牌可能有的字段，按需补充
}
//  商品详情
export interface GoodDetail {
  id: string;
  name: string;
  spuCode: string;
  desc: string;
  price: string;
  oldPrice: string;
  discount: string;
  inventory: string;
  brand: Brand | null;
  salesCount: number;
  commentCount: number;
  collectCount: number;
  mainVideos: [];
  videoScale: number;
  mainPictures: [];
  specs: [];
  skus: [];
  categories: Categories[];
  details: {
    pictures: string[];
    properties: { name: string; value: string }[];
  };
  isPreSale: boolean;
  isCollect: boolean | null;
  recommends: null;
  userAddresses: [] | null;
  similarProducts: [];
  hotByDay: [];
  evaluationInfo: [];
}

// sku 信息
export interface sku {
  inventory: number;
  oldPrice: string;
  price: string;
  skuId: string;
  specsText: string;
}

// 热门商品请求
export type HotGoodsRequest = {
  id: string;
  type: number;
  limit: number;
};
