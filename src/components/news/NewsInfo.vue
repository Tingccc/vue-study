<template>
    <div class="newsinfo-container">
        <h3 class="title">{{ newsInfo.title }}</h3>
        <p class="subtitle">
            <span>发表时间:{{newsInfo.add_time | dateFormat('YYYY-MM-DD')}}</span>
            <span>点击:{{ newsInfo.click }}次</span>
        </p>
        <div class="content" v-html="newsInfo.content"> </div>
        <div class="cmt-container">
            <comment-box :id="id"></comment-box>
        </div>
    </div>
</template>

<script>
import comment from '@/components/subcomponents/comment.vue'
import {Toast} from "mint-ui"
export default {
    data(){
        return {
            id:this.$route.params.id,
            newsInfo:{}
        }
    },
    created() {
        this.getNewsInfo()
    },
    methods:{
        getNewsInfo(){
            this.$http.get('api/getnew/'+this.id).then(res=>{
                if(res.body.status==0){
                    this.newsInfo=res.body.message[0]
                    // console.log(res.body.message)
                } else {
                    Toast('获取失败')
                }
            })
        }
    },
    components:{
        "comment-box":comment
    }
}
</script>


<style lang="less">
    .newsinfo-container {
        padding: 0 4px;
        .title {
            font-style: 16px;
            text-align: center;
            margin: 15px 0;
            color: red;
        }
        .subtitle {
            font-style: 13px;
            color: skyblue;
            display: flex;
            justify-content: space-between;
        }
        .content {
            img {
                width: 100%;
            }
        }
    }
</style>
