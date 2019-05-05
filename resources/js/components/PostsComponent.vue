<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card my-3" :key="item.id" v-for="item in list">
                    <div class="card-header">
                        <a :href="item.slug">
                            <h5 v-text="item.title"></h5>
                        </a>
                    </div>

                    <div class="card-body">
                        <p class="card-text" v-text="item.body"></p>
                    </div>
                </div>
                <infinite-loading @infinite="infiniteHandler">
                    <div slot="no-more">No hay más resultados :)</div>
                    <div slot="no-results">Sin resultados</div>
                </infinite-loading>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                list: [],
                page: 0
            }
        },
        methods: {
            infiniteHandler($state) {
                this.page++
                let url = `api/posts?page=${this.page}`
                axios.get(url)
                .then((result) => {
                    let posts = result.data.data
                    if (posts.length) {
                        this.list = this.list.concat(posts)
                        $state.loaded()
                    } else {
                        $state.complete()
                    }
                }).catch((err) => {
                    console.log(err)
                });
            }
        }
    }
</script>
