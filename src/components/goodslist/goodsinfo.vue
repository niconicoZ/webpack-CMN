<template>
  <div class="goodsinfo-container">

    <!-- 给过场小球添加动画 -->
    <transition
      @before-enter='beforeEnter'
      @enter='enter'
      @after-enter='afterEnter'>
      <div class="ball" v-show="isflag" ref="ball"></div>
    </transition>

    <!-- 轮播图 -->
    <div class="mui-card">
      <div class="mui-card-header">真人老师，一对一辅导</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
      
          <!-- 页面渲染 轮播图 子组件 -->
          <swipe :lunbotuList='lunbotuList' :isfull='false'></swipe>
 
        </div>
      </div>
    </div>

    <!-- 商品购买区域 -->
    <div class="mui-card">
      <div class="mui-card-header">性感老师，在线包夜</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
            <p class="price">
                市场价：<del>￥1200</del>&nbsp;&nbsp;&nbsp;
                销售价：<span class="now-prie">￥800</span>
            </p>
            <!-- 父亲给儿子传递一个方法 -->
            <p>购买数量：<numbox @getcount='getson' :max='sb.stock_quantity'> </numbox>  </p>
            <p> 
                <mt-button type='primary' size='small'>立即购买</mt-button>
                <mt-button  type='danger' size='small' @click="addball">加入购物车</mt-button>

          <!-- 问题：当子组件 数字选择框发生数值变化的时候，父组件如果拿到变化的值？
                解决：1. 加入购物车按钮 为info页面， 数据选择框为 numbox组件
                     2. 由于涉及到了父子组件的嵌套，所以无法直接从 info 页面获取到 numbox中的值
                     3. 我们可以通过 子传父传值（事件调用机制）
                     4. 事件调用机制： 父向子传递方法，子调用，同时把数据当做参数传递给 父 -->
            </p>
        </div>
      </div>
    </div>

    <!-- 商品参数区域 -->
    <div class="mui-card">
      <div class="mui-card-header">商品参数</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
            <p>商品货号：{{ sb.goods_no }}</p>
            <p>库存情况：{{ sb.stock_quantity }}</p>
            <p>上架时间：{{ sb.add_time | dataFormat }}</p>
        </div>
      </div>
      <div class="mui-card-footer">
          <mt-button type='primary' size='large' plain @click="goodsdesc(id)">图文详情</mt-button>
          <mt-button type='danger' size='large' plain @click="goodscomment(id)">商品评论</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
//引入轮播图子组件
import swipe from '../soncomponent/swipe.vue'
//引入数字选择框 子组件
import numbox from '../soncomponent/numbox.vue'

export default {
    data() {
       return{
         id: this.$route.params.id,
         lunbotuList : [], //轮播图的数据
         sb : [], //获取商品的信息
         isflag : false, //控制小球隐藏显示
         father : 1 //父亲接受儿子的传来的数据，默认为 1
       }
    },
    created(){
        this.getlunbotu();
        this.getsb();

    },
    methods: {
        //获取轮播图资源
        getlunbotu() {
            this.$http.get('api/getthumimages/'+ this.id).then( result => {
               console.log(result);               
               if(result.body.status === 0) {
                //获取的图片类名是src，而轮播遍历的item是 item.img_url，所以我们先事先进行遍历item，修改一下
                //为item添加img_url属性
                result.body.message.forEach(item => {
                    item.img_url = item.src
                });

                this.lunbotuList = result.body.message
               }
            })
        },
        //获取商品参数区和价格，标题等数据
        getsb() {
            this.$http.get('api/goods/getinfo/' + this.id).then( result => {
                console.log(result);
                if(result.body.status === 0) {
                   this.sb = result.body.message;
                }
            })
        },
        //使用编程式路由导航
        goodsdesc(id) {
            this.$router.push({ name : 'goodsdesc', params : { id } });
        },
        goodscomment(id) {
            this.$router.push({ name : 'goodscomment', params : { id } })
        },
        //小球显示隐藏切换及半场钩子动画函数
        addball() {
          this.isflag = !this.isflag
        },
        beforeEnter(el) {
           el.style.transform='translate(0,0)'
        },
        enter(el,done) {
          el.offsetWidth;
          /*问题：我们发现屏幕分辨率发送变化，小球动画都不能达到我们预期的效果。
            解决:1.是因为我们把小球最终的位置，写死了，已经局限在某一个分辨率下。
                 2.所以我们不能把位置写死，应该根据不同的情况，动态改变坐标值
                 3.我们可以 先得到 小球的绝对 起始坐标，和标徽的绝对 结束坐标，通过相减，得到之间的动态距离。
                 4.获取绝对坐标： domObject.getBoundingClientRect()
          */

         //1.通过 ref属性 操作获取 小球元素，并获取坐标
         const ballPosition = this.$refs.ball.getBoundingClientRect();
         //2.通过 DOM操作 给父组件的标徽添加ID值，获取元素，并获取坐标
         const badgePosition = document.getElementById('badge').getBoundingClientRect()

         //3.计算之间动态距离
         const xDist = badgePosition.left - ballPosition.left;
         const yDist = badgePosition.top - ballPosition.top;
 
         //4.通过ES6字符串模板拼接
          el.style.transform=`translate(${xDist}px, ${yDist}px)`;
          el.style.transition = 'all 1s cubic-bezier(.4,-0.3,1,.68)'
          done() 
        },
        afterEnter(el) {
          this.isflag = !this.isflag
        },
        //父向子传递一个获取子的数据方法,然后绑定到子组件中
        getson(count) {
           this.father = count;
           console.log('父亲拿到了儿子上交的压岁钱' + this.father);
        }
    },
    components: {
        swipe,   //挂载组件
        numbox
    }
};
</script>

<style lang="less" scoped>
.goodsinfo-container {
    background-color: #ccc;
    overflow: hidden;

    .now-prie {
        font-size: 18px;
        color: red;
    }
    .mui-card-footer {
        display: block;
        button {
            margin: 15px 0;
        }
    }

    .ball {
      width: 15px;
      height: 15px;
      background-color: red;
      border-radius: 50%;
      position: absolute;
      z-index: 99;
      top: 435px;
      left: 148px;
    }
}
</style>
