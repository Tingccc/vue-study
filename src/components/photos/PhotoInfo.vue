<template>
    <div class="photoinfo-container">
        <h3>{{ photoInfo.title }}</h3>
        <p class="subtitle"> 
            <span>发表时间：{{ photoInfo.add_time | dateFormat }}</span>
            <span>点击：{{ photoInfo.click }}次数</span>
        </p>
        <hr>
        <!-- <img class="preview-img" v-for="(item,index) in list" :src="item.src" height="100" @click="$preview.open(index,list)" :key="item.src"> -->
        <vue-preview :slides="list"></vue-preview>
        <div class="content" v-html="photoInfo.content">
        </div>
        <cmt-box :id="id"></cmt-box>
    </div>
</template>

<script>
import comment from '@/components/subcomponents/comment.vue'
export default {
    data(){
        return {
            id: this.$route.params.id,
            photoInfo:{},
            list:[]
        }
    },
    created() {
        this.getPhotoInfo();
        this.getThumbs();
    },
    methods:{
        getPhotoInfo(){
            this.$http.get('api/getimageInfo/'+this.id).then(res=>{
                if(res.body.status==0){
                    this.photoInfo= res.body.message[0]
                }
            })
        },
        getThumbs(){
            this.$http.get('api/getthumimages/'+this.id).then(res=>{
                if(res.body.status==0){
                    res.body.message.forEach(item=>{
                        item.w=600;
                        item.h=400;
                        item.msrc=item.src
                    })
                    this.list = res.body.message
                }
            })
        }
    },
    components:{
        'cmt-box':comment
    }
}
</script>

<style lang="less" scoped>
    .photoinfo-container {
        padding: 3px;
        h3 {
            color: #26a2ff;
            font-size: 15px;
            text-align: center;
            margin: 15px 0;
        }
        .subtitle {
            display: flex;
            justify-content: space-between;
            font-size: 13px;
        }
        .content {
            font-size: 13px;
            line-height: 30px;
        }
        /deep/ figure {
            display: inline-block;
            margin: 10px;
            img {
                width: 100px;
            }
        }
    }
</style>
