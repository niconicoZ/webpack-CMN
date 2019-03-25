<template>
    <div>
        <div class="goods-list">

            <div class="good-item">
                <img src="./猛男落泪.jpg" alt="">

                <h3 class="title">我要让女生以后给我唱：伤过的心，就像玻璃碎片</h3>

                <div class="info">
                    <p class="price">
                        <span class="now">￥488</span>
                        <span class="old">￥250</span>
                    </p>

                    <p class="sell">
                        <span>热卖中</span>
                        <span>剩88件</span>
                    </p>
                </div>
            </div>
             
            <!-- <router-link class="good-item" v-for="item in goodslists" :key="item.id" :to="'/home/goodsinfo/' + item.id" tag="div">
                <img :src="item.img_url" alt="">

                <h3 class="title">{{ item.title }}</h3>

                <div class="info">
                    <p class="price">
                        <span class="now">￥{{ item.sell_price }}</span>
                        <span class="old">￥{{ item.market_price }}</span>
                    </p>

                    <p class="sell">
                        <span>热卖中</span>
                        <span>剩{{ item.stock_quantity }}件</span>
                    </p>
                </div>
            </router-link> -->

            <!-- 在网页中，有两种跳转方式 -->
            <!-- 1. 使用a标签，比如像router-link一样，叫做 标签跳转或者声明式 -->
            <!-- 2. 使用window.location.href 的形式，叫做 编程式导航 -->
            <!-- 那么我们现在就使用Vue中提供的 编程式路由导航 -->
            <div class="good-item" v-for="item in goodslists" :key="item.id" @click="goDetail(item.id)">
                <img :src="item.img_url" alt="">
                <h3 class="title">{{ item.title }}</h3>
                <div class="info">
                    <p class="price">
                        <span class="now">￥{{ item.sell_price }}</span>
                        <span class="old">￥{{ item.market_price }}</span>
                    </p>
                    <p class="sell">
                        <span>热卖中</span>
                        <span>剩{{ item.stock_quantity }}件</span>
                    </p>
                </div>
            </div>

            <mt-button  type='danger' size='large' @click='getgoodsmore'>加载更多</mt-button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return{
         page : 1, //默认第一页
         goodslists : []
        }
    },
    created(){
        this.getgoodslist()
    },
    methods: {
        //获取商品数据
        getgoodslist() {
            this.$http.get('api/getgoods?pageindex='+ this.page).then( result => {
                if(result.body.status === 0) {
                  this.goodslists = this.goodslists.concat(result.body.message)
                }
            } )
        },
        //点击获取更多数据
        getgoodsmore() {
            this.page++;
            this.getgoodslist();
        },
        //使用JS的形式进行路由导航 
        goDetail(id) {
             console.log(this);

             /*注意： 一定要区分 this.$route 和 this.$touter 的区别
               1. this.$route 是路由【参数对象】，所有路由中的参数，parmas,query 都属于它
               2. this.$touter 是一个路由【导航对象】，用它 可以方便的 使用JS代码，实现路由的 前进 后退 ，跳转到新的URL地址
             */

            //1. 最简单的
            this.$router.push('/home/goodsinfo/' + id);

            //2. 传递对象
            // this.$router.push({ path: '/home/goodsinfo/' + id });

            //3. 传递命名的路由(name属性是在 路由规则中添加 )
            // this.$router.push({ name : 'goodsinfo', parmas: { id } });

        }
    }
}
</script>

<style lang="less" scoped>
.goods-list {
    //采用C3 flex布局
    display: flex; //所有内容在一排
    flex-wrap: wrap; //让多出的内容换行
    padding: 7px;
    justify-content: space-between;  //两边对齐

    .good-item {
        width: 49%;
        border: 1px solid #ccc;
        box-shadow: 0 0 8px #ccc;;
        margin-bottom: 7px;
        padding: 2px;
        //改变 盒子中的 轴向，改成Y轴，并且使用 flex 两边对齐
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        img{
            width: 100%;    
        }
        .title {
            font-size: 15px;
        }
        .info {
            background-color:rgba(0, 0, 0, 0.1);
            p {
                margin: 0;
                padding: 5px;
            }
            .price {
                
                .now {
                   font-size: 18px; 
                   color: red;
                }
                .old {
                   font-size: 13px;
                   text-decoration: line-through; 
                   margin-left: 8px;
                }
            }
        }
        .sell {
            display: flex;
            justify-content: space-between;
            font-size: 13px;
        }
    }
}
</style>
