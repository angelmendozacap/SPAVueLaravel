<template>
  <div class="row">
    <div class="col-md-12">
      <div class="card my-3" :key="item.id" v-for="item in list">
        <div class="card-header">
          <router-link
          :to="{name: 'post', params: {'slug': item.slug}}"
          v-text="item.title"
          ></router-link>
        </div>

        <div class="card-body">
          <p class="card-text" v-text="item.excerpt"></p>
        </div>
      </div>
      <infinite-loading @infinite="infiniteHandler">
        <div slot="no-more">No hay más resultados :)</div>
        <div slot="no-results">Sin resultados</div>
      </infinite-loading>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [],
      page: 0
    };
  },
  methods: {
    infiniteHandler($state) {
      this.page++;
      let url = `api/posts?page=${this.page}`;
      axios
        .get(url)
        .then(result => {
          let posts = result.data.data;
          if (posts.length) {
            this.list = this.list.concat(posts);
            $state.loaded();
          } else {
            $state.complete();
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
