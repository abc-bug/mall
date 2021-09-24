<template>
  <div id="category">
    <nav-bar class="nav-bar"><div slot="center">商品分类</div></nav-bar>
    <div class="content">
      <category-tab-menu :categories='categories' @itemClick='itemClick'/>
      <scroll id='tab-content' ref='scroll'>
          <tab-content-category :subcategories="showSubcategory"/>
          <tab-control :titles="['综合', '新品', '销量']"
                       @itemClick="tabClick"/>
          <tab-content-detail :category-detail="showCategoryDetail"></tab-content-detail>
      </scroll>
    </div>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import Scroll from 'components/common/scroll/Scroll'
  import TabControl from 'components/content/tabControl/TabControl'

  import CategoryTabMenu from './childComps/CategoryTabMenu'
  import TabContentCategory from './childComps/TabContentCategory'
  import TabContentDetail from'./childComps/TabContentDetail'

  import {getCategory, getSubcategory, getCategoryDetail} from 'network/category'
  import {itemListenerMixin} from 'common/mixin'
  export default {
    name: 'Category',
    components: {
      NavBar,
      CategoryTabMenu,
      Scroll,
      TabContentCategory,
      TabControl,
      TabContentDetail
    },
    data() {
      return {
        categories: [],
        categoryData: [],
        currentIndex: -1,
        currentType: 'pop'
      }
    },
    computed: {
      showSubcategory() {
		    if (this.currentIndex === -1) return {}
        return this.categoryData[this.currentIndex].subcategories
      },
      showCategoryDetail() {
		    if (this.currentIndex === -1) return []
		    return this.categoryData[this.currentIndex].categoryDetail[this.currentType]
      }
    },
    mixins: [itemListenerMixin],
    methods: {
      // 获取分类数据
      _getCategory() {
        getCategory().then(res => {
          // 类别
          this.categories = res.data.category.list;
          // 初始化每个类别子数据
          for(let i = 0; i < this.categories.length; i++) {
            this.categoryData[i] = {
              subcategories: {},
              categoryDetail: {
                'pop': [],
                'new': [],
                'sell': []
              }
            };
          }
          // 获取第一个分类的子分类数据
          this._getSubcategory(0);
        })
      },
      _getSubcategory(index) {
        this.currentIndex = index;
        const mailKey = this.categories[index].maitKey;
        getSubcategory(mailKey).then(res => {
          this.categoryData[index].subcategories = res.data;
          this.categoryData = {...this.categoryData};
          // console.log(this.categoryData);
          this._getCategoryDetail('pop')
          this._getCategoryDetail('sell')
          this._getCategoryDetail('new')
        })
      },

      _getCategoryDetail(type) {
		    // 1.获取请求的miniWallkey
        const miniWallkey = this.categories[this.currentIndex].miniWallkey;
        // 2.发送请求,传入miniWallkey和type
		    getCategoryDetail(miniWallkey, type).then(res => {
        // 3.将获取的数据保存下来
        this.categoryData[this.currentIndex].categoryDetail[type] = res
        this.categoryData = {...this.categoryData}
        })
      },
      

      // 事件监听
      itemClick(index) {
        this._getSubcategory(index);
      },

      tabClick(index) {
        switch (index) {
          case 0:
            this.currentType = 'pop';
            break;
          case 1:
            this.currentType = 'new';
            break
          case 2:
            this.currentType = 'sell';
            break;
        }
      }
    },
    activated() {
      this.$refs.scroll.scrollTo(0,0,0);
      this.$refs.scroll.refresh();
      this.$bus.$on('itemImgLoad', this.itemImgListener);
    },
    deactivated() {
      this.saveY = this.$refs.scroll.getY();
      // 取消对图片加载事件的监听
      this.$bus.$off('itemImgLoad', this.itemImgListener); 
    },
    created () {
      this._getCategory();
    }
  }
</script>

<style scoped>
  #category {
    height: 100vh;
  }
  .nav-bar {
    background-color: var(--color-tint);
    font-weight: 700;
    color: #fff;
  }
  .content {
    position: absolute;
    left: 0;
    right: 0;
    top: 44px;
    bottom: 49px;
    display: flex;
  }
  #tab-content {
    overflow: hidden;
    height: 100%;
    flex: 1;
  }
</style>