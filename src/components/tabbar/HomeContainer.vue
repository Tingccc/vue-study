<template>
    <div>
        <mt-swipe :auto="4000">
            <mt-swipe-item v-for="item in swipeList" :key="item.img">
                <img :src="item.img" alt="">
            </mt-swipe-item>
        </mt-swipe>

        <ul class="mui-table-view mui-grid-view mui-grid-9">
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4"><router-link to="/home/newslist">
                <img src="../../assets/images/menu1.png" alt="">
                <div class="mui-media-body">新闻资讯</div></router-link></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4"><router-link to="/home/photolist">
                <img src="../../assets/images/menu2.png" alt="">
                <div class="mui-media-body">图片分享</div></router-link></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4"><a>
                <img src="../../assets/images/menu3.png" alt="">
                <div class="mui-media-body">商品购买</div></a></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4"><a>
                <img src="../../assets/images/menu4.png" alt="">
                <div class="mui-media-body">留言反馈</div></a></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4"><a>
                <img src="../../assets/images/menu5.png" alt="">
                <div class="mui-media-body">视频专区</div></a></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4"><a>
                <img src="../../assets/images/menu6.png" alt="">
                <div class="mui-media-body">联系我们</div></a></li>
        </ul> 
    </div>
</template>

<script>
export default {
  data() {
    return {
      swipeList: []
    };
  },
  created() {
    this.getLunbo();
  },
  methods: {
    getLunbo: function() {
      this.$http.get("api/getlunbo").then(res => {
        if (res.body.status == 0) {
          this.swipeList = res.body.message;
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.mint-swipe {
  width: 100%;
  height: 300px;
  img {
    width: 100%;
    height: 100%;
  }
}
.mui-grid-view.mui-grid-9 {
  background-color: #fff;
  border: none;
  .mui-table-view-cell {
      border: none;
  }
  img {
    width: 60px;
    height: 60px;
  }

  .mui-media-body{
    font-size: 13px;
  }
}
</style>
