<template>
  <div>
    <Pager 
      :total = "total"
      :current = "current"
      @PageChange ="handlePageChange($event)"
    />
  </div>
</template>

<script>

import Pager from "./"
export default {
  name: 'app',
  components: {
    Pager
  },
  data() {
    return {
      current:1,
      total:301,
    }
  },
  methods:{
    handlePageChange(newPage){
      this.current = newPage;
    }
  }
}
</script>

<style>

</style>
