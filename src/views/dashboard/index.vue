<template>
  <div class="dashboard-container">
   111111
  </div>
</template>

<script>
import { mapGetters } from 'vuex'


export default {
  name: 'Dashboard',
  components: {  },
  data() {
    return {
      currentRole: 'adminDashboard'
    }
  },
  computed: {
    // ...mapGetters([
    //   'roles'
    // ])
  },
  created() {

  }
}
</script>
<style type="scss">
  .dashboard-container{
    background: #f2f2f2;
  }
</style>
