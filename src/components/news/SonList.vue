<template>
    <div class="soninfo-container">
        <!-- 大标题 -->
        <h3 class="title">{{ sonlist.title }}</h3>
        <!-- 子标题 -->
        <p class="subtitile">
             <span>
                 发表事件: {{ sonlist.add_time }}
             </span>
             <span>
                 点击次数: {{ sonlist.click }}
             </span>
        </p>

        <br>
        <!-- 内容区 -->
        <div class="content" v-html="sonlist.content">
        </div>

        <!-- 夸夸区 -->
        <!-- 父传子data参数 -->
        <bb-box :sonid="this.id"></bb-box>
    </div>
</template>

<script>
import { Toast } from 'mint-ui'
//8.引入夸夸子组件
import comment from '../soncomponent/bbcomponent.vue'

export default {
    data() {
        return{
           id: this.$route.params.id, //获取URL地址传来的ID值，挂载到data上，以便请求数据的需要
           sonlist : {}
        }
    },
    created(){
        this.getSonList()
    },
    methods: {
        getSonList() {
            this.$http.get('api/getnew/'+ this.id).then( result => {
                console.log(result);
                if(result.body.status === 0) {
                    this.sonlist = result.body.message
                }
                else {
                    Toast('获取失败')
                }
            })
        }
    },
    components: {  //8.1 注册 子组件的节点
        'bb-box' : comment
    }
}
</script>

<style lang="less" scoped>
.soninfo-container {
    padding: 5px;
    .title {
        font-size: 20px;
        color: red;
        text-align: center;
    }
    .subtitile {
        font-size: 12px;
        color: #226aff;
        display: flex;
        justify-content: space-between;
    }
}
</style>
