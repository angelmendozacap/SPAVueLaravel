<template>
  <div>
    <section class="jumbotron text-center">
      <div class="container">
        <h1 class="jumbotron-heading" v-text="post.title"></h1>
      </div>
    </section>
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-8">
          <p v-text="post.excerpt"></p>
          <div v-html="post.body"></div>
          <hr>
          <h1>Otros articulos</h1>
          <posts></posts>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "post",
  props: ["slug"],
  data() {
    return {
      post: {}
    };
  },
  watch: {
    // call again the method if the route changes
    '$route': 'fetchData'
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData () {
      let url = `api/posts/${this.slug}`;
      axios
        .get(url)
        .then(result => {
          this.post = result.data
        })
        .catch(err => {
          console.log(err);
        })
    }
  }
};
</script>

