
<template >
  <div>
    Bar
    <p>
      10年后的年龄{{tenYearsOld}}
    </p>
    <p>
      122 岁的孩子{{findUsersByAge(122)}}
    </p>
  </div>
</template>
<script>
import {mapGetters} from 'vuex';

export default {
  computed: {
    ...mapGetters(['tenYearsOld','findUsersByAge'])
    // tenYearsOld() {
    //   return this.$store.getters.tenYearsOld;
    // }
  },
  
}
</script>
<style>
  
</style>