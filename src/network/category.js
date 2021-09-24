import request from "./request";

// 获取分类数据
export function getCategory() {
  return request({
    url: '/category'
  })
}

// 获取子分类数据
export function getSubcategory(maitKey) {
  return request({
    url: '/subcategory',
    params: {
      maitKey
    }
  })
}

// 获取分类商品数据
export function getCategoryDetail(miniWallkey, type) {
  return request({
    url: '/subcategory/detail',
    params: {
      miniWallkey,
      type
    }
  })
}