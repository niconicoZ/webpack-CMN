<template>
    <div class="info">
        <h3>{{ info.title }}</h3>
        <br>
        <p>{{ info.content }}</p>
    </div>
</template>

<script>
export default {
    data() {
        return{
          id : this.$route.params.id,
          info : {}
        }
    },
    created(){
        this.getgoodsdesc()
    },
    methods: {
        getgoodsdesc() {
            this.$http.get('api/goods/getdesc/' + this.id).then( result => {
                console.log(result);
                if(result.body.status === 0) {
                    this.info = result.body.message;
                }
            } )
        }
    }
}
</script>

<style lang="less" scoped>
.info {
    h3 {
        font-size: 16px;
        color: #226aff;
        text-align: center;
        margin: 15px 0;
    }
    p {
        padding: 5px;
    }
}
</style>
