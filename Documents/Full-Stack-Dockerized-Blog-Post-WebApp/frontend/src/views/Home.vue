<template>
  <div class="row">
    <SamplePosts/>
  </div>
</template>

<script>
// @ is an alias to /src
import SamplePosts from '@/components/SamplePosts.vue';

export default {
  name: 'Home',
  components: {
    SamplePosts
  }
}
</script>
