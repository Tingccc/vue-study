<template>
    <div class="cmt-box">
        <h3>发表评论</h3> <hr>
        <textarea placeholder="请输入要评论的内容（最多120字）" maxlength="120" v-model="msg"></textarea>
        <mt-button type="primary" size="large" @click="postComment">发表评论</mt-button>
        <div class="cmt-list">
            <div class="cmt-item" v-for="(item,i) in commentList" :key="item.add_time">
                <div class="cmt-title">                
                    第{{i+1}}楼&nbsp;用户：{{item.user_name}} &nbsp;发表时间：{{item.add_time | dateFormat}}
                </div>
                <div class="cmt-body">
                    {{item.content=='undefined'?'没啥内容':item.content}}
                </div>
            </div>
        </div>
        <mt-button type="danger" size="large" plain @click="loadmore">加载更多</mt-button>
    </div>
</template>

<script>
import {Toast} from 'mint-ui'
export default {
    data(){
        return {
            pageIndex:1,
            commentList:[],
            msg:''
        }
    },
    created() {
        this.getComments()
    },
    methods:{
        getComments(){
            this.$http.get("api/getcomments/" + this.id + "?pageindex=" + this.pageIndex).then(res=>{
                if(res.body.status==0){
                    this.commentList = this.commentList.concat(res.body.message)
                }else{
                    Toast('获取评论列表失败')
                }
            })
        },
        loadmore(){
            this.pageIndex++;
            this.getComments();
        },
        postComment(){
            if(this.msg.trim().length===0) return Toast('评论内容不能为空')
            this.$http.post("api/postcomment/" + this.$route.params.id,{content:this.msg.trim()}).then(res=>{
                if(res.body.status==0){
                    var cmt = {
                        user_name: "匿名用户",
                        add_time: Date.now(),
                        content: this.msg.trim()
                    }
                    this.commentList.unshift(cmt);
                    this.msg='请输入要评论的内容（最多120字）';
                }
            })
        }
    },
    props:['id']
}
</script>


<style lang="less" scoped>
    .cmt-box {
        h3 {
            font-size: 18px;
        }
        textarea {
            font-size: 14px;
            height: 85px;
        }
        .cmt-list {
            margin: 5px 0;
            .cmt-item {
                font-size: 13px;
                .cmt-title {
                    line-height: 30px;
                    background-color: #e7e5e5;
                }
                .cmt-body {
                    line-height: 35px;
                    text-indent: 2em;
                }
            }
        }
    }
</style>

