<template>
  <courtroom-detail :is-edit="false" />
</template>

<script>
import { defineComponent } from 'vue';
import CourtroomDetail from './components/CourtroomDetail.vue';

export default defineComponent({
  name: 'CreateCourtroom',
  components: { CourtroomDetail }
});
</script>

