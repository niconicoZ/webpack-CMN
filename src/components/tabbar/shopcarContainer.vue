<template>
    <div class="shopcar-container">
        <div class="goods-list">

            <!-- 商品列表区域 -->
            <div class="mui-card">
				<div class="mui-card-content">
					<div class="mui-card-content-inner">

                       <mt-switch></mt-switch>
                       <img src="https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=1966851497,830853749&fm=173&app=25&f=JPEG?w=471&h=442&s=F381D90B1E61070BCA24ACF5030050A1" alt="">
                       <div class="info">
                           <h3>你妈死了，我在你妈坟头上打麻将糊了你妈个杠上开花大三番</h3>
                           <p>
                               <span class="price">￥9999</span>
                               <numbox></numbox>
                               <a href="#">删除</a>
                           </p>
                       </div>
					</div>
				</div>
			</div>

            <div class="mui-card" v-for="(item,i) in goodslit" :key='item.id'>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">

                       <!-- mint官方按钮有一个 v-model属性 为true 则被选中 -->
                       <!-- mint官方按钮有一个 @change属性 ，一旦状态改变就被触发 -->
                       <mt-switch 
                       v-model="$store.getters.getGoddsSelect[item.id]"
                       @change="selectedChange(item.id,$store.getters.getGoddsSelect[item.id])"></mt-switch>


                       <img :src="item.img_url" alt="">
                       <div class="info">
                           <h3>{{ item.zhaiyao }}</h3>
                           <p>
                               <span class="price">￥{{ item.sell_price }}</span>

                               <numbox :count='$store.getters.getGoodsCount[item.id]'  :goodsid='item.id'></numbox>
                        <!-- 如何获取购物车中的商品的数量？然后渲染到相应数字选择框中
                        1.我们在getters中创建一个方法，设置一个空对象，然后循环购物车中的所有商品数据
                        2.把 当前循环这条商品的 ID,作为 对象.属性名，count值作为对象的的属性值，就会得到一个对象
                        { 88: 6, 99:1 } -->

                               <a href="#" @click.prevent="remove(item.id, i)">删除</a>
                           </p>
                       </div>
					</div>
				</div>
			</div>

            <!-- 结算区域 -->
            <div class="mui-card">
				<div class="mui-card-content">
					<div class="mui-card-content-inner jiesuan">
                        <div class="left">
                            <p>总计(不含运费)</p>
                            <p>已勾选商品 <span class="red">{{ $store.getters.getGoodszong.count }}</span> 件，总价 ￥ <span class="red">{{ $store.getters.getGoodszong.amout }}</span>  元</p>
                        </div>
                        <mt-button type='danger'>去结算</mt-button>
					</div>
				</div>
			</div>
             
            <p>{{ $store.getters.getGoddsSelect }}</p>
        </div> 
    </div>
</template>

<script>
//引入数字选择框组件
import numbox from '../soncomponent/shopcar_numbox.vue'

export default {
    data(){
        return {
            goodslit: []
        }
    },
    created(){
       this.getGoodsList()
    },
    methods:{
        getGoodsList() {
            //2.调用接口需要获取到 添加到购物车的商品的ID值
            //  2.1 获取到store中car的所有商品的ID，放在数组中
            //  2.2 为了符合接口数据拼接，使用join(',') 把数组变成以逗号分开的字符串
            var idArr = [];
            this.$store.state.car.forEach( item => {
                idArr.push(item.id) 
            })
            //  2.3 如果购物车没有商品，就直接返回，不需要请求数据接口，否则就会报错的
            if(idArr.length <= 0) {
                return
            }
 
            //1.调用接口获取购物车的里面的商品列表数据
            this.$http.get('api/goods/getshopcarlist/'+ idArr.join(',')).then( result => {
                   console.log(result);
                   if(result.body.status === 0) {
                       this.goodslit = result.body.message;
                   }
            })
        },

        //设置一个删除方法
        remove(id,index) {
            //点击删除，把商品从store中根据传递 ID 删除，同时，把当前组件 goodslist中对应的那个商品
            //使用index删除
            //1.利用数组的删除方法：splice，删除组件页面上的数据
            this.goodslit.splice(index,1);

            //2.调用方法，删除本地存储的数据
            this.$store.commit('removeFormCar',id)
        },

        //通过监听按钮状态，触发方法,然后把状态true/false发送到store
        selectedChange(id,val) {
          console.log(id + '----' + val);

          //调用mutations中的方法，加上相应需要的参数
          this.$store.commit('updateGoodsSelected', { id, selected : val })
        }
        
    },
    //注册组件
    components: {
        numbox
    }
}
</script>

<style lang="less" scoped>
.shopcar-container {
    background-color: #eee;
    overflow: hidden;
    .goods-list {
        .mui-card-content-inner {
            height: 110px;
            display: flex;
            justify-content: space-between;
            //纵向居中
            align-items: center;
        }
        img {
            height: 60px;
            width: 60px;
        }
        h3 {
            font-size: 13px
        }
        .info {
            height: 60px;
            //改成纵向布局
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            .price {
                color: red;
                font-weight: 700;
            }
        }
    }
    .jiesuan {
        display: flex;
        justify-content: space-between;
        align-items: center; 
        .red {
            color: red;
            font-weight: bold;
        }
    }
}
</style>
