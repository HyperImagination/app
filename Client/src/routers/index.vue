<template>
    <div class="upload-file">
        <div class="scroller" style="flex:1; height: 1px;">
            <my-upload v-for="v of vers" :title="v.desc" :name="v.name" @change="change"></my-upload>
        </div>
        <mt-button type="primary" @click.native="submit">上 传</mt-button>
    </div>
</template>
<script>
export default {
    data() {
            return {
                vers: [{
                    desc: '驾驶证正面',
                    name: 'jszz'
                }, {
                    desc: '驾驶证反面',
                    name: 'jszf'
                }],
                post: {}
            }
        },
        async created() {

        },
        methods: {
            change(file) {
                this.post[file.name] = file.file
            },
            submit() {
                this.fetch()
            },
            async fetch() {
                const fd = new FormData()
                Object.keys(this.post).forEach(v => {
                    fd.append(v, this.post[v])
                })
                try {
                    let {
                        data
                    } = await this.$http.post('/upload/fields', fd);
                    console.log('【data】', data);
                    // if (data.state !== 0) {
                    //     return window.alert(data.msg)
                    // }
                    // const id = data.data
                    // this.$router.replace(`/personal/order/detail/${id}`)
                } catch (e) {
                    console.log('error:', e)
                }
            }
        }
}
</script>
<style scoped>
</style>
