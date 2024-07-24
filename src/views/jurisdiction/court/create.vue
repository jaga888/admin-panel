<template>
  <court-detail :is-edit="false" />
</template>

<script>
import { defineComponent } from 'vue';
import CourtDetail from './components/CourtDetail.vue';

export default defineComponent({
  name: 'CreateCourt',
  components: { CourtDetail }
});
</script>

