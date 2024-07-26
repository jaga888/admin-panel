<template>
  <agency-detail :is-edit="false" />
</template>

<script>
import { defineComponent } from 'vue';
import AgencyDetail from './components/AgencyDetail.vue';

export default defineComponent({
  name: 'CreateAgency',
  components: { AgencyDetail }
});
</script>

